import Api from "../../api";
import {toast} from "react-toastify";

export function updateData(data) {
    return {
        type: 'UPDATE_DATA',
        data
    }
}

export function actionGetListPersonnelManagement (token, page, size, username, fullname, active, isAdmin, position) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getListPersonnelManagement(page, size, username, fullname, active, isAdmin, position);
            if (response && response.data){
                dispatch(updateData({
                    listPersonnelManagementResponse: response.data,
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

export function actionCreatePersonnel (token, user, navigate) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).createPersonnelManagement(user);
            if (response && response.data){
                toast.success('Thêm người dùng thành công!');
                navigate('/');
            } else {
                toast.error('Thêm người dùng thất bại!');
                console.log("Lỗi api actionCreatePersonnel");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListPersonnelManagement", error);
        }
    }
}

export function actionUpdatePersonnel (token, user, navigate) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).updatePersonnelManagement(user);
            if (response && response.data){
                toast.success('Cập nhật thông tin người dùng thành công!');
                navigate('/');
            } else {
                toast.error('Cập nhật thông tin người dùng thất bại!');
                console.log("Lỗi api actionCreatePersonnel");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListPersonnelManagement", error);
        }
    }
}

export function actionGetPersonnel (token, userID) {
    return async (dispatch, getState) => {
        try {
            if(userID) {
                const response = await Api(token).getDetailPersonnel(userID);
                if (response && response.data){
                    dispatch(updateData({
                        userSelected: response.data,
                    }))
                } else {
                    dispatch(updateData({
                        userSelected: {},
                    }))
                    toast.error('Lấy thông tin người dùng thất bại!');
                    console.log("Lỗi api actionCreatePersonnel");
                }
            } else {
                dispatch(updateData({
                    userSelected: {},
                }))
            }
        } catch (error) {
            console.log("Lỗi api actionGetListPersonnelManagement", error);
            dispatch(updateData({
                userSelected: {},
            }))
        }
    }
}

export function actionResetPasswordPersonnel (token, userID, newPassword) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).putPasswordNew(userID, newPassword);
            if (response && response.data){
                toast.success("Đổi mật khẩu thành công!");
            } else {
                toast.error("Đổi mật khẩu thất bại!");
                console.log("Lỗi api actionResetPasswordPersonnel");
            }
        } catch (error) {
            console.log("Lỗi api actionResetPasswordPersonnel", error);
        }
    }
}

export default {
    actionGetListPersonnelManagement,
    actionResetPasswordPersonnel,
    actionCreatePersonnel,
    actionUpdatePersonnel,
    actionGetPersonnel,
};
