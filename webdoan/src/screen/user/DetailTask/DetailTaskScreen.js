import React, {useEffect, useState} from 'react';
import styles from "./DetailTaskStyle.module.scss";
import classNames from "classnames/bind";
import {formatDate} from "../../../utils";
import moment from "moment";
import ItemRowComment from "../../../components/ItemRowComment/ItemRowComment";
import ListAction from "../../../components/ListAction";
import CreateTaskScreen from "../CreateTask/CreateTaskScreen";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    actionDownloadFile,
    actionGetDetailTask,
    actionRecallReport,
    actionReviewReport
} from "../../../redux-store/action/actionUser";

const cx = classNames.bind(styles);

const DetailTaskScreen = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.reducerAuth.token);

    const overViewUser = useSelector(state => state.reducerUser.overViewUser);

    const detailTask = useSelector(state => state.reducerUser.detailTask);

    const listPriorityTask = [
        { value: 0, label: 'Bình thường' },
        { value: 1, label: 'Quan trọng' },
        { value: 2, label: 'Rất quan trọng' },
    ]

    const [showAddComment, setShowAddComment] = useState();
    const [showModuleEditTask, setShowModuleEditTask] = useState(false);

    useEffect(() => {
        dispatch(actionGetDetailTask(token, props.task.item.task_id))
    }, [props.task.item]);

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
                    {moment(item.created_date).format('hh:mm A DD/MM/yyyy')}
                </div>
            </div>
        </div>
    )

    const handleDownloadFile = (file) => {
        dispatch(actionDownloadFile(token, file))
    }

    if(!detailTask) {
        return null
    }

    return (
        <div className={cx('DetailTaskScreen')}>
            <ListAction role={detailTask.role} task={detailTask} setShowModuleCreateTask={setShowModuleEditTask} />
            <div className={cx('text_header_title')}>{detailTask.title}</div>

            <div className={cx('body_detail_task')}>
                <div className={cx('col-md-12 mb-3')}>
                    <div className={cx('text_title_type', 'mb-2')}>
                        <div><i className={cx('bx bx-file', 'icon_document')}></i></div>
                        <div>Nội dung công việc</div>
                    </div>
                    <div className={cx('task_content')}>
                        <div className={cx('col-md-6', 'd-flex', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Người giao:</div>
                            <div className={cx('col-md-8')}>{detailTask.assign_department_name}/ {detailTask.assign_user_name}</div>
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Người chủ trì:</div>
                            <div className={cx('col-md-8')}>{detailTask.target_department_name}/ {detailTask.target_user_name}</div>
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Người phối hợp:</div>
                            <div className={cx('col-md-8')}>
                                {detailTask?.combinations?.length > 0 && detailTask?.combinations?.map(item => (
                                    <div>{item.combination_department_name}/ {item.combination_name}</div>
                                ))}
                            </div>
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Người theo dõi:</div>
                            <div className={cx('col-md-8')}>
                                {detailTask?.combinations?.length > 0 && detailTask?.combinations?.map(item => (
                                    <div>{item.department_name}/ {item.target_user_name}</div>
                                ))}
                            </div>
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Ngày tạo:</div>
                            <div className={cx('col-md-8')}>{formatDate(detailTask.created_date)}</div>
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Hạn xử lý:</div>
                            <div className={cx('col-md-8')}>{formatDate(detailTask.expired_date)}</div>
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Mức độ ưu tiên:</div>
                            <div className={cx('col-md-8')}>{listPriorityTask[detailTask?.priority || 0].label}</div>
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Nguồn nhiệm vụ:</div>
                            <div className={cx('col-md-8')}>{detailTask?.project_name}</div>
                        </div>

                        <div className={cx('col-md-12', 'd-flex', 'mb-2')}>
                            <div className={cx('col-md-1', 'fw-bold')}>Nội dung:</div>
                            <div className={cx('col-md-10')}>{detailTask?.content || ""}</div>
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

                    <table bordered className={cx("col-md-12", "table-fixed")}>
                        <thead>
                        <tr>
                            <th>Người gửi</th>
                            <th>Ý kiến xử lý</th>
                            <th>Ngày gửi</th>
                            <th>Ngày duyệt</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {detailTask.reports?.length > 0 && detailTask.reports?.map((report, index) => {
                            const status = report.status === 0 ? "Chờ duyệt" : report.status === 1 ? "Đã duyệt" : 'không duyệt'
                            const nameReport =
                                report.type === 0 ? "Yêu cầu báo cáo tiến độ"
                                : report.type === 1 ? "Báo cáo tiến độ"
                                        : report.type === 2 ? "Báo cáo hoàn thành"
                                            : report.type === 3 ? `Xin gia hạn đến: ${moment(report?.new_expired_date).format("HH:mm DD-MM-YYYY")}` : ''
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
                                    <td>
                                        <div className="d-flex gap-2">
                                            {(report.status === 0 && detailTask.role === 0) ? (
                                                <div>
                                                    <button
                                                        className="btn btn-outline-primary px-4 me-3"
                                                        onClick={() => {
                                                            dispatch(actionReviewReport(token, report.report_id, parseInt(overViewUser.userCurrent.user_id, 10), true, detailTask))
                                                        }}
                                                    >
                                                        Duyệt
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-warning px-4"
                                                        onClick={() => {
                                                            dispatch(actionReviewReport(token, report.report_id, parseInt(overViewUser.userCurrent.user_id, 10), false, detailTask))
                                                        }}
                                                    >
                                                        Từ chối
                                                    </button>
                                                </div>
                                            ) : report.can_evict ? (
                                                <button
                                                    className="btn btn-outline-danger px-4"
                                                    onClick={() => {
                                                        dispatch(actionRecallReport(token, report.report_id, detailTask))
                                                    }}
                                                >
                                                    Thu hồi
                                                </button>
                                            ) : null}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <div className={cx('col-md-12', 'mb-3')}>
                    <div className={cx('text_title_type', 'mb-2')}>
                        <div><i className={cx('bx bx-purchase-tag-alt', 'icon_document')}></i></div>
                        <div>File đính kèm</div>
                    </div>
                    <div className={cx('col-md-11')}>
                        {detailTask.files?.length > 0 && detailTask.files?.map(item => (
                            <div
                                className={cx('row_file', 'mb-2')}
                                onClick={() => handleDownloadFile(item)}
                            >
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
                            <ItemRowComment item={item} />
                        ))}
                    </div>

                    <div className={cx('col-md-11')}>
                        <div
                            className={cx('mb-1', 'd-flex', 'align-items-center', 'row_add_comment')}
                            onClick={() => setShowAddComment(!showAddComment)}
                        >
                            <i className={cx('bx bx-message-rounded', 'me-2')}></i>
                            <div>Thêm ý kiến xử lý</div>
                        </div>
                        {showAddComment && (<div className={cx('add_comment')}>
                            <textarea
                                className={cx("form-control", 'input_comment', 'col-md-11')}
                                placeholder="Ý kiến xử lý"
                                rows="3"
                            />
                            <div className="d-flex justify-content-end gap-2 mt-2">
                                <button className="btn btn-secondary">Huỷ</button>
                                <button className="btn btn-primary ms-3">Lưu</button>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>

            {showModuleEditTask && (<CreateTaskScreen setShowModuleCreateTask={setShowModuleEditTask} dataEdit={detailTask} />)}
        </div>
    );
};

export default DetailTaskScreen;
