export function setDisplayAccounts(custAccounts) {
  return function(dispatch) {
    dispatch({
      type: "SET_ACCOUNTS_TO_DISPLAY",
      payload: custAccounts
    })
  }
}
