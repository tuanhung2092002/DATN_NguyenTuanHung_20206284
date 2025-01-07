import React, {useEffect, useState} from "react";
import classNames from "classnames/bind";
import 'react-treeview/react-treeview.css';
import styles from "./DepartmentManagementStyle.module.scss";
import TreeComponent from "../../../components/Tree/TreeComponent";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    actionCreateDepartmentManagement,
    actionGetListDepartmentManagement,
    actionGetListUserOfDepartment,
    actionUpdateDepartmentManagement,
    actionUpdateListUserOfDepartment
} from "../../../redux-store/action/actionDepartmentManagement";
import Select from "react-select";

const cx = classNames.bind(styles);

const RowUserOfDepartment = ({ item, index, listPositions, handleDeleteUserOfDepartment }) => {
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
            <td className='text_left'>{item.user_name}</td>
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
                    className="form-check-input"
                    id="active"
                    checked={isMain}
                    onChange={(e) => {
                        setIsMain(e.target.checked);
                        item.isMain = e.target.checked;
                    }}
                />
            </td>
            <td
                className={cx('text_red')}
                onClick={() => handleDeleteUserOfDepartment(item)}
            >
                Xoá
            </td>
        </tr>
    )
}

const DepartmentManagementScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector(state => state.reducerAuth.token);
    const overViewAdmin = useSelector(state => state.reducerAuth.overViewAdmin);
    const listDepartment = useSelector(state => state.reducerDepartmentManagement.listDepartment);
    const listFullUser = useSelector(state => state.reducerAuth.listFullUser);
    const listUserOfDepartment = useSelector(state => state.reducerDepartmentManagement.listUserOfDepartment);
    const [activeModuleDepartment, setActiveModuleDepartment] = useState(false);
    const [nodeSelect, setNodeSelect] = useState(listDepartment[0]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [departmentName, setDepartmentName] = useState("");
    const [departmentActive, setDepartmentActive] = useState(false);
    const [departmentNewName, setDepartmentNewName] = useState("");
    const [departmentNewIsActive, setDepartmentNewIsActive] = useState(true);
    const [selectedDepartmentCreate, setSelectedDepartmentCreate] = useState(null);
    const [selectedListUserOfDepartment, setSelectedListUserOfDepartment] = useState(listUserOfDepartment);
    const [listPositions, setListPositions] = useState([]);

    const handleNodeClick = (node) => {
        setNodeSelect(node);
        setDepartmentName(node.departmentName);
        setDepartmentActive(node.isActive)
        dispatch(actionGetListUserOfDepartment(token, node.departmentId));
        let haveParentDepartment = false;
        flatList.map((department) => {
            if(department.value === node.department_parent_id) {
                setSelectedDepartment(department);
                haveParentDepartment = true
            }
        })
        if(!haveParentDepartment) {
            setSelectedDepartment(null);
        }
    }

    const flattenTreeForSelect = (tree, level = 0, parentLabel = "") => {
        let flatList = [];
        tree.forEach((node) => {
            flatList.push({
                value: node.departmentId,
                label: `${parentLabel}${node.departmentName}`,
                department_parent_id: node.department_parent_id,
                isActive: node.isActive,
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
    const flatList = flattenTreeForSelect(listDepartment);

    const flastListFullUser = listFullUser.map(user => ({
        value: user.id,
        label: `${user.fullName} - ${user.username}`,
        ...user,
    }))

    const handleChangeEdit = (item) => {
        setSelectedDepartment(item);
    };

    const handleChangeCreate = (item) => {
        setSelectedDepartmentCreate(item);
    };

    const resetCreate = () => {
        setDepartmentNewName("")
        setDepartmentNewIsActive(true);
        setSelectedDepartmentCreate(null);
        setActiveModuleDepartment(false);
    }

    const handleCreateDepartment = () => {
        dispatch(actionCreateDepartmentManagement(token, selectedDepartmentCreate.value, departmentNewName, departmentNewIsActive, resetCreate));
    }

    const handleUpdateDepartment = () => {
        dispatch(actionUpdateDepartmentManagement(token, nodeSelect.departmentId, departmentName, selectedDepartment.value, departmentActive));
    }

    const handleAddUserOfDepartment = (itemSelected) => {
        setSelectedListUserOfDepartment((prevSelectedList) => {
            const isDuplicate = prevSelectedList.some((item) => (item.user_id && item.user_id === itemSelected.id));

            if (!isDuplicate) {
                return [...prevSelectedList, {
                    isActive: itemSelected.isActive,
                    isMain: false,
                    position_id: null,
                    position_name: null,
                    user_id: itemSelected.id,
                    user_name: itemSelected.fullName,
                }];
            }

            return prevSelectedList;
        });
    };

    const handleDeleteUserOfDepartment = (itemSelected) => {
        setSelectedListUserOfDepartment((prevSelectedList) => prevSelectedList.filter((item) => item.user_id !== itemSelected.user_id))
    }

    const handleUpdateListUserOfDepartment = () => {
        const listUpdateUserOfDepartment = selectedListUserOfDepartment.map(user => ({
            user_id: user.user_id,
            department_id: nodeSelect.departmentId,
            position_id: user.position_id || user.position.positionId,
            isMain: user.isMain,
        }));
        dispatch(actionUpdateListUserOfDepartment(token, nodeSelect.departmentId, listUpdateUserOfDepartment));
    }

    useEffect(() => {
        if(listDepartment.length > 0){
            dispatch(actionGetListUserOfDepartment(token, listDepartment[0]?.departmentId));
            setNodeSelect(listDepartment[0]);
            setSelectedDepartment(null);
            setDepartmentName(listDepartment[0].departmentName);
            setDepartmentActive(listDepartment[0].isActive);
        }
    }, [listDepartment])

    useEffect(() => {
        setSelectedListUserOfDepartment(listUserOfDepartment);
    }, [listUserOfDepartment]);

    useEffect(() => {
        dispatch(actionGetListDepartmentManagement(token))
    }, []);

    useEffect(() => {
        if(overViewAdmin.position?.length > 0){
            const positions = flattenTreeForSelect2(overViewAdmin.position);
            setListPositions(positions);
        }
    }, [overViewAdmin]);

    return (
        <div className={cx('DepartmentManagementScreen', 'container')}>
            <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className={cx('d-flex', 'align-items-center')}>
                        <i className={cx('bx bxs-home', 'icon_header', 'me-2')}></i>
                        <h4>Quản lý phòng ban</h4>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-danger d-flex align-items-center me-2"
                            onClick={() => navigate('/admin/PositionManagementScreen')}
                        >
                            QL CHỨC VỤ
                        </button>

                        <button
                            className="btn btn-success d-flex align-items-center me-2"
                            onClick={() => setActiveModuleDepartment(true)}
                        >
                            <i className="bx bx-plus me-1"></i>
                            TẠO MỚI PHÒNG BAN
                        </button>
                    </div>
                </div>
            </div>

            <div className={cx('row', 'DepartmentManagementScreen_body', 'col-md-12')}>
                <div className={cx("col-md-4", 'tree_view')}>
                    <TreeComponent data={listDepartment} handleNodeClick={handleNodeClick}/>
                </div>

                <div className={cx("col-md-8", 'border_left', 'tree_view')}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4>Thông tin phòng ban</h4>

                        <button
                            className="btn btn-info d-flex align-items-center"
                            onClick={() => handleUpdateDepartment()}
                        >
                            CẬP NHẬT
                        </button>
                    </div>

                    <div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-md-3">Tên Phòng ban <span className="text-danger">*</span>:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={departmentName}
                                onChange={(e) => setDepartmentName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-md-3">Thuộc phòng ban:</label>
                            <Select
                                options={flatList}
                                value={selectedDepartment || null}
                                onChange={handleChangeEdit}
                                placeholder="Tìm phòng ban..."
                                className="mb-3 w-100"
                            />
                        </div>
                        <div className={cx('col-md-3', 'mb-3')}>
                            <input
                                type="checkbox"
                                className="form-check-input me-2"
                                id="active"
                                checked={departmentActive}
                                onChange={(e) => setDepartmentActive(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="active">Hoạt động</label>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                        <label className="col-md-3">Thêm người dùng vào phòng ban:</label>
                            <Select
                                options={flastListFullUser}
                                onChange={handleAddUserOfDepartment}
                                placeholder="Tìm người dùng..."
                                className="mb-3 w-100"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5>Danh sách người dùng trong phòng ban</h5>

                            <button
                                className="btn btn-info d-flex align-items-center"
                                onClick={handleUpdateListUserOfDepartment}
                            >
                                CẬP NHẬT
                            </button>
                        </div>
                        <table className={cx('w-100', 'table')}>
                            <thead>
                            <tr className={cx('text-center', 'table_row')}>
                                <th>STT</th>
                                <th>Tên nhân viên</th>
                                <th>Chức vụ</th>
                                <th>Phòng ban chính</th>
                                <th>Xoá</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedListUserOfDepartment?.map((item, index) => (
                                <RowUserOfDepartment item={item} index={index} listPositions={listPositions} handleDeleteUserOfDepartment={handleDeleteUserOfDepartment} />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className={cx('moduleCreateDepartment', (activeModuleDepartment ? 'active' : 'inactive'))}>
                <div className={cx("col-md-7", 'bodyModuleCreateDepartment')}>
                    <div>
                        <button
                            className={cx("btn btn-close", 'closeModuleDepartment')}
                            onClick={() => setActiveModuleDepartment(false)}
                        ></button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4>Thông tin phòng ban</h4>

                        <button
                            className="btn btn-info d-flex align-items-center"
                            onClick={() => handleCreateDepartment()}
                        >
                            Thêm phòng ban
                        </button>
                    </div>

                    <div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-md-3">Tên Phòng ban <span className="text-danger">*</span>:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập phòng ban"
                                value={departmentNewName}
                                onChange={e => setDepartmentNewName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-md-3">Thuộc phòng ban:</label>
                            <Select
                                options={flatList}
                                value={selectedDepartmentCreate || null}
                                onChange={handleChangeCreate}
                                placeholder="Tìm phòng ban..."
                                className="mb-3 w-100"
                            />
                        </div>
                        <div className={cx('col-md-3', 'mb-3')}>
                            <input
                                type="checkbox"
                                className="form-check-input me-2"
                                checked={departmentNewIsActive}
                                onChange={e => setDepartmentNewIsActive(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="active">Hoạt động</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepartmentManagementScreen;
