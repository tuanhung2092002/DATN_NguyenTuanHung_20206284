import Api from "../../api";
import {toast} from "react-toastify";

export function updateData(data) {
    return {
        type: 'UPDATE_DATA',
        data
    }
}

export function actionGetListDepartmentManagement (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getListDepartmentManagement();
            if (response && response.data){
                dispatch(updateData({
                    listDepartment: response.data,
                }))
            } else {
                dispatch(updateData({
                    listPersonnelManagementResponse: {},
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetListPersonnelManagement");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListPersonnelManagement", error);
        }
    };
}

export function actionGetListUserOfDepartment (token, id) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getListUsersOfDepartment(id);
            if (response && response.data){
                dispatch(updateData({
                    listUserOfDepartment: response.data,
                }))
            } else {
                dispatch(updateData({
                    listUserOfDepartment: [],
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetListPersonnelManagement");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListPersonnelManagement", error);
        }
    };
}

export function actionUpdateListUserOfDepartment (token, departmentId, listUserOfDepartment) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).updateListUsersOfDepartment(departmentId, listUserOfDepartment);
            if (response && response.data){
                dispatch(actionGetListUserOfDepartment(token, departmentId));
                toast.success('Cập nhật danh sách người dùng trong phòng ban thành công!');
            } else {
                toast.error('Cập nhật danh sách người dùng trong phòng ban thất bại!');
                dispatch(actionGetListUserOfDepartment(token, departmentId));
                console.log("Lỗi api actionUpdateListUserOfDepartment");
            }
        } catch (error) {
            console.log("Lỗi api actionUpdateListUserOfDepartment", error);
        }
    };
}

export function actionCreateDepartmentManagement (token, parentDepartmentId, departmentNewName, departmentNewIsActive, resetCreate) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).createDepartment(parentDepartmentId, departmentNewName, departmentNewIsActive);
            if (response && response.data){
                dispatch(actionGetListDepartmentManagement(token));
                resetCreate();
                toast.success('Thêm phòng ban thành công!');
            } else {
                toast.error('Thêm phòng ban thất bại!');
                dispatch(actionGetListDepartmentManagement(token));
                console.log("Lỗi api actionCreateDepartmentManagement");
            }
        } catch (error) {
            console.log("Lỗi api actionCreateDepartmentManagement", error);
        }
    };
}

export function actionUpdateDepartmentManagement (token, department_id, departmentName, department_parent_id, isActive) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).updateDepartment(department_id, departmentName, department_parent_id, isActive);
            if (response && response.data){
                dispatch(actionGetListDepartmentManagement(token));
                toast.success('Cập nhật phòng ban thành công!');
            } else {
                toast.error('Cập nhật phòng ban thất bại!');
                dispatch(actionGetListDepartmentManagement(token));
                console.log("Lỗi api actionCreateDepartmentManagement");
            }
        } catch (error) {
            console.log("Lỗi api actionCreateDepartmentManagement", error);
        }
    };
}

export function actionGetListPositions (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getListPositions();
            if (response && response.data){
                dispatch(updateData({
                    listPositions: response.data,
                }))
            } else {
                dispatch(updateData({
                    listPositions: [],
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetListPositions");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListPositions", error);
        }
    };
}

export function actionUpdatePosition (token, posNew) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).updatePosition(posNew);
            if (response && response.data){
                dispatch(actionGetListPositions(token));
                toast.success('Cập nhập chức vụ thành công!');
            } else {
                dispatch(actionGetListPositions(token));
                toast.error('Cập nhập chức vụ thất bại!');
                console.log("Lỗi api actionUpdatePosition");
            }
        } catch (error) {
            console.log("Lỗi api actionUpdatePosition", error);
        }
    };
}

export function actionCreatePosition (token, positionNameNew, isActiveNew) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).createPosition(positionNameNew, isActiveNew);
            if (response && response.data){
                dispatch(actionGetListPositions(token));
                toast.success('Thêm chức vụ thành công!');
            } else {
                dispatch(actionGetListPositions(token));
                toast.error('Thêm chức vụ thất bại!');
                console.log("Lỗi api actionUpdatePosition");
            }
        } catch (error) {
            console.log("Lỗi api actionUpdatePosition", error);
        }
    };
}

export default {
    actionGetListDepartmentManagement,
    actionGetListUserOfDepartment,
    actionUpdateListUserOfDepartment,
    actionGetListPositions,
    actionUpdatePosition,
    actionCreatePosition,
    actionCreateDepartmentManagement,
    actionUpdateDepartmentManagement,
};
