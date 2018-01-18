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
export function displayingAccountDetails(boolean) {
  return function(dispatch) {
    dispatch({
      type: "DISPLAY_ACCOUNT_DETAILS",
      payload: boolean
    })
  }
}
