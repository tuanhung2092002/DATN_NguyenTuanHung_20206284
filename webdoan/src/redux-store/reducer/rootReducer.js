import { combineReducers } from 'redux';
import reducerAuth from "./reducerAuth";
import reducerPersonnelManagement from "./reducerPersonnelManagement";
import reducerDepartmentManagement from "./reducerDepartmentManagement";
import reducerProjectManagement from "./reducerProjectManagement";
import reducerUser from "./reducerUser";

const rootReducer = combineReducers({
    reducerAuth: reducerAuth,
    reducerPersonnelManagement: reducerPersonnelManagement,
    reducerDepartmentManagement: reducerDepartmentManagement,
    reducerProjectManagement: reducerProjectManagement,
    reducerUser: reducerUser,
});

export default rootReducer;
