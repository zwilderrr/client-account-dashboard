export default function dataReducer(state = {transactionData: [], dataReady: false}, action) {
  switch (action.type) {
    case "SET_TRANSACTION_DATA":
      return state = {...state, transactionData: action.payload, dataReady: true}
    default:
      return state
  }
}
