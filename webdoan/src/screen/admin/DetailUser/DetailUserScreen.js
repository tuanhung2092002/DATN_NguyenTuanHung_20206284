import React, {useEffect, useState} from "react";
import classNames from "classnames/bind";
import {useLocation, useNavigate} from "react-router-dom";
import Select from 'react-select';
import styles from "./DetailUserStyle.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    actionCreatePersonnel,
    actionGetPersonnel,
    actionResetPasswordPersonnel, actionUpdatePersonnel
} from "../../../redux-store/action/actionPersonnelManagement";

const cx = classNames.bind(styles);

const RowDepartment = ({ item, index, listPositions, handleDeleteItemDepartment }) => {
    const [isMain, setIsMain] = useState(item.isMain);

    const initialPosition = listPositions.find(pos => pos.value === item.position_id) || null;

    const [position, setPosition] = useState(initialPosition);

    const handleChosePosition = (itemPosition) => {
        setPosition(itemPosition);
        item.position = itemPosition;
    }

    return (
        <tr className={cx('text-center', 'table_row')} key={index}>
            <td>{index + 1}</td>
            <td className='text_left'>{item?.department_name || item?.departmentName}</td>
            <td>
                <Select
                    options={listPositions}
                    value={position || null}
                    onChange={handleChosePosition}
                    placeholder="Chọn chức vụ..."
                    className="mb-3 w-100"
                />
            </td>
            <td>
                <input
                    type="checkbox"
                    className="form-check-input" id="active"
                    checked={isMain}
                    onChange={(e) => {
                        item.isMain = e.target.checked;
                        setIsMain(e.target.checked);
                    }}
                />
            </td>
            <td onClick={() => handleDeleteItemDepartment(item)}
                className={cx('text_red')}>Xoá
            </td>
        </tr>
    )
}

const DetailUserScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.reducerAuth.token);
    const location = useLocation();
    const userSelect = location?.state.userSelect;
    const isCreate = location?.state.isCreate;

    const detailUser = useSelector(state => state.reducerPersonnelManagement.userSelected);
    const overViewAdmin = useSelector(state => state.reducerAuth.overViewAdmin);

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [listSelectedDepartment, setListSelectedDepartment] = useState([])
    const [newPassword, setNewPassword] = useState(null);

    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errorPhone, setErrorPhone] = useState("");
    const [address, setAddress] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [isAdminActive, setIsAdminActive] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');

    const [listDepartment, setListDepartment] = useState([]);
    const [listPositions, setListPositions] = useState([]);

    const handleDepartmentChange = (item) => {
        setSelectedDepartment(item);
        setListSelectedDepartment((prevList) => {
            const exists = prevList.some((department) => department.value === item.value);
            if (!exists) {
                // Thêm item với trường position
                return [...prevList, { ...item, position: null, isMain: false }];
            }
            return prevList;
        });
    };

    const handleDeleteItemDepartment = (item) => {
        setListSelectedDepartment((prevList) => {
            return prevList.filter((department) => department.value !== item.value);
        });
    }

    const flattenTreeForSelect = (tree, level = 0, parentLabel = "") => {
        let flatList = [];
        tree.forEach((node) => {
            flatList.push({
                value: node.departmentId,
                label: `${parentLabel}${node.departmentName}`,
                ...node,
            });
            if (node.child_departments && node.child_departments.length > 0) {
                flatList = flatList.concat(
                    flattenTreeForSelect(node.child_departments, level + 1, `${parentLabel}--- `)
                );
            }
        });
        return flatList;
    };
    const flattenTreeForSelect2 = (tree, level = 0, parentLabel = "") => {
        let flatList = [];
        tree.forEach((node) => {
            flatList.push({
                value: node.positionId,
                label: `${parentLabel}${node.positionName}`,
                ...node,
            });
        });
        return flatList;
    };

    const handleCreateUser = () => {
        const listDepartmentCreate = listSelectedDepartment.map((department) => {
            return {
                "department_id": department.value,
                "position_id": department.position.value,
                "isMain": department.isMain
            }
        });

        const userNew = {
            username: userName,
            password: password,
            firstname: firstName,
            lastname: lastName,
            fullname: fullName,
            dateofbirth: dateOfBirth,
            gender: gender,
            email: email,
            phone: phone,
            hometown: address,
            isActive: isActive === undefined ? true : isActive,
            isAdmin: isAdminActive === undefined ? false : isAdminActive,
            departments: listDepartmentCreate,
        };
        dispatch(actionCreatePersonnel(token, userNew, navigate))
    }

    const handleUpdateUser = () => {
        const listDepartmentCreate = listSelectedDepartment.map((department) => {
            return {
                "department_id": department?.value || department?.department_id,
                "position_id": department.position?.value || department.position_id,
                "isMain": department.isMain
            }
        });

        const userNew = {
            user_id: detailUser.user_id,
            username: userName,
            firstname: firstName,
            lastname: lastName,
            fullname: fullName,
            dateofbirth: dateOfBirth,
            gender: gender,
            email: email,
            phone: phone,
            hometown: address,
            isActive: isActive === undefined ? true : isActive,
            isAdmin: isAdminActive === undefined ? false : isAdminActive,
            departments: listDepartmentCreate,
        }
        dispatch(actionUpdatePersonnel(token, userNew, navigate))
    }

    const handleResetPassword = () => {
        dispatch(actionResetPasswordPersonnel(token, detailUser.user_id, newPassword))
    }

    useEffect(() => {
        if(overViewAdmin.departments?.length > 0){
            const departments = flattenTreeForSelect(overViewAdmin.departments);
            setListDepartment(departments);
        }
        if(overViewAdmin.position?.length > 0){
            const positions = flattenTreeForSelect2(overViewAdmin.position);
            setListPositions(positions);
        }
    }, [overViewAdmin]);

    useEffect(() => {
        if(userSelect) {
            dispatch(actionGetPersonnel(token, userSelect.id));
        } else {
            dispatch(actionGetPersonnel(token));
        }
    }, []);

    useEffect(() => {
        if(detailUser) {
            setUserName(detailUser.username);
            setLastName(detailUser.lastName || '');
            setFullName(detailUser.fullName || '');
            setFirstName(detailUser.firstName || '');
            setGender(detailUser.gender);
            setEmail(detailUser.email || '');
            setDateOfBirth(detailUser.dateOfBirth || '');
            setListSelectedDepartment(detailUser.department || []);
            setPhone(detailUser.phone || '');
            setAddress(detailUser.hometown || '');
            setIsActive(detailUser.isActive);
            setIsAdminActive(detailUser.isAdmin);
        }
    }, [detailUser]);

    return (
        <div className={cx('DetailUserScreen', 'container')}>
            <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className={cx('d-flex', 'align-items-center')}>
                        <i className={cx('bx bxs-user', 'icon_header', 'me-2')}></i>
                        <h4>Thông tin nhân viên</h4>
                    </div>

                    {isCreate ?
                        (<button
                            type="button"
                            className="btn btn-success col-md-2 margin_left_20"
                            onClick={handleCreateUser}
                        >THÊM MỚI</button>) :
                        (<button
                            type="button"
                            className="btn btn-success col-md-2 margin_left_20"
                            onClick={handleUpdateUser}
                        >CẬP NHẬT</button>)
                    }
                </div>
            </div>

            <div className="col-md-12">
                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Tên đăng nhập:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={"Nhập tên đăng nhập"}
                        readOnly={!isCreate}
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Tên <span className="text-danger">*</span>:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Họ và tên đệm <span className="text-danger">*</span>:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập họ và tên đệm"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Họ và tên <span className="text-danger">*</span>:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập họ và tên"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Ngày sinh <span className="text-danger">*</span>:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={dateOfBirth}
                        onChange={e => setDateOfBirth(e.target.value)}
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Giới tính:</label>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio" name="gender"
                            id="male" value="male"
                            checked={gender === 1}
                            onChange={e => setGender(e.target.value ? 1 : 0)}
                        />
                        <label className="form-check-label" htmlFor="male">Nam</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            checked={gender === 0}
                            onChange={e => setGender(e.target.value ? 0 : 1)}
                        />
                        <label className="form-check-label" htmlFor="female">Nữ</label>
                    </div>
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Số điện thoại:</label>
                    <div className="col-md-10">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={"Nhập số địa thoại"}
                            value={phone}
                            onChange={e => {
                                const value = e.target.value;
                                setPhone(value);
                                if (value.length !== 10) {
                                    setErrorPhone("Số điện thoại phải có tối thiểu 10 chữ số.");
                                } else {
                                    setErrorPhone("");
                                }
                            }}
                        />
                        {errorPhone && <p style={{ color: "red", marginTop: "5px" }}>{errorPhone}</p>}
                    </div>
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Email:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={"Nhập Email"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Địa chỉ:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập địa chỉ"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Thêm phòng ban:</label>
                    <Select
                        options={listDepartment}
                        value={selectedDepartment || null}
                        onChange={handleDepartmentChange}
                        placeholder="Tìm phòng ban..."
                        className="mb-3 w-100"
                    />
                </div>
                <div>
                    {listSelectedDepartment?.length !== 0 && (
                        <table className={cx('w-100', 'table')}>
                            <thead>
                            <tr className={cx('text-center', 'table_row')}>
                                <th>STT</th>
                                <th className={cx('w-50')}>Tên phòng</th>
                                <th>Chức vụ</th>
                                <th>Phòng ban chính</th>
                                <th>Xoá</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listSelectedDepartment?.map((item, index) => (
                                <RowDepartment
                                    item={item}
                                    index={index}
                                    listPositions={listPositions}
                                    handleDeleteItemDepartment={handleDeleteItemDepartment}
                                />
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <div className={cx('col-md-3')}>
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            id="active"
                            checked={isActive}
                            onChange={(e) => {
                                setIsActive(e.target.checked);
                            }}
                        />
                        <label className="form-check-label" htmlFor="active">Hoạt động</label>
                    </div>

                    <div className={cx('col-md-3')}>
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            id="active"
                            checked={isAdminActive}
                            onChange={(e) => {
                                setIsAdminActive(e.target.checked);
                            }}
                        />
                        <label className="form-check-label" htmlFor="active">Quản trị viên hệ thống</label>
                    </div>
                </div>

                {!isCreate ? (<div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Mật khẩu reset mặc định:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-info col-md-2 margin_left_20"
                        onClick={handleResetPassword}
                    >Reset mật khẩu
                    </button>
                </div>) : (<div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Mật khẩu:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập mật khẩu mới"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                </div>)}
            </div>
        </div>
    )
}

export default DetailUserScreen;
