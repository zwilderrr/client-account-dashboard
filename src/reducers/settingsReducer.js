export default function settingReducer(state = {allAccounts: [], displayAccounts: [], displayingAccountDetails: false}, action) {
  switch (action.type) {
    case "SET_ALL_ACCOUNTS":
      return state = {...state, allAccounts: action.payload}
    case "SET_DISPLAY_ACCOUNTS":
      return state = {...state, displayAccounts: action.payload}
    case "DISPLAY_ACCOUNT_DETAILS":
      return state = {...state, displayingAccountDetails: action.payload}
    default:
      return state
  }
}
