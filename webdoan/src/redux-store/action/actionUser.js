import Api from "../../api";
import {toast} from "react-toastify";
import {actionGetOverViewUser, actionLogout} from "./actionAuth";

export function updateData(data) {
    return {
        type: 'UPDATE_DATA',
        data
    }
}

export function actionGetListMenu (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getListMenu();
            if (response && response.data){
                dispatch(updateData({
                    listMenu: response.data,
                }))
            } else {
                dispatch(updateData({
                    listMenu: [],
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetListMenu");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListMenu", error);
        }
    };
}

export function actionGetMyInfo (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).myInfo();
            if (response && response.data){
                dispatch(updateData({
                    myInfo: response.data,
                }))
            } else {
                dispatch(updateData({
                    myInfo: {},
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetMyInfo");
            }
        } catch (error) {
            console.log("Lỗi api actionGetMyInfo", error);
        }
    };
}

export function actionGetNotificationList (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getNotificationList();
            if (response && response.data){
                dispatch(updateData({
                    listNotification: response.data,
                }))
            } else {
                dispatch(updateData({
                    listNotification: [],
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetNotificationList");
            }
        } catch (error) {
            console.log("Lỗi api actionGetNotificationList", error);
        }
    };
}

export function actionUpdateMyInfo (token, newInfo) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).updateMyInfo(newInfo);
            if (response && response.data){
                dispatch(actionGetMyInfo(token));
                toast.success('Cập nhật dữ liệu thành công!');
            } else {
                toast.error('Cập nhật dữ liệu thất bại!');
                console.log("Lỗi api actionUpdateMyInfo");
            }
        } catch (error) {
            console.log("Lỗi api actionUpdateMyInfo", error);
        }
    };
}

export function actionChangePassword (token, password, passwordNew) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).changePassword(password, passwordNew);
            if (response && response.data){
                dispatch(actionLogout());
                toast.success('Đổi mật khẩu thành công!');
            } else {
                toast.error('Đổi mật khẩu thất bại!');
                console.log("Lỗi api actionChangePassword");
            }
        } catch (error) {
            console.log("Lỗi api actionChangePassword", error);
        }
    };
}

export function actionGetListTaskByMenu (token, menuId) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getListTaskByMenu(menuId);
            if (response && response.data){
                dispatch(updateData({
                    listTasks: response.data,
                }))
            } else {
                dispatch(updateData({
                    listTasks: [],
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetListTaskByMenu");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListTaskByMenu", error);
        }
    };
}

export function actionSearchTask (token, title, department_id, user_id, createFrom, createTo, expireFrom, expireTo, task_status, priority) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).searchTask(title, department_id, user_id, createFrom, createTo, expireFrom, expireTo, task_status, priority);
            if (response && response.data){
                dispatch(updateData({
                    listTasksSearch: response.data,
                }))
            } else {
                dispatch(updateData({
                    listTasksSearch: [],
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetListTaskByMenu");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListTaskByMenu", error);
        }
    };
}

export function actionGetDetailTask (token, taskUserId) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getDetailTask(taskUserId);
            if (response && response.data){
                dispatch(updateData({
                    detailTask: response.data,
                }))
            } else {
                dispatch(updateData({
                    detailTask: {},
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetListTaskByMenu");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListTaskByMenu", error);
        }
    };
}

export function actionGetListUserOfProject (token, projectId) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).usersAndDepartmentsOfProject(projectId);
            if (response && response.data){
                dispatch(updateData({
                    listUserOfProject: response.data,
                }))
            } else {
                console.log("Lỗi api actionGetListUserOfProject");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListUserOfProject", error);
        }
    };
}

export function actionGetListTaskOfTheDay (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).listTaskOfTheDay();
            if (response && response.data){
                dispatch(updateData({
                    taskOfTheDay: response.data,
                }))
            } else {
                console.log("Lỗi api actionGetListTaskOfTheDay");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListTaskOfTheDay", error);
        }
    };
}

export function actionGetListLeaveProcessingTime (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).leaveProcessingTime();
            if (response && response.data){
                dispatch(updateData({
                    leaveProcessingTime: response.data,
                }))
            } else {
                console.log("Lỗi api actionGetListLeaveProcessingTime");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListLeaveProcessingTime", error);
        }
    };
}

export function actionCreateTask (token, task, setShowModuleCreateTask, uploadedFiles) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).createTask(task);
            if (response && response.data){
                if(uploadedFiles.length > 0) {
                    uploadedFiles.forEach((file) => {
                        dispatch(actionSaveFiles(token, file, response.data.task_id))
                    })
                }
                dispatch(actionGetListMenu(token));
                setShowModuleCreateTask(false);
                toast.success('Tạo nhiệm vụ thành công!');
            } else {
                toast.error('Tạo nhiệm vụ thất bại!');
                console.log("Lỗi api actionCreateTask");
            }
        } catch (error) {
            console.log("Lỗi api actionCreateTask", error);
        }
    };
}

export function actionUpdateTask (token, task, setShowModuleCreateTask, uploadedFiles) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).updateTask(task);
            if (response && response.data){
                if(uploadedFiles.length > 0) {
                    uploadedFiles.forEach((file) => {
                        dispatch(actionSaveFiles(token, file, task.task_id))
                    })
                }
                dispatch(actionGetListMenu(token));
                setShowModuleCreateTask(false);
                toast.success('Chỉnh sửa nhiệm vụ thành công!');
            } else {
                toast.error('Chỉnh sửa nhiệm vụ thất bại!');
                console.log("Lỗi api actionUpdateTask");
            }
        } catch (error) {
            console.log("Lỗi api actionUpdateTask", error);
        }
    };
}

export function actionSendReport (token, task, type, user_create_id, content, new_expired_date) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).sendReport(task.task_id, type, user_create_id, content, new_expired_date);
            if (response && response.data){
                dispatch(actionGetDetailTask(token, task.task_id));
                toast.success('Gửi yêu cầu thành công!');
            } else {
                dispatch(actionGetDetailTask(token, task.task_id));
                toast.error('Gửi yêu cầu thất bại!');
                console.log("Lỗi api actionSendReport");
            }
        } catch (error) {
            console.log("Lỗi api actionSendReport", error);
        }
    };
}

export function actionProcessingHandover (token, dataProcess) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).processingHandover(dataProcess);
            if (response && response.data){
                dispatch(actionGetListMenu(token));
                dispatch(actionGetOverViewUser(token));
                toast.success('Chuyển xử lý thành công!');
            } else {
                toast.error('Chuyển xử lý thất bại!');
                console.log("Lỗi api actionSendReport");
            }
        } catch (error) {
            console.log("Lỗi api actionSendReport", error);
        }
    };
}

export function actionEvictTask (token, task) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).evictTask(task.task_id);
            if (response && response.data){
                dispatch(actionGetListMenu(token));
                dispatch(actionGetOverViewUser(token));
                toast.success('Thu hồi nhiệm vụ thành công!');
            } else {
                toast.error('Thu hồi nhiệm vụ thất bại!');
                console.log("Lỗi api actionSendReport");
            }
        } catch (error) {
            console.log("Lỗi api actionSendReport", error);
        }
    };
}

export function actionReturnTask (token, task, content) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).returnTask(task.task_user_id, content);
            if (response && response.data){
                dispatch(actionGetListMenu(token));
                dispatch(actionGetOverViewUser(token));
                toast.success('Trả lại nhiệm vụ thành công!');
            } else {
                toast.error('Trả lại nhiệm vụ thất bại!');
                console.log("Lỗi api actionReturnTask");
            }
        } catch (error) {
            console.log("Lỗi api actionReturnTask", error);
        }
    };
}

export function actionUpdateProcessing (token, task, updateProcessing) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).updateProcessing(task.task_user_id, updateProcessing);
            if (response && response.data){
                dispatch(actionGetListMenu(token));
                dispatch(actionGetOverViewUser(token));
                toast.success('Chỉnh sửa tiến độ nhiệm vụ thành công!');
            } else {
                toast.error('Chỉnh sửa tiến độ nhiệm vụ thất bại!');
                console.log("Lỗi api actionUpdateProcessing");
            }
        } catch (error) {
            console.log("Lỗi api actionUpdateProcessing", error);
        }
    };
}

export function actionReviewReport (token, report_id, user_review_id, isApprove, task) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).reviewReport(report_id, task.user_review_id, isApprove);
            if (response && response.data){
                dispatch(actionGetDetailTask(token, task.task_id));
                if(isApprove) {
                    toast.success('Duyệt yêu cầu thành công!');
                } else {
                    toast.success('Từ chối yêu cầu thành công!');
                }
            } else {
                if(isApprove) {
                    toast.error('Duyệt yêu cầu thất bại!');
                } else {
                    toast.error('Từ chối yêu cầu thất bại!');
                }
                console.log("Lỗi api actionReviewReport");
            }
        } catch (error) {
            console.log("Lỗi api actionReviewReport", error);
        }
    };
}

export function actionRecallReport (token, id, task) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).recallReport(id);
            if (response && response.data){
                dispatch(actionGetDetailTask(token, task.task_id));
                toast.success('Thu hồi yêu câu thành công!');
            } else {
                toast.error('Thu hồi yêu cầu thất bại!');
                console.log("Lỗi api actionSendReport");
            }
        } catch (error) {
            console.log("Lỗi api actionSendReport", error);
        }
    };
}

export function actionLuiHanXuLy (token, id, data, closeModule) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).putLeaveProcessingTime(id, data);
            if (response && response.data){
                closeModule(false);
                toast.success('Lùi hạn xử lý nhiệm vụ thành công!');
            } else {
                toast.error('Lùi hạn xử lý nhiệm vụ thất bại!');
                console.log("Lỗi api actionLuiHanXuLy");
            }
        } catch (error) {
            console.log("Lỗi api actionLuiHanXuLy", error);
        }
    };
}

export function actionSaveFiles (token, file, taskId) {
    return async (dispatch, getState) => {
        try {
            await Api(token).saveFiles(file, parseInt(taskId, 10));
            dispatch(actionGetDetailTask(token, taskId));
        } catch (error) {
            console.log("Lỗi api actionSaveFiles", error);
        }
    };
}

export function actionDownloadFile (token, file) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).downloadFile(file.file_id);
            if (response && response.data){
                const arrayBuffer = new Uint8Array([response.data]);
                const blob = new Blob([arrayBuffer]);
                const url = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.download = file.file_name; // Tên file khi tải xuống
                document.body.appendChild(link);
                link.click();

                link.remove();
                window.URL.revokeObjectURL(url);

                // toast.success('Tải xuống file thành công!');
            } else {
                toast.error('Tải xuống file thất bại!');
                console.log("Lỗi api actionDownloadFile");
            }
        } catch (error) {
            console.log("Lỗi api actionDownloadFile", error);
        }
    };
}

export function actionGetStatistic (token, from, to, department_assign_id, user_assign_id, user_handle_id, department_handle_id, status, priority, user_id) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).statistic(from, to, department_assign_id, user_assign_id, user_handle_id, department_handle_id, status, priority, user_id);
            if (response && response.data){
                dispatch(updateData({
                    staticResponse: response.data
                }))
            } else {
                console.log("Lỗi api actionGetStatistic");
            }
        } catch (error) {
            console.log("Lỗi api actionGetStatistic", error);
        }
    };
}

export default {
    actionGetListMenu,
    actionGetMyInfo,
    actionGetNotificationList,
    actionUpdateMyInfo,
    actionChangePassword,
    actionGetListTaskByMenu,
    actionSearchTask,
    actionGetDetailTask,
    actionGetListUserOfProject,
    actionGetListTaskOfTheDay,
    actionGetListLeaveProcessingTime,
    actionCreateTask,
    actionUpdateTask,
    actionSendReport,
    actionProcessingHandover,
    actionEvictTask,
    actionReturnTask,
    actionUpdateProcessing,
    actionReviewReport,
    actionRecallReport,
    actionSaveFiles,
    actionDownloadFile,
    actionLuiHanXuLy,
    actionGetStatistic,
};
