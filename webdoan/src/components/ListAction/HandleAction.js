import React, {useState} from "react";
import styles from './ListActionStyle.module.scss';
import classNames from "classnames/bind";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Select from "react-select";
import {toast} from "react-toastify";
import {
    actionEvictTask,
    actionProcessingHandover, actionReturnTask, actionSaveFiles,
    actionSendReport,
    actionUpdateProcessing
} from "../../redux-store/action/actionUser";
import moment from "moment";

const cx = classNames.bind(styles);

const HandleAction = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.reducerAuth.token);
    const overViewUser = useSelector(state => state.reducerUser.overViewUser);

    const [targetTask, setTargetTask] = useState('');
    const [combinationTask, setCombinationTask] = useState([]);
    const [contentTask, setContentTask] = useState('');
    const [expiredDate, setExpiredDate] = useState(moment(new Date).format("YYYY-MM-DDTHH:mm"));
    const [progress, setProgress] = useState(props.task.progress);

    const [uploadedFiles, setUploadedFiles] = useState([]);

    const mapDepartmentsToOptions = (deps, level = 0) => {
        return deps.map((dep) => ({
            label: `${'----'.repeat(level)} ${dep.department_name}`,
            options: [
                ...dep.users.map((user) => ({
                    value: `${user.user_id}`,
                    label: `${'----'.repeat(level + 1)} 👤 ${user.user_name}`,
                    user: user,
                    department_id: dep.department_id,
                })),
                ...mapDepartmentsToOptions(dep.children || [], level + 1),
            ],
        }));
    };

    const optionsUser = mapDepartmentsToOptions(overViewUser.departments);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files); // Lấy danh sách các tệp được chọn
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]); // Cập nhật danh sách tệp
    };

    const handleFileRemove = (index) => {
        setUploadedFiles((prevFiles) =>
            prevFiles.filter((_, i) => i !== index) // Loại bỏ tệp tại chỉ mục tương ứng
        );
    };

    const handleSendReport = () => {
        // 0: Yêu cầu báo cáo tiến độ, 1: Báo cáo tiến độ, 2: Báo cáo hoàn thành, 3: Xin gia hạn
        if(props.reportType === 0) {
            dispatch(actionSendReport(token, props.task, 0, overViewUser.userCurrent.user_id, contentTask, null));
        } else if (props.reportType === 1) {
            dispatch(actionSendReport(token, props.task, 1, overViewUser.userCurrent.user_id, contentTask, null));
        } else if (props.reportType === 2) {
            dispatch(actionSendReport(token, props.task, 2, overViewUser.userCurrent.user_id, contentTask, null));
        } else if (props.reportType === 3) {
            dispatch(actionSendReport(token, props.task, 3, overViewUser.userCurrent.user_id, contentTask, expiredDate));
        } else if (props.reportType === 101) { //// Chuyển xử lý nhiệm vụ
            const combinations = combinationTask.map(combination => ({
                "combination_id": combination.user.user_id,
                "department_id": combination.department_id,
            }))
            dispatch(actionProcessingHandover(token, {
                task_id: props.task.task_id,
                target_user_id: targetTask.user.user_id,
                target_department_id: targetTask.department_id,
                combinations: combinations,
                content: contentTask,
            }));
        } else if (props.reportType === 102) { //// Thu hồi nhiệm vụ
            dispatch(actionEvictTask(token, props.task));
        } else if (props.reportType === 103) { //// Cập nhật tiến độ nhiệm vụ
            dispatch(actionUpdateProcessing(token, props.task, parseInt(progress, 10)));
        } else if (props.reportType === 104) { //// Trả lại nhiệm vụ
            dispatch(actionReturnTask(token, props.task, contentTask));
        }

        if(uploadedFiles?.length > 0) {
            uploadedFiles.forEach((file) => {
                dispatch(actionSaveFiles(token, file, props.task.task_id));
            })
        }
        props.handleCloseModule();
    }

    return (
        <div className={cx('HandleAction')}>
            <div className={cx('HandleAction_body')}>
                <div className={cx('HandleAction_body_header')}>
                    <div>{props.typeAction}</div>

                    <button
                        onClick={() => props.handleCloseModule()}
                        className={cx("btn", 'HandleAction_body_close')}
                    >
                        <i className='bx bx-x'></i>
                    </button>
                </div>

                <div className={cx('container', 'p-4')}>
                    <div className={cx('row', 'col-md-12', 'mb-3', 'd-flex')}>
                        <div className={cx('col-md-12', 'd-flex')}>
                            <div className={cx('col-md-2')}>Tiêu đề:</div>
                            <div>{props.title}</div>
                        </div>
                    </div>

                    {props.showDate && (
                        <div className={cx('row', 'col-md-12', 'align-items-center', 'mb-3')}>
                            <div className={cx('col-md-12', 'd-flex', 'align-items-center')}>
                                <label className={cx('col-md-2')}>Hạn xử lý mới:</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    value={expiredDate}
                                    onChange={(e) => setExpiredDate(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {props.showPercent && (
                        <div className={cx('row', 'col-md-12', 'mb-3')}>
                            <div className={cx('col-md-12', 'd-flex', 'align-items-center')}>
                                <div className={cx('col-md-2')}>Phần trăm hoàn thành <span className={cx('text_red')}>*</span></div>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Nhập phần trăm hoàn thành"
                                    value={progress}
                                    onChange={e => setProgress(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {props.showTransferProcessing && (
                        <div className={cx('col-md-12', 'mb-3', 'row')}>
                            <div className={cx('col-md-12', 'mb-3')}>
                                <div className={cx('d-flex', 'align-items-center')}>
                                    <label className="col-md-3">Đơn vị người chủ trì</label>
                                    <Select
                                        options={optionsUser}
                                        isSearchable
                                        className="w-100"
                                        placeholder="Tìm kiếm phòng ban hoặc người dùng..."
                                        value={targetTask}
                                        onChange={(selected) => {
                                            const isAlreadyInTask = combinationTask.some(task => task.value === selected.value);
                                            if(isAlreadyInTask) {
                                                toast.error("Người này đang giữ vai trò khác")
                                            } else {
                                                setTargetTask(selected)
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className={cx('col-md-12', 'mb-3')}>
                                <div className={cx('d-flex', 'align-items-center')}>
                                    <label className="col-md-3">Đơn vị người phối hợp</label>
                                    <Select
                                        options={optionsUser}
                                        isSearchable
                                        isMulti
                                        className="w-100"
                                        placeholder="Tìm kiếm phòng ban hoặc người dùng..."
                                        value={combinationTask}
                                        onChange={(selected) => {
                                            const isAlreadyInTask = selected.some(task => task.value === targetTask.value);
                                            if(isAlreadyInTask) {
                                                toast.error("Người này đang giữ vai trò khác")
                                            } else {
                                                setCombinationTask(selected)
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {props.showComment && (
                        <div className={cx('row', 'col-md-12', 'mb-3')}>
                            <div className={cx('col-md-12', 'd-flex')}>
                                <div className={cx('col-md-2')}>Ý kiến xử lý <span className={cx('text_red')}>*</span></div>
                                <textarea
                                    className={cx("form-control", 'input_comment')}
                                    placeholder="Ý kiến xử lý"
                                    rows="3"
                                    value={contentTask}
                                    onChange={(e) => setContentTask(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {props.showFile && (
                        <div className={cx('col-md-12', 'mb-3', 'row')}>
                            <div className={cx('d-flex', 'col-md-12', 'align-items-center', 'mb-3')}>
                                <label className={cx('col-md-2')}>Đính kèm file:</label>

                                <div className="file-upload__input">
                                    <label htmlFor="file-input" className="btn btn-primary">
                                        Chọn tệp
                                    </label>
                                    <input
                                        id="file-input"
                                        type="file"
                                        multiple
                                        onChange={handleFileUpload}
                                        style={{ display: "none" }} // Ẩn input thật, chỉ hiển thị nút
                                    />
                                </div>
                            </div>

                            <ul>
                                {uploadedFiles.map((file, index) => (
                                    <li key={index} className={cx("file-item")}>
                                        <span>{file.name}</span>
                                        <button
                                            className={cx("btn btn-danger btn-sm", 'btn_delete')}
                                            onClick={() => handleFileRemove(index)}
                                        >
                                            Xóa
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="d-flex justify-content-end gap-2 mt-2">
                        <button
                            className="btn btn-secondary"
                            onClick={() => props.handleCloseModule()}
                        >
                            Huỷ
                        </button>
                        <button
                            className="btn btn-warning ms-3"
                            onClick={() => handleSendReport()}
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HandleAction;
