export function setAllAccounts(custAccounts) {
  return function(dispatch) {
    dispatch({
      type: "SET_ALL_ACCOUNTS",
      payload: custAccounts
    })
  }
}
export function setDisplayAccounts(accounts) {
  return function(dispatch) {
    dispatch({
      type: "SET_DISPLAY_ACCOUNTS",
      payload: accounts
    })
  }
}
