const INITIAL_STATE = {
    isLogin: false,
    isAdmin: false,
    decoded: {},
    token: '',
    overViewAdmin: {},
    overViewUser: {},
    listFullUser: [],
    listNotification: []
};

const reducerAuth = (state = INITIAL_STATE, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'UPDATE_DATA': {
            let data = action.data || {};
            return { ...newState, ...data };
        }
        case 'RESET_DATA':{
            return INITIAL_STATE;
        }
        default:
            return state
    }
};

export default reducerAuth;
