import { combineReducers } from "redux";

import userReducer from "./user/user-reducer";
import accountReducer from "./account/account-reducer";

export default combineReducers({
    user: userReducer,
    account: accountReducer
})