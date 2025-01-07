import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './HeaderStyle.module.scss';
import TaskListScreen from "../../screen/user/TaskList/TaskListScreen";
import NoPage from "../../screen/noPage/NoPagge";
import IconSearch from "../../icon/iconSearch";
import IconBell from "../../icon/iconBell";
import IconArrowDown from "../../icon/iconArrowDown";
import {useDispatch, useSelector} from "react-redux";
import {actionLogout} from "../../redux-store/action/actionAuth";
import SettingScreen from "../../screen/user/Setting/SettingScreen";
import StatisticalScreen from "../../screen/user/Statistical/StatisticalScreen";
import {actionGetNotificationList} from "../../redux-store/action/actionUser";
import {formatDate} from "../../utils";

const cx = classNames.bind(styles);

function HeaderUser () {

    const dispatch = useDispatch();
    const decoded = useSelector(state => state.reducerAuth.decoded);
    const token = useSelector(state => state.reducerAuth.token);

    const dataNotification = useSelector(state => state.reducerUser.listNotification);

    const [textSearch, setTextSearch] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [showCNUser, setShowCNUser] = useState(false);

    useEffect(() => {
        dispatch(actionGetNotificationList(token))
    }, []);

    return (
        <Router>
            <div className={cx('flex', 'HeaderTop')}>
                <Link
                    className={cx('text_name_he_thong')}
                    to={'/'}
                >
                    HỆ THỐNG QUẢN LÝ DỰ ÁN
                </Link>

                <div className={cx('flex', 'margin_right_20')}>
                    <div className={cx('search_header', 'flex')}>
                        <IconSearch />
                        <input
                            className={cx('input')}
                            placeholder={'Tìm kiếm'}
                            value={textSearch}
                            onChange={(e) => setTextSearch(e.target.value)}
                        />
                    </div>

                    <div
                        className={cx('notification')}
                        onClick={() => {
                            setShowCNUser(false);
                            setShowNotification(!showNotification)
                        }}
                    >
                        <IconBell />
                    </div>

                    <div
                        className={cx('flex', 'user', 'margin_left_10')}
                        onClick={() => {
                            setShowCNUser(!showCNUser);
                            setShowNotification(false);
                        }}
                    >
                        <div className={cx('text_name_user', 'margin_right_10')}>{decoded.sub}</div>
                        <div><IconArrowDown /></div>
                    </div>
                </div>
            </div>

            <div className={cx('screen')}>
                <Routes>
                    <Route path="/" element={<TaskListScreen />} />
                    <Route path="/user/TaskDetail" element={<TaskListScreen />} />
                    <Route path="/user/SettingScreen" element={<SettingScreen />} />
                    <Route path="/user/StatisticalScreen" element={<StatisticalScreen />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </div>

            {showCNUser && (
                <div className={cx('module_header')}>
                    <Link
                        onClick={() => setShowCNUser(!showCNUser)}
                        className={cx('row_module_header')}
                        to={'/user/StatisticalScreen'}
                    >
                        Thống kê
                    </Link>

                    <Link
                        onClick={() => setShowCNUser(!showCNUser)}
                        className={cx('row_module_header')}
                        to={'/user/SettingScreen'}
                    >
                        Thiết lập
                    </Link>

                    <div
                        className={cx('row_module_header', 'row_module_header_border_top')}
                        onClick={() => dispatch(actionLogout())}
                    >Đăng xuất</div>
                </div>
            )}

            {showNotification && (
                <div className={cx('module_header', 'module_header_notification')}>
                    {dataNotification.length > 0 ? (
                        dataNotification.map((item, index) => (
                            <div
                                key={index}
                                className={cx('item_notification')}
                                onClick={() => {
                                    window.open(`/user/TaskDetail?itemID=${item.task_id}&title=${item.task_title}`, '_blank');
                                }}
                            >
                                <div className={cx('d-flex', 'align-items-center', 'justify-content-between')}>
                                    <div className={cx('type_notify')}><i className='bx bx-plus'></i> {item.content}</div>
                                    <div>{formatDate(item.created_date)}</div>
                                </div>
                                <div className={cx('d-flex', 'align-items-center', 'mt-2')}>
                                    <i className={cx('bx bx-user-circle', 'icon_user_notify', 'me-3')}></i>
                                    <div>
                                        <div>
                                            {item.create_user_name}
                                        </div>

                                        <div>
                                            {`Nhiệm vụ: ${item.task_title}`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            Không có thông báo
                        </div>
                    )}
                </div>
            )}

        </Router>
    )
}

export default HeaderUser;
