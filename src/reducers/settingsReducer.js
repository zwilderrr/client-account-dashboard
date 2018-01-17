export default function settingReducer(state = {allAccounts: [], displayAccounts: []}, action) {
  switch (action.type) {
    case "SET_ALL_ACCOUNTS":
      return state = {...state, allAccounts: action.payload}
    default:
      return state
  }
}
