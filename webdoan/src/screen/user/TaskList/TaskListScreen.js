import React, {useEffect, useState} from "react";
import classNames from 'classnames/bind';
import styles from './TaskListStyle.module.scss';
import TaskList from "../../../components/TaskList/TaskList";
import Search from "../../../components/Search/Search";
import DetailTaskScreen from "../DetailTask/DetailTaskScreen";
import CreateTaskScreen from "../CreateTask/CreateTaskScreen";
import QuicklyHandleTasksScreen from "../QuicklyHandleTasks/QuicklyHandleTasksScreen";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {
    actionGetListLeaveProcessingTime,
    actionGetListMenu,
    actionGetListTaskByMenu,
    actionGetListTaskOfTheDay
} from "../../../redux-store/action/actionUser";

const cx = classNames.bind(styles);

const TaskListScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.reducerAuth.token);

    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const itemSelectedId = query.get('itemID') || null;
    const itemSelectedTitle = query.get('title') || null;

    const dataList = useSelector(state => state.reducerUser.listTasks);

    const listMenu = useSelector(state => state.reducerUser.listMenu);

    const [menuSelected, setMenuSelected] = useState(listMenu[0])
    const [listChose, setListChose] = useState([
        {
            idChose: 1,
            nameChose: 'Nhiệm vụ',
        },
        {
            idChose: 2,
            nameChose: 'Tìm kiếm',
        }
    ])
    const [chose, setChose] = useState(listChose[0])
    const [showModule, setShowModule] = useState(true);
    const [showModuleCreateTask, setShowModuleCreateTask] = useState(false);
    const [resetView, setResetView] = useState(false);

    const handleDetailTask = (itemSelect) => {
        const updatedData = listChose.map((item, index) => {
            return {
                idChose: index + 1,
                nameChose: item.nameChose,
                item: item.item || {},
            }
        })
        updatedData.push({
            idChose: listChose.length + 1,
            nameChose: itemSelect.title,
            item: itemSelect,
        })
        setListChose(updatedData);
        setChose(updatedData[updatedData.length-1]);
    }

    const handleDeleteChose = (item) => {
        const updatedData = listChose.filter(chose => chose.idChose !== item.idChose);
        setListChose(updatedData);
        setResetView(true);
    }

    useEffect(() => {
        if(itemSelectedTitle && itemSelectedId) {
            const updatedData = listChose.map((item, index) => {
                return {
                    idChose: index + 1,
                    nameChose: item.nameChose,
                    item: item.item || {},
                }
            })
            updatedData.push({
                idChose: listChose.length + 1,
                nameChose: itemSelectedTitle,
                item: {
                    task_id: itemSelectedId,
                },
            })
            setListChose(updatedData);
            setChose(updatedData[updatedData.length-1]);
            setShowModule(false);
        }
    }, []);

    useEffect(() => {
        dispatch(actionGetListMenu(token));
        dispatch(actionGetListTaskOfTheDay(token));
        dispatch(actionGetListLeaveProcessingTime(token));
    }, []);

    useEffect(() => {
        if(itemSelectedId && itemSelectedTitle) {
            setChose(listChose[listChose.length - 1]);
        } else {
            setChose(listChose[0]);
        }
        dispatch(actionGetListTaskByMenu(token, menuSelected?.menu_id || 1))
    }, [menuSelected]);

    useEffect(() => {
        if(resetView) {
            setResetView(!resetView);
            setChose(listChose[0]);
        }
    }, [resetView])

    useEffect(() => {
        setMenuSelected(listMenu[0]);
    }, [listMenu])

    return (
        <div className={cx('TaskListScreen')}>
            <div className={cx('row')}>
                <div className={cx('col-md-3', 'list_menu')}>
                    <div className={cx('text_header_menu', 'mt-4', 'mb-4')}>Xử lý nhiệm vụ</div>

                    {listMenu?.map(itemMenu => (
                        <div>
                            <div
                                className={cx('flex', 'align-items-center', 'mb-2', 'row_menu', (menuSelected?.menu_id === itemMenu.menu_id ? 'active' : ''))}
                                onClick={() => {
                                    setMenuSelected(itemMenu);
                                }}
                            >
                                <div className={cx('me-3')}>
                                    <i className={cx('bx bx-folder-open', 'icon_folder', 'me-3')}></i>
                                    {itemMenu.menu_name}
                                </div>
                                <div className={cx('number_total')}>
                                    {itemMenu.total_task}
                                </div>
                            </div>
                            {itemMenu.menu_child?.length > 0 && itemMenu.menu_child?.map((item, index) => (
                                <div
                                    className={cx('flex', 'align-items-center', 'mb-2', 'row_menu_child', (menuSelected?.menu_id === item.menu_id ? 'active' : ''))}
                                    onClick={() => {
                                        setMenuSelected(item);
                                    }}
                                >
                                    <div className={cx('me-3')}>
                                        <i className={cx('bx bx-folder-open', 'icon_folder', 'me-3')}></i>
                                        {item.menu_name}
                                    </div>
                                    <div className={cx('number_total')}>
                                        {item.total_task}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className={cx('col-md-3')}></div>
                <div className={cx('col-md-9', 'list_task')}>
                    <div className={cx('flex', 'row_lua_chon')}>
                        {listChose.map(itemChose => (
                            <div
                                className={cx('item_lua_chon', (chose.idChose === itemChose.idChose ? 'active_lua_chon' : ''), (itemChose.idChose !== 1 && itemChose.idChose !== 2) ? 'pl_item_lua_chon' : '')}
                                onClick={() => setChose(itemChose)}
                            >
                                {itemChose.nameChose}
                                {itemChose.idChose !== 1 && itemChose.idChose !== 2 ? (<button
                                    className={cx("btn btn-close", 'close_item_lua_chon')}
                                    onClick={() => handleDeleteChose(itemChose)}
                                ></button>) : null}
                            </div>
                        ))}
                    </div>
                    {chose.idChose === 1 ? (<TaskList tasks={dataList} handleDetailTask={handleDetailTask}/>)
                        : chose.idChose === 2 ? (<Search handleDetailTask={handleDetailTask} />)
                            : (<DetailTaskScreen task={chose}/>)}
                </div>
            </div>

            {showModule && (<QuicklyHandleTasksScreen setShowModule={setShowModule} navigate={navigate} handleDetailTask={handleDetailTask} />)}

            <div
                onClick={() => setShowModuleCreateTask(!showModuleCreateTask)}
            >
                <i className={cx('bx bx-plus-circle', 'btn_create_task')}></i>
            </div>

            {showModuleCreateTask && (<CreateTaskScreen setShowModuleCreateTask={setShowModuleCreateTask}/>)}
        </div>
    )
}

export default TaskListScreen;
