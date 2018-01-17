import rootDomain from '../adapters/rootDomain'

export function getTransactionData(custId, parseCustData) {
  return function(dispatch) {
    const url = rootDomain() + `${custId}`
    fetch(url, {
      method: 'get',
      headers: {
        "Content-Type":"application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        parseCustData(res)
      })
    .catch(res => {
      // dispatch({
      //   type: "DATA_FETCH_FAILED",
      //   payload: {
      //   }
      })
    }
  }

export function setTransactionData(parsedData) {
  dispatch({
    type: "SET_TRANSACTION_DATA",
    payload: parsedData
  })
}
