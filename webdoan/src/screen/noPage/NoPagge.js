import React from 'react';
import classNames from "classnames/bind";
import styles from "./nopage.module.scss";

const cx = classNames.bind(styles);

const NoPage = () => {

    return (
        <div className={cx('w90', 'container', 'NoPage')}>
            <h1>404 - Trang không tồn tại</h1>
            <p className={cx('mt-2')}>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
        </div>
    );
}

export default NoPage;
