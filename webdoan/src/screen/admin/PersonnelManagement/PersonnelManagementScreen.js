import React, {useEffect, useState} from "react";
import classNames from "classnames/bind";
import {useNavigate} from "react-router-dom";
import styles from "./PersonnelManagementStyle.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    actionGetListPersonnelManagement,
    actionGetPersonnel
} from "../../../redux-store/action/actionPersonnelManagement";

const cx = classNames.bind(styles);

const PersonnelManagementScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector(state => state.reducerAuth.token);
    const overViewAdmin = useSelector(state => state.reducerAuth.overViewAdmin);

    const listPersonnelManagementResponse = useSelector(state => state.reducerPersonnelManagement.listPersonnelManagementResponse);
    const listUsers = listPersonnelManagementResponse?.content || [];

    const [userNameSearch, setUserNameSearch] = useState('');
    const [fullNameSearch, setFullNameSearch] = useState('');
    const [active, setActive] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const [position, setPosition] = useState('');

    const [pageCurrent, setPageCurrent] = useState(1);
    const [sizePage, setSizePage] = useState(15);

    const handleToDetailUserScreen = (item, isCreate) => {
        navigate('/admin/DetailUserScreen', {
            state: {
                userSelect: item,
                isCreate: isCreate,
            }
        })
        if(isCreate) {
            dispatch(actionGetPersonnel(token));
        } else {
            dispatch(actionGetPersonnel(token, item.id));
        }
    }

    const handleSearchListPersonnelManagement = () => {
        dispatch(actionGetListPersonnelManagement(token, pageCurrent - 1, sizePage, userNameSearch, fullNameSearch, active, isAdmin, position));
    }

    useEffect(() => {
        dispatch(actionGetListPersonnelManagement(token, pageCurrent - 1, sizePage));
    }, [pageCurrent, sizePage]);

    return (
        <div className={cx('PersonnelManagementScreen', 'container')}>
            <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className={cx('d-flex', 'align-items-center')}>
                        <i className={cx('bx bxs-user-account', 'icon_header', 'me-2')}></i>
                        <h4>Quản lý nhân viên</h4>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-warning d-flex align-items-center me-2"
                            onClick={() => handleToDetailUserScreen(null, true)}
                        >
                            <i className="bx bx-plus me-1"></i>
                            TẠO MỚI
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-md-12">
                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Chức vụ</label>
                    <select className="form-control" onChange={e => setPosition(e.target.value)}>
                        <option value={''}>Tất cả</option>
                        {overViewAdmin.position && overViewAdmin.position.map(item => (
                            <option value={item.position_id}>{item.positionName}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Nhóm quyền</label>
                    <select
                        className="form-control"
                        value={isAdmin}
                        onChange={(event) => {
                            setIsAdmin(event.target.value);
                        }}
                    >
                        <option value={''}>Tất cả</option>
                        <option value={false}>Người dùng</option>
                        <option value={true}>Người quản trị</option>
                    </select>
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Trạng thái</label>
                    <select
                        className="form-control"
                        value={active}
                        onChange={(event) => {
                            setActive(event.target.value);
                        }}
                    >
                        <option value={''}>Tất cả</option>
                        <option value={true}>Hoạt động</option>
                        <option value={false}>Không hoạt động</option>
                    </select>
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Tên đăng nhập</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên đăng nhập"
                        value={userNameSearch}
                        onChange={e => setUserNameSearch(e.target.value)}
                    />
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Họ và tên</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Họ và tên"
                        value={fullNameSearch}
                        onChange={e=>setFullNameSearch(e.target.value)}
                    />
                </div>
                <button
                    className="btn btn-warning w-100 mb-3"
                    onClick={handleSearchListPersonnelManagement}
                >Tìm kiếm</button>
            </div>

            <div className="col-md-12">
                <table bordered hover className={cx("col-md-12")}>
                    <thead>
                    <tr className={cx("table_row")}>
                        <th>STT</th>
                        <th>Tên đăng nhập</th>
                        <th>Họ và tên</th>
                        <th>Hoạt động</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listUsers.map((item, index) => (
                        <tr key={index} className={cx("table_row")}>
                            <td onClick={() => handleToDetailUserScreen(item, false)}>{index + 1}</td>
                            <td onClick={() => handleToDetailUserScreen(item, false)}>{item.username}</td>
                            <td onClick={() => handleToDetailUserScreen(item, false)}>{item.fullName}</td>
                            <td onClick={() => handleToDetailUserScreen(item, false)}>
                                <input type="checkbox" className="form-check-input me-2" id="active" checked={item.active}/>
                            </td>
                            <td onClick={() => handleToDetailUserScreen(item, false)}>Sửa</td>
                            <td>
                                <div className="text-danger">Xóa</div>
                            </td>
                        </tr>
                    ))}
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
                        {listPersonnelManagementResponse?.totalPages ?
                            (Array.from({ length: listPersonnelManagementResponse.totalPages }, (_, index) => index + 1).map((page) => (
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
                                if (pageCurrent < listPersonnelManagementResponse?.totalPages) setPageCurrent(pageCurrent + 1)
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
        </div>
    )
}

export default PersonnelManagementScreen;
