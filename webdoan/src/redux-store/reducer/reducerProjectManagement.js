const INITIAL_STATE = {
    listProjectManagementResponse: {},
    detailProject: {},
    listTaskProject: [],
};

const reducerProjectManagement = (state = INITIAL_STATE, action) => {
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

export default reducerProjectManagement;
