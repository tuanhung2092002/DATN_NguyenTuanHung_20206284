import Api from "../../api";
import {jwtDecode} from "jwt-decode";
import {toast} from "react-toastify";

export function updateData(data) {
    return {
        type: 'UPDATE_DATA',
        data
    }
}

export function actionLogin (username, password, nextToScreen) {
    return async (dispatch, getState) => {
        try {
            const response = await Api().getTokenLogin(username, password);
            if (response && response.data){
                toast.success('Đăng nhập thành công!');
                const decoded = jwtDecode(response.data.result.token);
                dispatch(updateData({
                    isLogin: true,
                    decoded: decoded,
                    isAdmin: decoded.scope === 'ADMIN',
                    token: response.data.result.token,
                }))

                if(decoded.scope === 'ADMIN') {
                    await dispatch(actionGetGeneralAdmin(response.data.result.token));
                    await dispatch(actionGetFullUser(response.data.result.token));
                } else {
                    await dispatch(actionGetOverViewUser(response.data.result.token));
                }
                localStorage.setItem('token', response.data.result.token);
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
            } else {
                dispatch(updateData({
                    isLogin: false,
                    token: '',
                }))
                toast.error('Đăng nhập thất bại!');
            }
        } catch (error) {
            toast.error('Đăng nhập thất bại!');
            dispatch(updateData({
                isLogin: false,
                token: '',
            }))
        }
    };
}

export function actionRefreshToken (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).refreshToken(token);
            if (response && response.data.result.token){
                const decoded = jwtDecode(response.data.result.token);

                dispatch(updateData({
                    isLogin: true,
                    decoded: decoded,
                    isAdmin: decoded.scope === 'ADMIN',
                    token: response.data.result.token,
                }))

                if(decoded.scope === 'ADMIN') {
                    dispatch(actionGetGeneralAdmin(response.data.result.token));
                    dispatch(actionGetFullUser(response.data.result.token));
                } else {
                    dispatch(actionGetOverViewUser(response.data.result.token));
                }

                localStorage.setItem('token', response.data.result.token);
            } else {
                dispatch(updateData({
                    isLogin: false,
                    decoded: {},
                    isAdmin: false,
                    token: '',
                }))
            }
        } catch (error) {
            dispatch(updateData({
                isLogin: false,
                token: '',
            }))
        }
    };
}

export function actionLogout () {
    return (dispatch, getState) => {
        try {
            localStorage.removeItem('token');
            dispatch(updateData({
                isLogin: false,
                isAdmin: false,
                userName: '',
                token: '',
            }))
            toast.success('Đăng xuất thành công!');
        } catch (error) {
            dispatch(updateData({
                token: '',
            }))
        }
    };
}

export function actionGetGeneralAdmin (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getGeneralAdmin();
            if (response && response.data){
                dispatch(updateData({
                    overViewAdmin: response.data,
                }))
            } else {
                console.log("Loi api actionGetGeneralAdmin");
            }
        } catch (error) {
            console.log("Loi api actionGetGeneralAdmin", error)
        }
    };
}

export function actionGetOverViewUser (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getOverView();
            if (response && response.data){
                dispatch(updateData({
                    overViewUser: response.data,
                }))
            } else {
                console.log("Loi api actionGetGeneralAdmin");
            }
        } catch (error) {
            console.log("Loi api actionGetGeneralAdmin", error)
        }
    };
}

export function actionGetFullUser (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getFullUser();
            if (response && response.data){
                dispatch(updateData({
                    listFullUser: response.data,
                }))
            } else {
                console.log("Loi api actionGetFullUser");
            }
        } catch (error) {
            console.log("Loi api actionGetFullUser", error)
        }
    };
}

export default {
    actionLogin,
    actionRefreshToken,
    actionLogout,
    actionGetGeneralAdmin,
    actionGetFullUser,
    actionGetOverViewUser,
};
