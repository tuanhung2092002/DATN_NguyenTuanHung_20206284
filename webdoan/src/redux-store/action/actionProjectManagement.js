import Api from "../../api";
import {toast} from "react-toastify";

export function updateData(data) {
    return {
        type: 'UPDATE_DATA',
        data
    }
}

export function actionGetListProject (token, page, size, keyword, fromCreatedDate, toCreatedDate, fromExpiredDate, toExpiredDate) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getListProject(page, size, keyword = '', fromCreatedDate, toCreatedDate, fromExpiredDate, toExpiredDate);
            if (response && response.data){
                dispatch(updateData({
                    listProjectManagementResponse: response.data,
                }))
            } else {
                dispatch(updateData({
                    listProjectManagementResponse: [],
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetListProject");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListProject", error);
        }
    };
}

export function actionGetDetailProject (token, projectId) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getDetailProject(projectId);
            if (response && response.data){
                dispatch(updateData({
                    detailProject: response.data,
                }))
            } else {
                dispatch(updateData({
                    detailProject: {},
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetDetailProject");
            }
        } catch (error) {
            console.log("Lỗi api actionGetDetailProject", error);
        }
    };
}

export function actionCreateProject (token, project, setShowModuleCreateTask) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).createProject(project);
            if (response && response.data){
                dispatch(actionGetListProject(token, 0, 15))
                toast.success('Tạo dự án thành công!');
                setShowModuleCreateTask(false);
            } else {
                setShowModuleCreateTask(false);
                dispatch(actionGetListProject(token))
                toast.error('Tạo dự án thất bại!');
                console.log("Lỗi api actionCreateProject");
            }
        } catch (error) {
            console.log("Lỗi api actionCreateProject", error);
        }
    };
}

export function actionUpdateProject (token, id, projectName, createDate, expiredDate, projectStatus, projectContent) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).updateProject(id, projectName, createDate, expiredDate, projectStatus, projectContent);
            if (response && response.data){
                dispatch(actionGetDetailProject(token, id))
                toast.success("Cập nhập thông tin thành công!")
            } else {
                dispatch(actionGetDetailProject(token, id))
                toast.error("Cập nhập thông tin thất bại");
                console.log("Lỗi api actionUpdateProject");
            }
        } catch (error) {
            console.log("Lỗi api actionUpdateProject", error);
        }
    };
}

export function actionUpdateDepartmentOfProject (token, projectId, listDepartment) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).updateDepartmentOfProject(projectId, listDepartment);
            if (response && response.data){
                dispatch(actionGetDetailProject(token, projectId));
                toast.success('Cập nhật danh sách phòng ban tham gia dự án thành công!');
            } else {
                toast.error('Cập nhật danh sách phòng ban tham gia dự án thất bại!');
                dispatch(actionGetDetailProject(token, projectId));
                console.log("Lỗi api actionUpdateDepartmentOfProject");
            }
        } catch (error) {
            console.log("Lỗi api actionUpdateDepartmentOfProject", error);
        }
    };
}

export default {
    actionGetListProject,
    actionGetDetailProject,
    actionCreateProject,
    actionUpdateProject,
    actionUpdateDepartmentOfProject,
};
