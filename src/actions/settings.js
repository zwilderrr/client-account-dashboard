export function setDisplayAccounts(custAccounts) {
  return function(dispatch) {
    dispatch({
      type: "SET_ALL_ACCOUNTS",
      payload: custAccounts
    })
  }
}
