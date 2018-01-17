export default function settingReducer(state = {accountsToDisplay: []}, action) {
  switch (action.type) {
    case "SET_ACCOUNTS_TO_DISPLAY":
      return state = {...state, accountsToDisplay: action.payload}
    default:
      return state
  }
}
