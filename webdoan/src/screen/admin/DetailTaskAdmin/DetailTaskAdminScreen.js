import React, {useEffect, useState} from "react";
import classNames from "classnames/bind";
import styles from "./DetailTaskAdminStyle.module.scss";
import {formatDate} from "../../../utils";
import moment from "moment";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {actionGetDetailTask, actionRecallReport, actionReviewReport} from "../../../redux-store/action/actionUser";
import ListAction from "../../../components/ListAction";
import ItemRowComment from "../../../components/ItemRowComment/ItemRowComment";
import CreateTaskScreen from "../../user/CreateTask/CreateTaskScreen";

const cx = classNames.bind(styles);

const DetailTaskAdminScreen = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.reducerAuth.token);
    const overViewAdmin = useSelector(state => state.reducerAuth.overViewAdmin);
    const detailTask = useSelector(state => state.reducerUser.detailTask);

    const [titleTask, setTitleTask] = useState(detailTask?.title || '');
    const [assignTask, setAssignTask] = useState('');
    const [targetTask, setTargetTask] = useState('');
    const [combinationTask, setCombinationTask] = useState([]);
    const [assignDepartment, setAssignDepartment] = useState('');
    const [priorityTask, setPriorityTask] = useState(0);
    const [expiredDate, setExpiredDate] = useState(moment(new Date()).utc().format("YYYY-MM-DDTHH:mm"));
    const [contentTask, setContentTask] = useState('');

    useEffect(() => {
        dispatch(actionGetDetailTask(token, id))
    }, [id]);

    useEffect(() => {
        setTitleTask(detailTask?.title || '');
        setExpiredDate(moment(detailTask?.expired_date).utc().format("YYYY-MM-DDTHH:mm"));
        setContentTask(detailTask?.content || '');
    }, [detailTask])

    const itemRowTimeLines = (item) => (
        <div>
            <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'mb-3')}>
                <div className={cx('d-flex', 'align-items-center')}>
                    <i className={cx('bx bx-user-circle', 'icon_user', 'me-2')}></i>
                    <div>
                        <div>{item.label_name}</div>
                        <div>{item.content}</div>
                    </div>
                </div>

                <div>
                    {moment(item.created_date).utc().format('hh:mm A DD/MM/yyyy')}
                </div>
            </div>
        </div>
    )

    if(!detailTask) {
        return null
    }

    return (
        <div className={cx('DetailTaskAdminScreen', 'container')}>
            <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'mb-4')}>
                <div className={cx('d-flex', 'align-items-center')}>
                    <i className={cx('bx bx-task', 'icon_header', 'me-2')}></i>
                    <h4>Chi tiết nhiệm vụ</h4>
                </div>

                <button
                    type="button"
                    className="btn btn-success col-md-2 margin_left_20"
                >
                    CẬP NHẬT
                </button>
            </div>

            <div className={cx('col-md-12', 'mb-3')}>
                <div className={cx('d-flex', 'align-items-center')}>
                    <label className={cx("col-md-2")}>Tiêu đề nhiệm vụ <span
                        className={cx('text_red')}>*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tiêu đề nhiệm vụ"
                        value={titleTask}
                        onChange={(e) => setTitleTask(e.target.value)}
                    />
                </div>
            </div>

            <div className={cx('body_detail_task')}>
                <div className={cx('col-md-12', 'mb-3')}>
                    <div className={cx('text_title_type', 'mb-3')}>
                        <div><i className={cx('bx bx-file', 'icon_document')}></i></div>
                        <div>Nội dung công việc</div>
                    </div>
                    <div className={cx('task_content', 'row', 'col-md-12')}>
                        <div className={cx('col-md-6', 'd-flex', 'mb-3', 'align-items-center')}>
                            <div className={cx('col-md-4', 'fw-bold')}>Người giao:</div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mức độ quan trọng"
                                value={`${detailTask.assign_department_name}/ ${detailTask.assign_user_name}`}
                            />
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'mb-3', 'align-items-center')}>
                            <div className={cx('col-md-4', 'fw-bold')}>Người chủ trì:</div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mức độ quan trọng"
                                value={`${detailTask.target_department_name}/ ${detailTask.target_user_name}`}
                            />
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'mb-3')}>
                            <div className={cx('col-md-4', 'fw-bold')}>Người phối hợp:</div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mức độ quan trọng"
                                value={`${detailTask.target_department_name}/ Lê Dương Phong`}
                            />
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'mb-3')}>
                            <div className={cx('col-md-4', 'fw-bold')}>Người theo dõi:</div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mức độ quan trọng"
                                value={`${detailTask.target_department_name}/ Chu Bá Nhất`}
                            />
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'mb-3', 'align-items-center')}>
                            <div className={cx('col-md-4', 'fw-bold')}>
                                Ngày tạo: <span className={cx('text_red')}>*</span>
                            </div>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={moment(detailTask.created_date).utc().format("YYYY-MM-DDTHH:mm")}
                                readOnly={true}
                            />
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'mb-3', 'align-items-center')}>
                            <div className={cx('col-md-4', 'fw-bold')}>
                                Hạn xử lý: <span className={cx('text_red')}>*</span>
                            </div>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={expiredDate}
                                min={moment(detailTask.created_date).utc().format("YYYY-MM-DDTHH:mm")}
                                onChange={(e) => setExpiredDate(e.target.value)}
                            />
                        </div>

                        <div className={cx('col-md-6', 'mb-3', 'd-flex', 'align-items-center')}>
                            <div className={cx('col-md-4', 'fw-bold')}>
                                Mức độ quan trọng <span className={cx('text_red')}>*</span>
                            </div>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Mức độ quan trọng"
                                value={priorityTask}
                                onChange={(e) => setPriorityTask(e.target.value)}
                            />
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'mb-3', 'align-items-center')}>
                            <div className={cx('col-md-4', 'fw-bold')}>Nguồn nhiệm vụ:</div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mức độ quan trọng"
                                value={detailTask?.project_name || null}
                            />
                        </div>

                        <div className={cx('col-md-12', 'd-flex', 'mb-3')}>
                            <div className={cx('col-md-2', 'fw-bold')}>Nội dung:</div>
                            <textarea
                                className={cx("form-control")}
                                placeholder="Nội dung nhiệm vụ"
                                rows="4"
                                value={contentTask}
                                onChange={(e) => setContentTask(e.target.value)}
                            />
                        </div>

                        <div className={cx('col-md-12', 'mb-2')}>
                            <div className={cx('col-md-2', 'fw-bold', 'mb-2')}>kết quả nhiệm vụ:</div>
                            <div className={cx('col-md-11')}>
                                {detailTask.file_in_report_complete?.length && detailTask.file_in_report_complete?.map(item => (
                                    <div className={cx('row_file')}>
                                        <div className={cx('text_file')}>{item.file_name}</div>
                                        <i className={cx('bx bx-cloud-download', 'icon_download')}></i>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('col-md-12', 'mb-3')}>
                    <div className={cx('text_title_type', 'mb-2')}>
                        <div><i className={cx('bx bxs-file-blank', 'icon_document')}></i></div>
                        <div>Báo cáo</div>
                    </div>

                    <table className={cx("col-md-12", "table-fixed")}>
                        <thead>
                        <tr>
                            <th>Người gửi</th>
                            <th>Ý kiến xử lý</th>
                            <th>Ngày gửi</th>
                            <th>Ngày duyệt</th>
                            <th>Trạng thái</th>
                        </tr>
                        </thead>
                        <tbody>
                        {detailTask.reports?.length > 0 && detailTask.reports?.map((report, index) => {
                            const status = report.status === 0 ? "Chờ duyệt" : report.status === 1 ? "Đã duyệt" : 'không duyệt'
                            const nameReport =
                                report.type === 0 ? "Yêu cầu báo cáo tiến độ"
                                    : report.type === 1 ? "Báo cáo tiến độ"
                                        : report.type === 2 ? "Báo cáo hoàn thành"
                                            : report.type === 3 ? `Xin gia hạn đến: ${moment(report?.new_expired_date).utc().format("HH:mm DD-MM-YYYY")}` : ''
                            return (
                                <tr key={index}>
                                    <td>{report.create_user_name}</td>
                                    <td className={cx('text_left')}>
                                        <div>
                                            {nameReport}
                                        </div>
                                        <div>
                                            {`Ý kiến: ${report.content || ''}`}
                                        </div>
                                    </td>
                                    <td>{formatDate(report.created_date)}</td>
                                    <td>{formatDate(report.completed_date || null)}</td>
                                    <td className={cx(report.status !== 0 && report.status !== 1 ? 'text_red' : 'text_green')}>{status}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <div className={cx('col-md-12 mb-3')}>
                    <div className={cx('text_title_type', 'mb-2')}>
                        <div><i className={cx('bx bx-purchase-tag-alt', 'icon_document')}></i></div>
                        <div>File đính kèm</div>
                    </div>
                    <div className={cx('col-md-11')}>
                        {detailTask.files?.length > 0 && detailTask.files?.map(item => (
                            <div className={cx('row_file')}>
                                <div className={cx('text_file')}>{item.file_name}</div>
                                <i className={cx('bx bx-cloud-download', 'icon_download')}></i>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={cx('col-md-12', 'mb-3')}>
                    <div className={cx('text_title_type', 'mb-2')}>
                        <div><i className={cx('bx bx-time-five', 'icon_document')}></i></div>
                        <div>Lịch sử tiến độ xử lý</div>
                    </div>
                    <div className={cx('col-md-11')}>
                        {detailTask.history?.length > 0 && detailTask.history?.map(item => {
                            return itemRowTimeLines(item)
                        })}
                    </div>
                </div>

                <div className={cx('col-md-12', 'mb-3')}>
                    <div className={cx('text_title_type', 'mb-2')}>
                        <div><i className={cx('bx bx-message-rounded-dots', 'icon_document')}></i></div>
                        <div>Ý kiến xử lý</div>
                    </div>
                    <div className={cx('col-md-11')}>
                        {detailTask.comments?.length > 0 && detailTask.comments?.map(item => (
                            <ItemRowComment item={item}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailTaskAdminScreen
