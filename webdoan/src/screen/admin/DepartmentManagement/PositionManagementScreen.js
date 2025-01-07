import React, {useEffect, useState} from "react";
import classNames from "classnames/bind";
import 'react-treeview/react-treeview.css';
import styles from "./DepartmentManagementStyle.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    actionCreatePosition,
    actionGetListPositions, actionUpdatePosition
} from "../../../redux-store/action/actionDepartmentManagement";

const cx = classNames.bind(styles);

const RowPosition = ({ item, index }) => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.reducerAuth.token);
    const [positionName, setPositionName] = useState(item.position_name)
    const [isActive, setIsActive] = useState(item.isActive)

    const handleUpdatePosition = () => {
        dispatch(actionUpdatePosition(token, {position_id: item.position_id, position_name: positionName, isActive}))
    }

    return (
        <tr key={item.poision_id}>
            <td>{index + 1}</td>
            <td>
                <input
                    type="text"
                    className="form-control"
                    value={positionName}
                    onChange={e => setPositionName(e.target.value)}
                />
            </td>
            <td>
                <input
                    type="checkbox"
                    className={cx("check_box")}
                    checked={isActive}
                    onChange={e => setIsActive(e.target.checked)}
                />
            </td>
            <td>
                <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleUpdatePosition()}
                >
                    Cập nhập
                </button>
                <button
                    className="btn btn-danger btn-sm me-2"
                >
                    Xóa
                </button>
            </td>
        </tr>
    )
}

const PositionManagementScreen = () => {

    const dispatch = useDispatch();

    const token = useSelector(state => state.reducerAuth.token);
    const listPositions = useSelector(state => state.reducerDepartmentManagement.listPositions);
    const [showModal, setShowModal] = useState(false);
    const [positionNameNew, setPositionNameNew] = useState('')
    const [isActiveNew, setIsActiveNew] = useState(true)

    const handleCreatePosition = () => {
        if(positionNameNew.length > 0){
            setShowModal(false);
            dispatch(actionCreatePosition(token, positionNameNew, isActiveNew))
        } else {
            alert("Vui lòng nhập tên chức vụ");
        }
    }

    useEffect(() => {
        dispatch(actionGetListPositions(token))
    }, []);

    return (
        <div className={cx("container", "DepartmentManagementScreen")}>
            <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className={cx('d-flex', 'align-items-center')}>
                        <i className={cx('bx bxs-home', 'icon_header', 'me-2')}></i>
                        <h4>Quản lý chức vụ</h4>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-success d-flex align-items-center me-2"
                            onClick={() => setShowModal(!showModal)}
                        >
                            <i className="bx bx-plus me-1"></i>
                            TẠO MỚI CHỨC VỤ
                        </button>
                    </div>
                </div>
            </div>

            <div className={cx('DepartmentManagementScreen_body')}>
                <table bordered hover className={cx("col-md-12", "table-fixed")}>
                    <thead>
                    <tr>
                        <th className={cx('col-md-1')}>STT</th>
                        <th>Tên</th>
                        <th className={cx('col-md-2')}>Hoạt động</th>
                        <th className={cx('col-md-2')}>Thao Tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listPositions?.map((pos, index) => (
                        <RowPosition item={pos} index={index}/>
                    ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className={cx('moduleCreateDepartment')}>
                    <div className={cx('body_Module_Create')}>
                        <button
                            className={cx("btn btn-close", 'closeModuleDepartment')}
                            onClick={() => setShowModal(false)}
                        ></button>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4>Thông tin chức vụ</h4>

                            <button
                                className="btn btn-info d-flex align-items-center"
                                onClick={() => handleCreatePosition()}
                            >
                                Thêm chức vụ
                            </button>
                        </div>

                        <div className="col-md-12 row">
                            <div className={'col-md-12 d-flex align-items-center mb-4'}>
                                <label className={'col-md-3'}>Tên chức vụ <span className={'text_red'}>*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={positionNameNew}
                                    onChange={e => setPositionNameNew(e.target.value)}
                                />
                            </div>

                            <div className={'col-md-12 d-flex align-items-center'}>
                                <label className={'col-md-3'}>Hoạt động <span className={'text_red'}>*</span></label>
                                <input
                                    type="checkbox"
                                    className={cx("check_box")}
                                    checked={isActiveNew}
                                    onChange={e => setIsActiveNew(e.target.checked)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PositionManagementScreen;
