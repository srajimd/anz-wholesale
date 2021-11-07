export const addItemtoAccount = (accountItems, accountItemToAdd) =>{
    return [...accountItems, {...accountItemToAdd}]
}