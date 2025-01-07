import React, {useState} from "react";
import styles from './ListActionStyle.module.scss';
import classNames from "classnames/bind";
import HandleAction from "./HandleAction";

const cx = classNames.bind(styles);

const ListActionTarget = (props) => {

    const [showHandleAction, setShowHandleAction] = useState(false);
    const [typeAction, setTypeAction] = useState('');
    const [showFile, setShowFile] = useState(false);
    const [showPercent, setShowPercent] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [showTransferProcessing, setShowTransferProcessing] = useState(false);
    const [reportType, setReportType] = useState(null);

    const handleCloseModule = () => {
        setShowHandleAction(false);
    }

    return (
        <div className={cx('row_action')}>
            <div
                className={cx('d-flex', 'action_item')}
                onClick={() => {
                    setTypeAction("Báo cáo tiến độ");
                    setShowComment(true);
                    setShowPercent(false);
                    setShowDate(false);
                    setShowFile(true);
                    setShowHandleAction(true);
                    setShowTransferProcessing(false);
                    setReportType(1);
                }}
            >
                <i className={cx('bx bx-share', 'icon_action', 'me-2')}></i>
                <div>Báo cáo</div>
            </div>

            <div
                className={cx('d-flex', 'action_item')}
                onClick={() => {
                    setTypeAction("Xin gia hạn nhiệm vụ")
                    setShowComment(true);
                    setShowPercent(false);
                    setShowDate(true);
                    setShowFile(false);
                    setShowTransferProcessing(false);
                    setShowHandleAction(true);
                    setReportType(3);
                }}
            >
                <i className={cx('bx bx-calendar', 'icon_action', 'me-2')}></i>
                <div>Xin gia hạn</div>
            </div>

            <div
                className={cx('d-flex', 'action_item')}
                onClick={() => {
                    setTypeAction("Trả lại nhiệm vụ");
                    setShowComment(true);
                    setShowPercent(false);
                    setShowDate(false);
                    setShowFile(false);
                    setShowTransferProcessing(false);
                    setShowHandleAction(true);
                    setReportType(104);
                }}
            >
                <i className={cx('bx bx-revision', 'icon_action', 'me-2')}></i>
                <div>Trả lại</div>
            </div>

            <div
                className={cx('d-flex', 'action_item')}
                onClick={() => {
                    setTypeAction("Tiến độ hoàn thành nhiệm vụ");
                    setShowComment(false);
                    setShowPercent(true);
                    setShowDate(false);
                    setShowFile(false);
                    setShowTransferProcessing(false);
                    setShowHandleAction(true);
                    setReportType(103);
                }}
            >
                <i className={cx('bx bxs-battery-low', 'icon_action', 'me-2')}></i>
                <div>Tiến độ</div>
            </div>

            <div
                className={cx('d-flex', 'action_item')}
                onClick={() => props.setShowModuleCreateTask(true)}
            >
                <i className={cx('bx bx-edit-alt', 'icon_action', 'me-2')}></i>
                <div>Chỉnh sửa</div>
            </div>

            <div
                className={cx('d-flex', 'action_item')}
                onClick={() => {
                    setTypeAction("Báo cáo hoàn thành nhiệm vụ");
                    setShowComment(true);
                    setShowPercent(false);
                    setShowDate(false);
                    setShowFile(true);
                    setShowTransferProcessing(false);
                    setShowHandleAction(true);
                    setReportType(2);
                }}
            >
                <i className={cx('bx bx-check-double', 'icon_action', 'me-2')}></i>
                <div>Hoàn thành</div>
            </div>

            <div
                className={cx('d-flex', 'action_item')}
                onClick={() => {
                    setTypeAction("Chuyển xử lý nhiệm vụ");
                    setShowComment(true);
                    setShowPercent(false);
                    setShowDate(false);
                    setShowFile(false);
                    setShowTransferProcessing(true);
                    setShowHandleAction(true);
                    setReportType(101);
                }}
            >
                <i className={cx('bx bx-paper-plane', 'icon_action', 'me-2')}></i>
                <div>Chuyển xử lý</div>
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
                    showTransferProcessing={showTransferProcessing}
                    reportType={reportType}
                />
            )}
        </div>
    )
}

export default ListActionTarget;
