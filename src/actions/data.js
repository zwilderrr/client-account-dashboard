import rootDomain from '../adapters/rootDomain'
import {data} from '../dataGenerator'
let res = data

export function getTransactionData(custId, parseCustData) {
  return function(dispatch) {
    // debugger
      parseCustData(res)
      dispatch({
        type: "SET_RAW_DATA",
        payload: res
      })
    }
  }

// export function getTransactionData(custId, parseCustData) {
//   return function(dispatch) {
//     const url = rootDomain() + `${custId}`
//     fetch(url, {
//       method: 'get',
//       headers: {
//         "Content-Type":"application/json"
//       }
//     })
//       .then(res => res.json())
//       .then(res => {
//         parseCustData(res)
//         dispatch({
//           type: "SET_RAW_DATA",
//           payload: res
//         })
//       })
//     .catch(res => {
//       console.log("Data fetch failed", res);
//       })
//     }
//   }

export function setTransactionData(parsedData) {
  return function(dispatch) {
    dispatch({
      type: "SET_TRANSACTION_DATA",
      payload: parsedData
    })
  }
}
