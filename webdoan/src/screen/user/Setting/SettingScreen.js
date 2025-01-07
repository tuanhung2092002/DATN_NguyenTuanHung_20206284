import React, {useEffect, useState} from 'react';
import styles from './SettingStyle.module.scss';
import classNames from "classnames/bind";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {actionChangePassword, actionGetMyInfo, actionUpdateMyInfo} from "../../../redux-store/action/actionUser";
import moment from "moment";
import {toast} from "react-toastify";

const cx = classNames.bind(styles);

const SettingScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.reducerAuth.token);
    const myInfo = useSelector(state => state.reducerUser.myInfo);


    const [firstName, setFirstName] = useState(myInfo?.firstName);
    const [lastName, setLastName] = useState(myInfo?.lastName);
    const [fullName, setFulllName] = useState(myInfo?.fullName);
    const [dateOfBirth, setDateOfBirth] = useState(myInfo?.dateOfBirth);
    const [gender, setGender] = useState(myInfo?.gender);
    const [phone, setPhone] = useState(myInfo?.phone);
    const [email, setEmail] = useState(myInfo?.email);
    const [address, setAddress] = useState(myInfo?.homeTown);

    const [password, setPassword] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [passwordNew1, setPasswordNew1] = useState('');

    const handleChanelPassword = () => {
        if(passwordNew === passwordNew) {
            if(passwordNew === password) {
                toast.error('Mật khẩu mới phải khác mật khẩu cũ!')
            } else {
                dispatch(actionChangePassword(token, password, passwordNew));
            }
        }
    }

    const handleUpdateMyInfo = () => {
        dispatch(actionUpdateMyInfo(token, {
            "username": myInfo.username,
            "fullName": fullName,
            "lastName": lastName,
            "firstName": firstName,
            "email": email,
            "phone": phone,
            "homeTown": address,
            "gender": gender,
            "dateOfBirth": moment(dateOfBirth).format('YYYY-MM-DD'),
        }))
    }

    useEffect(() => {
        dispatch(actionGetMyInfo(token));
    }, [])

    return (
        <div className={cx('SettingScreen', 'container', 'col-md-12')}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className={cx('d-flex', 'align-items-center')}>
                    <i className={cx('bx bx-cog', 'icon_header', 'me-2')}></i>
                    <h4>Thiết lập tài khoản</h4>
                </div>

                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-success d-flex align-items-center me-2"
                        onClick={() => handleUpdateMyInfo()}
                    >
                        CẬP NHẬT
                    </button>
                </div>
            </div>

            <div className="col-md-12">
                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Tên đăng nhập:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={myInfo.username}
                        readOnly={true}
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Tên <span className="text-danger">*</span>:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Họ và tên đệm <span className="text-danger">*</span>:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập họ và tên đệm"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Họ và tên <span className="text-danger">*</span>:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập họ và tên"
                        value={fullName}
                        onChange={e => setFulllName(e.target.value)}
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
                    <div className="mb-3 d-flex align-items-center col-md-6">
                        <label className="col-md-4">Giới tính:</label>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio" name="gender" id="male"
                                checked={gender === 1}
                                onChange={() => setGender(1)}
                            />
                            <label className="form-check-label" htmlFor="male">Nam</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio" name="gender" id="female"
                                checked={gender === 0}
                                onChange={() => setGender(0)}
                            />
                            <label className="form-check-label" htmlFor="female">Nữ</label>
                        </div>
                    </div>

                    <div className={cx('col-md-6')}>
                        <input
                            type="checkbox"
                            className="form-check-input me-4"
                            id="active"
                            checked={true}
                            readOnly={true}
                        />
                        <label className="form-check-label" htmlFor="active">Hoạt động</label>
                    </div>
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Số điện thoại:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={"Nhập tên số địa thoại"}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Email:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập Email"
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

                <div className="mb-3 d-flex">
                    <label className="col-md-2 mt-2">Đổi mật khẩu:</label>
                    <div className="col-md-10">
                        <div className="mb-3 d-flex align-items-center col-md-12">
                            <label className="col-md-4">Nhập mật khẩu hiện tại:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập mật khẩu hiện tại"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 d-flex align-items-center col-md-12">
                            <label className="col-md-4">Nhập mật khẩu mới:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Nhập mật khẩu mới"
                                value={passwordNew}
                                onChange={e => setPasswordNew(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 d-flex align-items-center col-md-12">
                            <label className="col-md-4">Nhập lại mật khẩu mới:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Nhập lại mật khẩu mới"
                                value={passwordNew1}
                                onChange={e => setPasswordNew1(e.target.value)}
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-success d-flex align-items-center me-2"
                                onClick={() => handleChanelPassword()}
                            >
                                Đổi mật khẩu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingScreen;
