import React, {useEffect, useState} from "react";
import styles from './CreateTaskStyle.module.scss'
import classNames from "classnames/bind";
import Select from 'react-select';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {actionCreateTask, actionGetListUserOfProject, actionUpdateTask} from "../../../redux-store/action/actionUser";
import moment from "moment";
import {toast} from "react-toastify";

const cx = classNames.bind(styles);

const CreateTaskScreen = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.reducerAuth.token);

    const overViewUser = useSelector(state => state.reducerUser.overViewUser);
    const listUserOfProject = useSelector(state => state.reducerUser.listUserOfProject);

    const listPriorityTask = [
        { value: 0, label: 'Bình thường' },
        { value: 1, label: 'Quan trọng' },
        { value: 2, label: 'Rất quan trọng' },
    ]

    const [titleTask, setTitleTask] = useState(props?.dataEdit?.title || '');
    const [assignTask, setAssignTask] = useState('');
    const [targetTask, setTargetTask] = useState('');
    const [combinationTask, setCombinationTask] = useState([]);
    const [assignDepartment, setAssignDepartment] = useState('');
    const [sourceTask, setSourceTask] = useState(null);
    const [priorityTask, setPriorityTask] = useState(listPriorityTask[props?.dataEdit?.priority || 0]);
    const [createDate, setCreateDate] = useState(moment(props?.dataEdit?.created_date).utc().format("YYYY-MM-DDTHH:mm") || moment(new Date()).utc().format("YYYY-MM-DDTHH:mm"));
    const [expiredDate, setExpiredDate] = useState(moment(props?.dataEdit?.expired_date).utc().format("YYYY-MM-DDTHH:mm") || moment(new Date()).utc().format("YYYY-MM-DDTHH:mm"));
    const [contentTask, setContentTask] = useState(props?.dataEdit?.content || '');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [optionsProject, setOptionsProject] = useState([]);

    const mapDepartmentsToOptions = (deps, level = 0) => {
        if(deps.length === 0) return deps;
        return deps.map((dep) => ({
            label: `${'----'.repeat(level)} ${dep.department_name}`,
            options: [
                // Duyệt qua users của department
                ...dep.users.map((user) => ({
                    value: `${user.user_id}`,
                    label: `${'----'.repeat(level + 1)} 👤 ${user.full_name}`,
                    department_id: dep.department_id,
                })),
                // Đệ quy xử lý departments con
                ...mapDepartmentsToOptions(dep.children || [], level + 1),
            ],
        }));
    };

    const optionsAssignDepartment = overViewUser.userCurrent.departments.map((department) => ({
        value: department.department_id,
        label: department.department_name,
        description: department, // Mô tả bổ sung
    }));

    const optionsUser = mapDepartmentsToOptions(listUserOfProject?.departments || []);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files); // Lấy danh sách các tệp được chọn
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]); // Cập nhật danh sách tệp
    };

    const handleFileRemove = (index) => {
        setUploadedFiles((prevFiles) =>
            prevFiles.filter((_, i) => i !== index) // Loại bỏ tệp tại chỉ mục tương ứng
        );
    };

    const handleCreateTask = () => {
        if (!titleTask || !assignDepartment?.value || !targetTask?.department_id || !targetTask?.value || !sourceTask?.value || (!priorityTask?.value && priorityTask.value !== 0)) {
            toast.error('Vui lòng nhập đủ thông tin cần thiết!');
            return;
        }

        const taskNew ={
            "title": titleTask,
            "assign_department": assignDepartment?.value,
            "assign_user": overViewUser.userCurrent.user_id,
            "target_department": targetTask?.department_id,
            "target_user": targetTask?.value,
            "content": contentTask,
            "priority": priorityTask?.value,
            "project_id": sourceTask?.value,
            "expired_date": moment(expiredDate).format("YYYY-MM-DDTHH:mm:ss"),
            "created_date": moment(createDate).format("YYYY-MM-DDTHH:mm:ss"),
            "combinations": combinationTask?.map((combination) => {
                return {
                    "combination_department": combination.department_id,
                    "combination_user": combination.value,
                    "created_date": moment(createDate).format("YYYY-MM-DDTHH:mm:ss"),
                }
            }) || [],
        }
        dispatch(actionCreateTask(token, taskNew, props.setShowModuleCreateTask, uploadedFiles));
    }

    const handleUpdateTask = () => {
        if (!titleTask || !assignDepartment?.value || !targetTask?.department_id || !targetTask?.value || !sourceTask?.value || (!priorityTask?.value && priorityTask.value !== 0)) {
            toast.error('Vui lòng nhập đủ thông tin cần thiết!');
            return;
        }

        const taskNew ={
            "task_id": props?.dataEdit?.task_id,
            "title": titleTask,
            "assign_department": props?.dataEdit?.assign_department_id,
            "assign_user": props?.dataEdit?.assign_user_id,
            "target_department": targetTask?.department_id,
            "target_user": targetTask?.value,
            "content": contentTask,
            "priority": priorityTask?.value,
            "project_id": sourceTask?.value,
            "expired_date": moment(expiredDate).format("YYYY-MM-DDTHH:mm:ss"),
            "created_date": moment(createDate).format("YYYY-MM-DDTHH:mm:ss"),
            "combinations": combinationTask?.map((combination) => {
                return {
                    "combination_department": combination.department_id,
                    "combination_user": combination.value,
                    "created_date": moment(createDate).format("YYYY-MM-DDTHH:mm:ss"),
                }
            }) || [],
        }
        dispatch(actionUpdateTask(token, taskNew, props.setShowModuleCreateTask, uploadedFiles));
    }

    useEffect(() => {
        if(props?.dataEdit) {
            setAssignTask({
                value: `${props?.dataEdit?.assign_user_id}`,
                label: `👤 ${props?.dataEdit?.assign_user_name}`,
            });
        } else {
            setAssignTask({
                value: `${overViewUser.userCurrent.user_id}`,
                label: `👤 ${overViewUser.userCurrent.user_name}`,
            });
        }
    }, [overViewUser]);

    useEffect(() => {
        optionsAssignDepartment?.map(item => {
            if (item.value === props?.dataEdit?.assign_department_id) {
                setAssignDepartment(item);
                setOptionsProject(item.description.projects?.map((project) => ({
                    value: project.project_id,
                    label: project.project_name,
                    description: project.content, // Mô tả bổ sung
                })))
                item?.description?.projects?.map((project) => {
                    if(project.project_id === props?.dataEdit?.project_id){
                        setSourceTask({
                            value: project.project_id,
                            label: project.project_name,
                            description: project.content,
                        });
                        dispatch(actionGetListUserOfProject(token, project.project_id));
                    }
                })
            }
        })
    }, [props?.dataEdit])

    useEffect(() => {
        optionsUser?.map(user => {
            user?.options?.map(u => {
                if(parseInt(u?.value, 10) === parseInt(props?.dataEdit?.target_user_id, 10)) {
                    setTargetTask(u);
                }
            })
        })

        const tmp = [];
        optionsUser?.map(user => {
            user?.options?.map(u => {
                props?.dataEdit?.combinations?.map(combination => {
                    if(parseInt(u?.value, 10) === parseInt(combination.combination_id, 10)) {
                        tmp.push(u);
                    }
                })

            })
        })
        setCombinationTask(tmp);
    }, [props?.dataEdit, listUserOfProject])

    return (
        <div className={cx('CreateTaskScreen')}>
            <div className={cx('CreateTaskScreen_body')}>
                <div className={cx('d-flex', 'align-items-center', 'CreateTaskScreen_body_header')}>
                    <i className={cx('bx bx-stats', 'me-2', 'icon_stats')}></i>
                    <div>{props.dataEdit ? 'Chỉnh sửa nhiệm vụ' : 'Giao nhiệm vụ'}</div>

                    <button
                        onClick={() => props.setShowModuleCreateTask(false)}
                        className={cx("btn", 'CreateTaskScreen_body_close')}
                    >
                        <i className='bx bx-x'></i>
                    </button>
                </div>

                <div className={cx('p-3', 'row')}>
                    <div className={cx('col-md-12', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className={cx("col-md-125")}>Tiêu đề nhiệm vụ <span
                                className={cx('text_red')}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tiêu đề nhiệm vụ"
                                value={titleTask}
                                onChange={(e) => setTitleTask(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Người giao <span
                                className={cx('text_red')}>*</span></label>
                            <Select
                                options={optionsUser}
                                isSearchable
                                isDisabled
                                className="w-100"
                                placeholder="Tìm kiếm phòng ban hoặc người dùng..."
                                value={assignTask}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Đơn vị người giao <span
                                className={cx('text_red')}>*</span></label>
                            <Select
                                options={optionsAssignDepartment}
                                isSearchable
                                className="w-100"
                                placeholder="Tìm kiếm phòng ban..."
                                value={assignDepartment}
                                onChange={(selected) => {
                                    setAssignDepartment(selected);
                                    setSourceTask('');
                                    setOptionsProject(selected.description.projects?.map((project) => ({
                                        value: project.project_id,
                                        label: project.project_name,
                                        description: project.content, // Mô tả bổ sung
                                    })))
                                }}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Nguồn nhiệm vụ <span className={cx('text_red')}>*</span></label>
                            <Select
                                options={optionsProject}
                                isSearchable
                                className="w-100"
                                placeholder="Tìm kiếm dự án..."
                                value={sourceTask}
                                onChange={(selected) => {
                                    setSourceTask(selected)
                                    dispatch(actionGetListUserOfProject(token, selected.value))
                                }}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Mức độ quan trọng <span
                                className={cx('text_red')}>*</span></label>
                            <Select
                                options={listPriorityTask}
                                isSearchable={false}
                                className="w-100"
                                placeholder="Chọn mức độ quan trọng"
                                value={priorityTask}
                                onChange={(selected) => setPriorityTask(selected)}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Người chủ trì <span
                                className={cx('text_red')}>*</span></label>
                            <Select
                                options={optionsUser}
                                isSearchable
                                className="w-100"
                                placeholder="Tìm kiếm phòng ban hoặc người dùng..."
                                value={targetTask}
                                onChange={(selected) => {
                                    const isAlreadyInTask = combinationTask.some(task => task.value === selected.value);
                                    if (selected.value == assignTask.value || isAlreadyInTask) {
                                        toast.error("Người này đang giữ vai trò khác")
                                    } else {
                                        console.log(selected)
                                        setTargetTask(selected)
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Người phối hợp</label>
                            <Select
                                options={optionsUser}
                                isSearchable
                                isMulti
                                className="w-100"
                                placeholder="Tìm kiếm phòng ban hoặc người dùng..."
                                value={combinationTask}
                                onChange={(selected) => {
                                    const isAlreadyInTask = selected.some(task => task.value == overViewUser.userCurrent.user_id || task.value === targetTask.value);
                                    if (isAlreadyInTask) {
                                        toast.error("Người này đang giữ vai trò khác")
                                    } else {
                                        setCombinationTask(selected)
                                    }
                                }}/>
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Ngày tạo <span className={cx('text_red')}>*</span></label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={createDate}
                                onChange={(e) => setCreateDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Hạn xử lý <span className={cx('text_red')}>*</span></label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={expiredDate}
                                min={moment(createDate).utc().format("YYYY-MM-DDTHH:mm")}
                                onChange={(e) => setExpiredDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-12', 'mb-3')}>
                        <div className={cx('d-flex')}>
                            <label className={cx("col-md-125", "mt-1")}>Nội dung:</label>
                            <textarea
                                className={cx("form-control", 'input_comment')}
                                placeholder="Nội dung nhiệm vụ"
                                rows="4"
                                value={contentTask}
                                onChange={(e) => setContentTask(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-12', 'mb-3')}>
                        <div className={cx('d-flex', 'col-md-12', 'align-items-center', 'mb-3')}>
                            <label className={cx('col-md-125')}>Đính kèm file:</label>

                            <div className="file-upload__input">
                                <label htmlFor="file-input" className="btn btn-primary">
                                    Chọn tệp
                                </label>
                                <input
                                    id="file-input"
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload}
                                    style={{display: "none"}} // Ẩn input thật, chỉ hiển thị nút
                                />
                            </div>
                        </div>

                        <ul>
                            {uploadedFiles.map((file, index) => (
                                <li key={index} className={cx("file-item")}>
                                    <span>{file.name}</span>
                                    <button
                                        className={cx("btn btn-danger btn-sm", 'btn_delete')}
                                        onClick={() => handleFileRemove(index)}
                                    >
                                        Xóa
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={cx('col-md-12', 'mb-3', 'd-flex', 'justify-content-end')}>
                        <div className="d-flex justify-content-between">
                            {props.dataEdit ? (
                                <button
                                    className="btn btn-success d-flex align-items-center me-2"
                                    onClick={() => handleUpdateTask()}
                                >
                                    Chỉnh sửa
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleCreateTask()}
                                    className="btn btn-success d-flex align-items-center me-2"
                                >
                                    TẠO MỚI
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTaskScreen;
