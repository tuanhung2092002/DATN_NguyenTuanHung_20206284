import React, {useState} from "react";
import styles from './ListActionStyle.module.scss';
import classNames from "classnames/bind";
import HandleAction from "./HandleAction";

const cx = classNames.bind(styles);

const ListActionFollow = (props) => {

    const [showHandleAction, setShowHandleAction] = useState(false);
    const [typeAction, setTypeAction] = useState('');
    const [showFile, setShowFile] = useState(false);
    const [showPercent, setShowPercent] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [reportType, setReportType] = useState(null);

    const handleCloseModule = () => {
        setShowHandleAction(false);
    }

    return (
        <div className={cx('row_action')}>
            <div
                className={cx('d-flex', 'action_item')}
                onClick={() => {
                    setTypeAction("Yêu cầu báo cáo tiến độ")
                    setShowHandleAction(true);
                    setShowComment(true);
                    setShowFile(false);
                    setReportType(0)
                }}
            >
                <i className={cx('bx bx-share', 'icon_action', 'me-2')}></i>
                <div>Yêu cầu báo cáo</div>
            </div>

            <div
                className={cx('d-flex', 'action_item')}
                onClick={() => {
                    setTypeAction("Báo cáo tiến độ")
                    setShowHandleAction(true);
                    setShowComment(true)
                    setShowFile(true)
                    setTypeAction(1);
                }}
            >
                <i className={cx('bx bx-share', 'icon_action', 'me-2')}></i>
                <div>Báo cáo</div>
            </div>

            {showHandleAction && (
                <HandleAction
                    task={props.task}
                    typeAction={typeAction}
                    title={props.task.title}
                    handleCloseModule={handleCloseModule}
                    showFile={showFile}
                    showPercent={showPercent}
                    showComment={showComment}
                    showDate={showDate}
                    reportType={reportType}
                />
            )}
        </div>
    )
}

export default ListActionFollow;
