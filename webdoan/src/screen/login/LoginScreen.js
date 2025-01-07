import React, {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import styles from './LoginStyle.module.scss';
import {useDispatch} from "react-redux";
import {actionLogin, actionRefreshToken} from "../../redux-store/action/actionAuth";
import IconMail from "../../icon/iconMail";
import IconLock from "../../icon/iconLock";

const cx = classNames.bind(styles);

const LoginScreen = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const [valueUsername, setValueUsername] = useState(username || '');
    const [valuePassword, setValuePassword] = useState(password || '');

    const handleLoin = () => {
        dispatch(actionLogin(valueUsername, valuePassword));
    }

    useEffect(() => {
        if(token) {
            dispatch(actionRefreshToken(token));
        }
    }, []);

    return (
        <div className={cx('LoginScreen')}>
            <div className={cx('loginModule')}>
                <div className={cx('text_header')}>HỆ THỐNG QUẢN LÝ DỰ ÁN</div>
                <div className={cx('title_header')}>Đăng nhập</div>
                <div className={cx('row_input')}>
                    <IconMail />
                    <input
                        className={cx('input')}
                        placeholder={'Tài khoản'}
                        value={valueUsername}
                        onChange={(e) => setValueUsername(e.target.value)}
                    />
                </div>
                <div className={cx('row_input', 'margin_top_10')}>
                    <IconLock />
                    <input
                        className={cx('input')}
                        placeholder={'Mật khẩu'}
                        type={'password'}
                        value={valuePassword}
                        onChange={(e) => setValuePassword(e.target.value)}
                    />
                </div>

                <div
                    className={cx('text_right', 'margin_top_10', 'text_forgot_password')}
                    onClick={() => {
                        alert("Vui lòng liên hệ với quản trị viên để được hỗ trợ")
                    }}
                >
                    Quên mật khẩu
                </div>

                <div
                    className={cx('btn_login', 'margin_top_30')}
                    onClick={handleLoin}
                >
                    Đăng nhập
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;
