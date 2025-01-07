import React, {useEffect, useState} from "react";
import styles from './QuicklyHandleTasksStyle.module.scss';
import classNames from "classnames/bind";
import TaskList from "../../../components/TaskList/TaskList";
import {useDispatch, useSelector} from "react-redux";
import {get} from "axios";
import {useNavigate} from "react-router-dom";
import {actionLuiHanXuLy} from "../../../redux-store/action/actionUser";

const cx = classNames.bind(styles);

const QuicklyHandleTasksScreen = (props) => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.reducerAuth.token);

    const taskOfTheDay = useSelector(state => state.reducerUser.taskOfTheDay);
    const leaveProcessingTime = useSelector(state => state.reducerUser.leaveProcessingTime);

    const priorityAboveZero = leaveProcessingTime.map((item) => item?.taskImportant);
    const priorityOthers = leaveProcessingTime.flatMap((item) => item?.taskLeaves);

    const [showListTaskPriority, setShowListTaskPriority] = useState(true);
    const [showListTaskWorkToday, setShowListTaskWorkToday] = useState(true);

    const [textRecommendation, setTextRecommendation] = useState('');
    const handleDetailTask = (itemSelect) => {
        window.open(`/user/TaskDetail?itemID=${itemSelect.task_id}&title=${itemSelect.title}`, '_blank');
    }

    const handleLuiHanXuLy = () => {
        leaveProcessingTime.map(item => {
            dispatch(actionLuiHanXuLy(token, item?.taskImportant?.task_id, item?.taskLeaves, props.setShowModule));
        })
    }

    const handleNotLuiHanXuLy = () => {
        leaveProcessingTime.map(item => {
            dispatch(actionLuiHanXuLy(token, item?.taskImportant?.task_id, [], props.setShowModule));
        })
    }

    useEffect(() => {
        const getAdviceMessage = (overtimeInHours) => {
            if (overtimeInHours > 8 && overtimeInHours <= 10) {
                return "Bạn nên cân nhắc làm thêm giờ để hoàn thành các công việc còn lại.";
            } else if (overtimeInHours > 10) {
                return "Bạn nên cân nhắc làm thêm giờ và xem xét xin gia hạn thời gian xử lý cho các công việc chưa hoàn thành.";
            } else {
                return "Bạn hãy tập trung hoàn thành công việc đúng hạn.";
            }
        };
        setTextRecommendation(getAdviceMessage(taskOfTheDay?.avgTimeCompleted * taskOfTheDay?.tasks?.length));
    }, [taskOfTheDay])

    if(leaveProcessingTime?.length === 0 && taskOfTheDay?.tasks?.length === 0) {
        props.setShowModule(false)
    }

    return (
        <div className={cx('QuicklyHandleTasksScreen')}>
            <div className={cx('body_module_xu_ly_nhanh')}>
                <div className={cx('text_header_module_xu_ly_nhanh', 'header_fixed')}>
                    <div>Danh sách các nhiệm vụ</div>
                    <button
                        onClick={() => props.setShowModule(false)}
                        className={cx("btn", 'QuicklyHandleTasksScreen_body_close')}
                    >
                        <i className='bx bx-x'></i>
                    </button>
                </div>

                {leaveProcessingTime?.length !== 0 && (<div className={cx('p-3', 'container')}>
                    <div className={cx('d-flex', 'position-relative')}>
                        <div className={cx('text_header_module_xu_ly_nhanh', 'col-md-12')}>
                            Danh sách nhiệm vụ cần lùi hạn xử lý
                        </div>
                        <button
                            onClick={() => setShowListTaskPriority(!showListTaskPriority)}
                            className={cx("btn", 'show_list')}
                        >
                            <i className='bx bx-chevron-down'></i>
                        </button>
                    </div>

                    {showListTaskPriority && (
                        <div>
                            <div className={cx('p-3', 'container')}>
                                <div className={cx('col-md-12')}>
                                    <div className={cx('text_header_module_xu_ly_nhanh', 'mb-2')}>
                                        Danh sách nhiệm vụ có mức độ ưu tiên cao
                                    </div>
                                    <TaskList tasks={priorityAboveZero} handleDetailTask={handleDetailTask}
                                              showFullTaskList={true}/>
                                </div>

                                <div className={cx('col-md-12')}>
                                    <div className={cx('text_header_module_xu_ly_nhanh', 'mb-2')}>
                                        Danh sách nhiệm vụ có thể lùi hạn xử lý
                                    </div>
                                    <TaskList tasks={priorityOthers} handleDetailTask={handleDetailTask}
                                              showFullTaskList={true} showExpireNew={true}/>
                                </div>
                            </div>
                            <div className={cx('col-md-12', 'container', 'd-flex', 'justify-content-end', 'mb-5')}>
                                <button
                                    className={cx("btn btn-light", 'btn_footer')}
                                    onClick={() => handleNotLuiHanXuLy()}
                                >
                                    Không lùi hạn xử lý
                                </button>

                                <button
                                    className={cx("btn btn-primary", 'btn_footer')}
                                    onClick={() => handleLuiHanXuLy()}
                                >
                                    Lùi hạn xử lý
                                </button>
                            </div>
                        </div>
                    )}
                </div>)}

                {taskOfTheDay?.tasks?.length !== 0 && (<div className={cx('p-3', 'container')}>
                    <div className={cx('d-flex', 'position-relative')}>
                        <div className={cx('text_header_module_xu_ly_nhanh', 'col-md-12')}>
                            Danh sách nhiệm vụ cần hoàn thành trong ngày
                        </div>
                        <button
                            onClick={() => setShowListTaskWorkToday(!showListTaskWorkToday)}
                            className={cx("btn", 'show_list')}
                        >
                            <i className='bx bx-chevron-down'></i>
                        </button>
                    </div>

                    {showListTaskWorkToday && (
                        <div>
                            <div className={cx('p-3', 'container')}>
                                <TaskList tasks={taskOfTheDay?.tasks} handleDetailTask={handleDetailTask}
                                          showFullTaskList={true}/>
                            </div>

                            <div className={cx('col-md-12', 'container', 'mb-5', 'fw-bold', 'text_red')}>
                                {textRecommendation}
                            </div>
                        </div>
                    )}
                </div>)}
            </div>
        </div>
    )
}

export default QuicklyHandleTasksScreen;
