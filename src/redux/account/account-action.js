import { AccountActionTypes } from "./account-types";

export const addAccountItem = aItem => ({
    type: AccountActionTypes.ADD_ACCOUNT_ITEM,
    payload: aItem
});