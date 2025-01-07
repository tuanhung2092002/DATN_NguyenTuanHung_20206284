import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './HeaderStyle.module.scss';
import NoPage from "../../screen/noPage/NoPagge";
import PersonnelManagementScreen from "../../screen/admin/PersonnelManagement/PersonnelManagementScreen";
import DepartmentManagementScreen from "../../screen/admin/DepartmentManagement/DepartmentManagementScreen";
import DetailUserScreen from "../../screen/admin/DetailUser/DetailUserScreen";
import {useDispatch, useSelector} from "react-redux";
import {actionLogout} from "../../redux-store/action/actionAuth";
import ProjectManagementScreen from "../../screen/admin/ProjectManagement/ProjectManagementScreen";
import DetailProjectScreen from "../../screen/admin/DetailProject/DetailProjectScreen";
import DetailTaskAdminScreen from "../../screen/admin/DetailTaskAdmin/DetailTaskAdminScreen";
import StatisticalAdminScreen from "../../screen/admin/StatisticalAdmin/StatisticalAdminScreen";
import PositionManagementScreen from "../../screen/admin/DepartmentManagement/PositionManagementScreen";

const cx = classNames.bind(styles);

function HeaderAdmin () {

    const dispatch = useDispatch();

    const decoded = useSelector(state => state.reducerAuth.decoded);

    return (
        <Router>
            <div className={cx('HeaderAdmin', 'flex')}>
                <div className={cx('flex', 'list_management')}>
                    <Link to="/" className={cx('text-center', 'text_name_he_thong')}>HỆ THỐNG QUẢN LÝ DỰ ÁN</Link>

                    <div className={cx('flex', 'margin_left_50')}>
                        <Link to="/" className={cx('row_list_management')}>
                            <i className={cx('bx bxs-user-account', 'icon_header_admin')}></i>
                            <div>Quản lý nhân viên</div>
                        </Link>

                        <Link to="/admin/DepartmentManagementScreen" className={cx('row_list_management', 'margin_left_20')}>
                            <i className={cx('bx bxs-home', 'icon_header_admin')}></i>
                            <div>Quản lý phòng ban</div>
                        </Link>

                        <Link to="/admin/ProjectManagementScreen" className={cx('row_list_management', 'margin_left_20')}>
                            <i className={cx('bx bx-task', 'icon_header_admin')}></i>
                            <div>Quản lý dự án</div>
                        </Link>

                        <Link to="/admin/StatisticalAdminScreen" className={cx('row_list_management', 'margin_left_20')}>
                            <i className={cx('bx bx-line-chart', 'icon_header_admin')}></i>
                            <div>Thống kê</div>
                        </Link>
                    </div>
                </div>

                <div className={cx('flex', 'align-items-center')}>
                    <div className={cx('text_name_user')}>{decoded.sub}</div>
                    <div
                        className={cx('btn_logout')}
                        onClick={() => dispatch(actionLogout())}
                    >Đăng xuất</div>
                </div>
            </div>

            <div className={cx('screen')}>
                <Routes>
                    <Route path="/" element={<PersonnelManagementScreen />} />
                    <Route path="/admin/DepartmentManagementScreen" element={<DepartmentManagementScreen />} />
                    <Route path="/admin/DetailUserScreen" element={<DetailUserScreen />} />
                    <Route path="/admin/ProjectManagementScreen" element={<ProjectManagementScreen />} />
                    <Route path="/admin/DetailProjectScreen/:id" element={<DetailProjectScreen />} />
                    <Route path="/admin/DetailTaskAdminScreen/:id" element={<DetailTaskAdminScreen />} />
                    <Route path="/admin/StatisticalAdminScreen" element={<StatisticalAdminScreen />} />
                    <Route path="/admin/PositionManagementScreen" element={<PositionManagementScreen />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </div>
        </Router>
    )
}

export default HeaderAdmin;
