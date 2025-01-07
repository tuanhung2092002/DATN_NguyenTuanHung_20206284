import moment from "moment";
import React, {useState} from "react";
import classNames from "classnames/bind";
import styles from "../../screen/user/DetailTask/DetailTaskStyle.module.scss";
import ItemRowCommentChild from "./ItemRowCommentChild";

const cx = classNames.bind(styles);

const ItemRowComment = ({ item }) => {

    const [showAddCommentParent, setShowAddCommentParent] = useState(false);

    return (
        <div>
            <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'mb-3')}>
                <div className={cx('d-flex', 'align-items-center')}>
                    <i className={cx('bx bx-user-circle', 'icon_user', 'me-2')}></i>
                    <div>
                        <div>{item.label_name}</div>
                        <div>{item.content}</div>
                        <div
                            className={cx('btn_response')}
                            onClick={() => {
                                setShowAddCommentParent(!showAddCommentParent)
                            }}
                        >
                            Trả lời
                        </div>
                    </div>
                </div>

                <div>
                    {moment(item.created_date).format('hh:mm A DD/MM/yyyy')}
                </div>
            </div>

            {showAddCommentParent && (<div className={cx('add_comment', 'ms-5')}>
                <textarea
                    className={cx("form-control", 'input_comment')}
                    placeholder="Ý kiến xử lý"
                    rows="3"
                />
                <div className="d-flex justify-content-end gap-2 mt-2">
                    <button className="btn btn-secondary">Huỷ</button>
                    <button className="btn btn-primary ms-3">Lưu</button>
                </div>
            </div>)}

            {item.children && item.children.length && item.children.map(itemChildren => (
                <ItemRowCommentChild item={itemChildren} />
            ))}
        </div>
    )
}

export default ItemRowComment;
