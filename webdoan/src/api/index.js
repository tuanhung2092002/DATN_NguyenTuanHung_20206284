import axios from 'axios';

const BASEURL = 'http://localhost:8080'

const Api = (token) => {
    let api

    if (token) {
        api = axios.create({
            baseURL: BASEURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token || ''}`,
            },
            timeout: 20000,
        });
    } else {
        api = axios.create({
            baseURL: BASEURL,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 20000,
        });
    }

    // api get token login
    const getTokenLogin =(username, password) => {
        return api.post('/auth/login', {
            "username": username,
            "password": password
        });
    }

    const refreshToken = (token) => {
        return api.post('/auth/refresh', {
            token: token,
        })
    }

    const getListPersonnelManagement =(page, size, username = '', fullname = '', active = '', isAdmin = '', position = '') => {
        return api.get(`/api/admin/users?page=${page}&size=${size}&username=${username}&fullname=${fullname}&active=${active}&isAdmin=${isAdmin}&position=${position}`);
    }

    const getGeneralAdmin = () => {
        return api.get(`/api/admin/general`);
    }

    const getFullUser = () => {
        return api.get(`/api/admin/fullUsers`);
    }

    const createPersonnelManagement = (data) => {
        return api.post(`/api/admin/createUser`, data);
    }

    const updatePersonnelManagement = (data) => {
        return api.put(`/api/admin/users`, data);
    }

    const getDetailPersonnel = (usedID) => {
        return api.get(`/api/admin/users/${usedID}`);
    }

    const putPasswordNew = (userId, newPassword) => {
        return api.put(`/api/admin/upPassword?password=${newPassword}&idUser=${userId}`);
    }

    const getListDepartmentManagement = () => {
        return api.get(`/api/admin/department`);
    }

    const getListUsersOfDepartment = (id) => {
        return api.get(`api/admin/UsersOfDepartment/${id}`);
    }

    const updateListUsersOfDepartment = (id, listUser) => {
        return api.put(`api/admin/updateUsersOfDepartment/${id}`, listUser);
    }

    const createDepartment = (parentDepartmentId, departmentNewName, departmentNewIsActive) => {
        return api.post(`/api/admin/createDepartment`, {
            parent_department_id: parentDepartmentId,
            department_name: departmentNewName,
            isactive: departmentNewIsActive,
        });
    }

    const createProject = (data) => {
        return api.post(`/api/admin/createProject`, data);
    }

    const updateDepartment = (department_id, departmentName, department_parent_id, isActive) => {
        return api.put(`/api/admin/updateDepartment/${department_id}`, {
            department_id, department_name: departmentName, parent_department_id: department_parent_id, isActive
        });
    }

    const updateDepartmentOfProject = (department_id, listDepartment) => {
        return api.put(`/api/admin/updateDepartmentOfProject/${department_id}`, listDepartment);
    }

    const getListPositions = () => {
        return api.get(`/api/admin/positions`);
    }

    const updatePosition = (pos) => {
        return api.put(`/api/admin/updatePosition/${pos.position_id}`, {
            position_name: pos.position_name,
            isActive: pos.isActive,
        });
    }

    const createPosition = (positionNameNew, isActiveNew) => {
        return api.post(`/api/admin/createPosition`, {
            position_name: positionNameNew,
            isActive: isActiveNew
        });
    }

    const getListProject = (page, size, keyword = '', fromCreatedDate = '', toCreatedDate = '', fromExpiredDate = '', toExpiredDate = '') => {
        return api.get(`api/admin/projects?page=${page}&size=${size}&keyword=${keyword}&fromCreatedDate=${fromCreatedDate}&toCreatedDate=${toCreatedDate}&fromExpiredDate=${fromExpiredDate}&toExpiredDate=${toExpiredDate}`);
    }

    const getDetailProject = id => {
        return api.get(`api/admin/project/${id}`);
    }

    const updateProject = (id, projectName, createDate, expiredDate, projectStatus, projectContent) => {
        return api.put(`api/admin/updateProject/${id}`, {
            project_name: projectName,
            created_date: createDate,
            expired_date: expiredDate,
            status: projectStatus,
            content: projectContent,
        });
    }


    /* API cho User */
    const getOverView = () => {
        return api.get(`/api/user/overview`);
    }

    const myInfo = () => {
        return api.get(`api/user/myInfo`);
    }

    const getNotificationList = () => {
        return api.get(`api/user/getNotificationList`);
    }

    const updateMyInfo = (newInfo) => {
        return api.put(`api/user/updateMyInfo`, newInfo);
    }

    const changePassword = (oldPassword, newPassword) => {
        return api.put(`api/user/changePassword?oldPassword=${oldPassword}&newPassword=${newPassword}`);
    }

    const createTask = (task) => {
        return api.post(`/api/user/createTask`, task);
    }

    const updateTask = (task) => {
        return api.put(`/api/user/updateTask`, task);
    }

    const getListMenu = () => {
        return api.get(`api/user/menus`);
    }

    const getListTaskByMenu = (id) => {
        return api.get(`api/user/getListMenuById?menu_id=${id}`);
    }

    const getDetailTask = (id) => {
        return api.get(`api/user/TaskDetail?task_id=${id}`);
    }

    const usersAndDepartmentsOfProject = (project_id) => {
        return api.get(`/api/admin/usersAndDepartmentsOfProject/${project_id}`);
    }

    const listTaskOfTheDay = () => {
        return api.get(`api/user/taskOfTheDay`);
    }

    const leaveProcessingTime = () => {
        return api.get(`api/user/leaveProcessingTime`);
    }

    const sendReport = (task_id, type, user_create_id, content, new_expired_date) => {
        return api.post(`/api/user/sendReport`, {
            task_id: task_id,
            user_create_id: user_create_id,
            content: content,
            type: type,
            new_expired_date: new_expired_date,
        })
    }

    const processingHandover = (data) => {
        return api.put(`api/user/processingHandover`, data);
    }

    const evictTask = (task_id) => {
        return api.put(`api/user/evictTask?task_id=${task_id}`);
    }

    const returnTask = (task_id, content) => {
        return api.put(`/api/user/returnTask?task_id=${task_id}&content=${content}`)
    }

    const updateProcessing = (task_user_id, progress) => {
        return api.put(`/api/user/updateProcessing?task_user_id=${task_user_id}&processing=${progress}`);
    }

    const reviewReport = (report_id, user_review_id, isApprove) => {
        return api.put(`/api/user/reviewReport`, {
            report_id: report_id,
            user_review_id: user_review_id,
            isApprove: isApprove,
        });
    }

    const recallReport = (id) => {
        return api.delete(`api/user/recallReport/${id}`);
    }

    const saveFiles = async (file, taskId) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("task_id", taskId);

        try {
            const response = await fetch(`${BASEURL}/api/user/saveFiles`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            return response
        } catch (error) {
        }
    }

    const downloadFile = (id) => {
        return api.get(`api/user/downloadFile/${id}`);
    }

    const searchTask = (title, department_id, user_id, createFrom, createTo, expireFrom, expireTo, task_status, priority) => {
        return api.get(`api/user/searchTask?title=${title}&department_id=${department_id}&user_id=${user_id}&createFrom=${createFrom}&createTo=${createTo}&expireFrom=${expireFrom}&expireTo=${expireTo}&task_status=${task_status}&priority=${priority}`);
    }

    const putLeaveProcessingTime = (id, data) => {
        return api.put(`api/user/leaveProcessingTime/${id}`, data);

    }

    const statistic = (from, to, department_assign_id, user_assign_id, user_handle_id, department_handle_id, status, priority, user_id) => {
        return api.get(`api/statistic/get?from=${from}&to=${to}&department_assign_id=${department_assign_id}&user_assign_id=${user_assign_id}&user_handle_id=${user_handle_id}&department_handle_id=${department_handle_id}&status=${status}&priority=${priority}&user_id=${user_id}`);

    }

    return {
        getTokenLogin,
        refreshToken,
        getListPersonnelManagement,
        getGeneralAdmin,
        createPersonnelManagement,
        updatePersonnelManagement,
        getDetailPersonnel,
        putPasswordNew,
        getListDepartmentManagement,
        getListUsersOfDepartment,
        updateListUsersOfDepartment,
        updateDepartment,
        createDepartment,
        createProject,
        updateDepartmentOfProject,
        getListPositions,
        updatePosition,
        createPosition,
        getListProject,
        getDetailProject,
        updateProject,

        getDetailTask,
        usersAndDepartmentsOfProject,

        listTaskOfTheDay,
        leaveProcessingTime,
        getOverView,
        getFullUser,
        myInfo,
        getNotificationList,
        updateMyInfo,
        changePassword,
        createTask,
        updateTask,
        getListMenu,
        getListTaskByMenu,
        sendReport,
        processingHandover,
        evictTask,
        returnTask,
        updateProcessing,
        reviewReport,
        recallReport,
        saveFiles,
        downloadFile,
        searchTask,
        putLeaveProcessingTime,

        statistic,
    };
};

export default Api;
