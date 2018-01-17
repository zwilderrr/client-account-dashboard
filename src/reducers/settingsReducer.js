export default function settingReducer(state = {allAccounts: []}, action) {
  switch (action.type) {
    case "SET_ACCOUNTS_TO_DISPLAY":
      return state = {...state, allAccounts: action.payload}
    default:
      return state
  }
}
