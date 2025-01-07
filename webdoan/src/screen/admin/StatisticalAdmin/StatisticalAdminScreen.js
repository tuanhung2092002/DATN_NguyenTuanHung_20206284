import React, {useEffect, useState} from 'react';
import styles from './StatisticalAdminStyle.module.scss';
import classNames from "classnames/bind";
import TaskOverview from "../../../components/TaskOverview/TaskOverview";
import Chart from "../../../components/Chart/Chart";
import TableComponent from "../../../components/TableComponent/TableComponent";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Select from "react-select";
import {actionGetStatistic} from "../../../redux-store/action/actionUser";

const cx = classNames.bind(styles);

const StatisticalAdminScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.reducerAuth.token);

    const overViewAdmin = useSelector(state => state.reducerAuth.overViewAdmin);
    const staticResponse = useSelector(state => state.reducerUser.staticResponse);

    const flattenTreeForSelect = (tree, level = 0, parentLabel = "") => {
        let flatList = [];
        tree?.forEach((node) => {
            flatList.push({
                value: node.departmentId,
                label: `${parentLabel}${node.departmentName}`,
                department_parent_id: node.department_parent_id,
                isActive: node.isActive,
            });
            if (node.child_departments && node.child_departments.length > 0) {
                flatList = flatList.concat(
                    flattenTreeForSelect(node.child_departments, level + 1, `${parentLabel}--- `)
                );
            }
        });
        return flatList;
    };
    const flatList = flattenTreeForSelect(overViewAdmin?.departments);

    const [dateRange, setDateRange] = useState({fromDate: "", toDate: ""});
    const [assignDepartment, setAssignDepartment] = useState('');
    const [tagetDepartment, setTagetDepartment] = useState('');
    const [trangThai, setTrangThai] = useState('');

    const [priorityTask, setPriorityTask] = useState("");

    const listPriorityTask = [
        {value: 0, label: 'Bình thường'},
        {value: 1, label: 'Quan trọng'},
        {value: 2, label: 'Rất quan trọng'},
    ]

    const listStatus = [
        { value: "", label: "Tất cả" },
        { value: 0, label: "Mới tạo" },
        { value: 1, label: "Chờ duyệt" },
        { value: 2, label: "Xin gia hạn" },
        { value: 3, label: "Hoàn thành" },
        { value: 4, label: "Kết thúc" },
        { value: 5, label: "Thu hồi" },
    ]

    const handleDateChange = (event) => {
        const {name, value} = event.target;
        setDateRange((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(
                actionGetStatistic(
                    token,
                    dateRange?.fromDate || "",
                    dateRange?.toDate || "",
                    assignDepartment?.value || "",
                    "",
                    "",
                    tagetDepartment?.value || "",
                    trangThai?.value || "",
                    priorityTask?.value || "",
                    ""
                )
            );
        }, 10000);

        return () => clearTimeout(timer);
    }, [dateRange, assignDepartment, tagetDepartment, trangThai, priorityTask]);

    return (
        <div className={cx('StatisticalScreen')}>
            <div className={cx('StatisticalScreen_header')}>
                <div className={cx('d-flex', 'align-items-center')}>
                    <i className={cx('bx bx-line-chart', 'icon_header', 'me-2')}></i>
                    <h4>Thống kê</h4>
                </div>

                <div className="mt-4 col-md-12">
                    <div className="row">
                        <div className={cx("col-md-4")}>
                            <div className="form-group">
                                <label className="form-label">Thời gian</label>
                                <div className="d-flex align-items-center">
                                    <div className="d-flex align-items-center flex-grow-1">
                                        <label className="me-2">Từ</label>
                                        <input
                                            type="date"
                                            name="fromDate"
                                            className="form-control me-2"
                                            value={dateRange.fromDate}
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center flex-grow-1">
                                        <label className="me-2">đến</label>
                                        <input
                                            type="date"
                                            name="toDate"
                                            className="form-control"
                                            value={dateRange.toDate}
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx("col-md-2")}>
                            <div className="form-group">
                                <label className="form-label">Đơn vị giao</label>
                                <Select
                                    options={flatList}
                                    isSearchable
                                    className={cx("w-100", 'zIndex_100')}
                                    placeholder="Tìm kiếm phòng ban..."
                                    value={assignDepartment}
                                    onChange={(selected) => {
                                        setAssignDepartment(selected);
                                    }}
                                    menuPortalTarget={document.body}
                                    menuPosition="fixed"
                                    styles={{
                                        menuPortal: (base) => ({...base, zIndex: 9999}),
                                        menu: (base) => ({...base, zIndex: 9999})
                                    }}
                                />
                            </div>
                        </div>

                        <div className={cx("col-md-2")}>
                            <div className="form-group">
                                <label className="form-label">Đơn vị xử lý</label>
                                <Select
                                    options={flatList}
                                    isSearchable
                                    className={cx("w-100", 'zIndex_100')}
                                    placeholder="Tìm kiếm phòng ban..."
                                    value={tagetDepartment}
                                    onChange={(selected) => {
                                        setTagetDepartment(selected);
                                    }}
                                    menuPortalTarget={document.body}
                                    menuPosition="fixed"
                                    styles={{
                                        menuPortal: (base) => ({...base, zIndex: 9999}),
                                        menu: (base) => ({...base, zIndex: 9999})
                                    }}
                                />
                            </div>
                        </div>

                        <div className={cx("col-md-2")}>
                            <div className="form-group">
                                <label className="form-label">Mức độ quan trọng</label>
                                <Select
                                    options={listPriorityTask}
                                    isSearchable={false}
                                    className="w-100"
                                    placeholder="Chọn mức độ quan trọng"
                                    value={priorityTask}
                                    onChange={(selected) => setPriorityTask(selected)}
                                    menuPortalTarget={document.body}
                                    menuPosition="fixed"
                                    styles={{
                                        menuPortal: (base) => ({...base, zIndex: 9999}),
                                        menu: (base) => ({...base, zIndex: 9999})
                                    }}
                                />
                            </div>
                        </div>

                        <div className={cx("col-md-2")}>
                            <div className="form-group">
                                <label className="form-label">Trạng thái</label>
                                <Select
                                    options={listStatus}
                                    isSearchable={false}
                                    className="w-100"
                                    placeholder="Chọn mức độ quan trọng"
                                    value={trangThai}
                                    onChange={(selected) => setTrangThai(selected)}
                                    menuPortalTarget={document.body}
                                    menuPosition="fixed"
                                    styles={{
                                        menuPortal: (base) => ({...base, zIndex: 9999}),
                                        menu: (base) => ({...base, zIndex: 9999})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('col-md-12', 'mt-4', 'StatisticalScreen_body')}>
                <TaskOverview/>
                <Chart/>

                <div className={cx('col-md-12', 'd-flex', 'align-items-center', 'justify-content-end', 'mt-4', 'mb-3')}>
                    <button className="btn btn-primary btn-lg me-2">
                        Xuất báo cáo
                    </button>
                </div>
                <TableComponent data={staticResponse?.department}/>
            </div>
        </div>
    )
}

export default StatisticalAdminScreen;
