import React, {useEffect, useState} from "react";
import classNames from "classnames/bind";
import styles from "./ProjectManagementStyle.module.scss";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {actionCreateProject, actionGetListProject} from "../../../redux-store/action/actionProjectManagement";
import {formatDate} from "../../../utils";
import moment from "moment";

const cx = classNames.bind(styles);

const ProjectManagementScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.reducerAuth.token);

    const [pageCurrent, setPageCurrent] = useState(1);
    const [sizePage, setSizePage] = useState(15);
    const [keyword, setKeyword] = useState("");
    const [fromCreatedDate, setFromCreatedDate] = useState("");
    const [toCreatedDate, setToCreatedDate] = useState("");
    const [fromExpiredDate, setFromExpiredDate] = useState("");
    const [toExpiredDate, setToExpiredDate] = useState("");

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [nameProjectNew, setNameProjectNew] = useState('');
    const [expiredDateNew, setExpiredDateNew] = useState(moment(new Date()).utc().format("YYYY-MM-DDTHH:mm"));
    const [contentProjectNew, setContentProjectNew] = useState('');

    const listProjectManagementResponse = useSelector(state => state.reducerProjectManagement.listProjectManagementResponse);

    const handleSearchProject = () => {
        dispatch(actionGetListProject(token, pageCurrent - 1, sizePage, keyword, fromCreatedDate, toCreatedDate, fromExpiredDate, toExpiredDate));
    }

    const handleResetSearchProject = () => {
        setKeyword('');
        setToCreatedDate('');
        setFromCreatedDate('');
        setToExpiredDate('');
        setFromExpiredDate('');
        dispatch(actionGetListProject(token, pageCurrent - 1, sizePage));
    }

    const hanldeCreateProject = () => {
        dispatch(actionCreateProject(token, {
            project_name: nameProjectNew,
            content: contentProjectNew,
            expired_date: moment(expiredDateNew).format("YYYY-MM-DDTHH:mm:ss"),
        }, setShowCreateModal));
    }

    useEffect(() => {
        dispatch(actionGetListProject(token, pageCurrent - 1, sizePage))
    }, [pageCurrent, sizePage])

    return (
        <div className={cx('ProjectManagementScreen', 'container')}>
            <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'mb-3')}>
                <div className={cx('d-flex', 'align-items-center')}>
                    <i className={cx('bx bx-task', 'icon_header', 'me-2')}></i>
                    <h4>Quản lý dự án</h4>
                </div>

                <button
                    className="btn btn-success d-flex align-items-center me-2"
                    onClick={() => setShowCreateModal(!showCreateModal)}
                >
                    <i className="bx bx-plus me-1"></i>
                    TẠO MỚI
                </button>
            </div>

            <div className="col-md-12">
                <div className={cx("mb-3 d-flex align-items-center", 'col-md-12')}>
                    <label className="col-md-2">Tên dự án</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên dự án"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>

                <div className={classNames("mb-3 d-flex align-items-center", "col-md-12")}>
                    <label className="col-md-2">Ngày tạo</label>
                    <input
                        type="date"
                        className={cx("form-control")}
                        placeholder="Từ ngày"
                        value={fromCreatedDate}
                        onChange={(e) => setFromCreatedDate(e.target.value)}
                    />
                    <span style={{margin: "0 20px"}}>đến</span>
                    <input
                        type="date"
                        className={cx("form-control")}
                        placeholder="Đến ngày"
                        min={fromCreatedDate}
                        value={toCreatedDate}
                        onChange={(e) => setToCreatedDate(e.target.value)}
                    />
                </div>

                <div className={classNames("mb-3 d-flex align-items-center", "col-md-12")}>
                    <label className="col-md-2">Hạn xử lý</label>
                    <input
                        type="date"
                        className={cx("form-control")}
                        placeholder="Từ ngày"
                        value={fromExpiredDate}
                        onChange={(e) => setFromExpiredDate(e.target.value)}
                    />
                    <span style={{margin: "0 20px"}}>đến</span>
                    <input
                        type="date"
                        className={cx("form-control")}
                        placeholder="Đến ngày"
                        min={fromExpiredDate}
                        value={toExpiredDate}
                        onChange={(e) => setToExpiredDate(e.target.value)}
                    />
                </div>

                <div className={cx('row', 'align-items-center', 'justify-content-around', 'col-md-12')}>
                    <button
                        onClick={() => handleResetSearchProject()}
                        className="btn btn-outline-dark col-md-3 mb-3"
                    >
                        Đặt lại
                    </button>

                    <button
                        onClick={() => handleSearchProject()}
                        className="btn btn-warning col-md-3 mb-3"
                    >
                        Tìm kiếm
                    </button>
                </div>
            </div>

            <div className={cx("col-md-12")}>
                <table bordered hover className={cx("col-md-12", 'table_list_project')}>
                    <thead>
                    <tr className={cx('text-center', 'table_row')}>
                        <th>STT</th>
                        <th className={cx('w-60')}>Tên dự án</th>
                        <th>Ngày tạo</th>
                        <th>Hạn xử lý dự án</th>
                        <th>Tổng số công việc</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listProjectManagementResponse.content && listProjectManagementResponse.content.length > 0 ? (
                        listProjectManagementResponse.content?.map((project, index) => (
                            <tr
                                key={index}
                                className={cx('text-center', 'table_row')}
                                onClick={() => {
                                    navigate(`/admin/DetailProjectScreen/${project.project_id}`);
                                }}
                            >
                                <td>{index + 1}</td>
                                <td className={cx('text_left', 'ps-4', 'pe-4')}>{project.project_name}</td>
                                <td>{formatDate(project.created_date)}</td>
                                <td>{formatDate(project.expired_date)}</td>
                                <td>{project.number_task}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className={cx("empty_row")}>
                                Không có dự án nào.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div
                            className={cx("p-2", 'btn_page')}
                            onClick={() => {
                                if (pageCurrent > 1) setPageCurrent(pageCurrent - 1)
                            }}
                        >{"<<"}</div>
                        {listProjectManagementResponse?.totalPages ?
                            (Array.from({ length: listProjectManagementResponse.totalPages }, (_, index) => index + 1).map((page) => (
                                <div
                                    key={page}
                                    className={cx("btn_page_number", 'btn_page', {
                                        active: page === pageCurrent, // Thêm class "active" nếu là trang hiện tại
                                    })}
                                    onClick={() => setPageCurrent(page)}
                                >
                                    {page}
                                </div>
                            ))) : (<div className={cx("btn_page_number", 'btn_page', 'active')}>1</div>)
                        }
                        <div
                            className={cx("p-2", 'btn_page')}
                            onClick={() => {
                                if (pageCurrent < listProjectManagementResponse?.totalPages) setPageCurrent(pageCurrent + 1)
                            }}
                        >{">>"}</div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        Số kết quả/trang:
                        <select
                            className="form-select form-select-sm ms-2"
                            style={{width: "auto", display: "inline-block"}}
                            value={sizePage}
                            onChange={(event) => {
                                setSizePage(event.target.value);
                            }}
                        >
                            <option value={15}>15</option>
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
            </div>

            {showCreateModal && (<div className={cx("module_create_project")}>
                <div className={cx("module_create_project_body")}>
                    <div className={cx('d-flex justify-content-between align-items-center', 'module_create_project_body_h')}>
                        <div>Thêm dự án</div>

                        <button
                            onClick={() => setShowCreateModal(!showCreateModal)}
                            className={cx("btn", 'module_close')}
                        >
                            <i className='bx bx-x'></i>
                        </button>
                    </div>

                    <div className={cx('container', 'mt-3')}>
                        <div className="col-md-12">
                            <div className={cx("mb-3 d-flex align-items-center", 'col-md-12')}>
                                <label className="col-md-2">Tên dự án</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tên dự án"
                                    value={nameProjectNew}
                                    onChange={(e) => setNameProjectNew(e.target.value)}
                                />
                            </div>

                            <div className={classNames("mb-3 d-flex align-items-center", "col-md-12")}>
                                <label className="col-md-2">Hạn xử lý</label>
                                <input
                                    type="datetime-local"
                                    className={cx("form-control")}
                                    placeholder="Từ ngày"
                                    value={expiredDateNew}
                                    onChange={(e) => setExpiredDateNew(e.target.value)}
                                />
                            </div>

                            <div className={cx("mb-3 d-flex", 'col-md-12')}>
                                <label className="col-md-2 mt-1">Mô tả dự án</label>
                                <textarea
                                    className="form-control"
                                    placeholder="Mô tả dự án"
                                    rows="5"
                                    value={contentProjectNew}
                                    onChange={(e) => setContentProjectNew(e.target.value)}
                                    style={{width: "100%", resize: "none"}}
                                />
                            </div>

                            <div className={cx('row', 'align-items-center', 'justify-content-end', 'col-md-12')}>
                                <button
                                    className="btn btn-primary col-md-3 mb-3"
                                    onClick={() => hanldeCreateProject()}
                                >
                                    Tạo dự án
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default ProjectManagementScreen;
