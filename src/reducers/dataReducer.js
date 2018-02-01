export default function dataReducer(state = {transactionData: [], rawData: [], dataLoaded: true}, action) {
  switch (action.type) {
    case "SET_TRANSACTION_DATA":
      return state = {...state, transactionData: action.payload, dataLoaded: true}
    case "SET_RAW_DATA":
      return state = {...state, rawData: action.payload}
    default:
      return state
  }
}
