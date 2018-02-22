export default function settingReducer(state = {allAccounts: [], displayAccounts: [], accountsLoaded: false}, action) {
  switch (action.type) {
    case "SET_ALL_ACCOUNTS":
      return state = {...state, allAccounts: action.payload, accountsLoaded: true}
    case "SET_DISPLAY_ACCOUNTS":
      return state = {...state, displayAccounts: action.payload}
    default:
      return state
  }
}
