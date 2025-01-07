const INITIAL_STATE = {
    listMenu: [],
    listTasks: [],
    listTasksSearch: [],
    listUserOfProject: {},
    taskOfTheDay: {},
    leaveProcessingTime: [],
    detailTask: {},
    myInfo: {},
    staticResponse: {},
};

const reducerUser = (state = INITIAL_STATE, action) => {
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

export default reducerUser;
