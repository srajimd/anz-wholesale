import {AccountActionTypes} from "./account-types";
import { addItemtoAccount } from "./account-utils";

const INITIAL_STATE = {
    accountItems: []
}
const accountReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AccountActionTypes.ADD_ACCOUNT_ITEM:
            return {
                ...state,
                accountItems: addItemtoAccount(state.accountItems, action.payload)
            }
        default:
            return state;
    }
}
export default accountReducer;