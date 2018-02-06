export default function settingReducer(state = {allAccounts: ["Checking", "Savings"], displayAccounts: []}, action) {
  switch (action.type) {
    case "SET_ALL_ACCOUNTS":
      return state = {...state, allAccounts: action.payload}
    case "SET_DISPLAY_ACCOUNTS":
      return state = {...state, displayAccounts: action.payload}
    default:
      return state
  }
}
