// addTransactions = (sortedArray) => {
//   console.log(sortedArray);
//   let sum = 0
//   let description = sortedArray[0]
//   this.props.data.forEach(transaction => {
//     let transTo = transaction.transTo.split(" Account")[0]
//     let transFrom = transaction.transFrom.split(" Account")[0]
//     //conditional required to handle internal transactions, which are listed as negative
//     if (description.includes(transTo) && description.includes(transFrom)) {
//       //"negitive value" coming into the account
//       if (transTo === description) {
//         sum += -transaction.transAmt
//       } else {
//         //"negitive value" going out
//         sum += transaction.transAmt
//       }
//     } else {
//       sum += transaction.transAmt
//     }
//   })
//   console.log(sum);
// }
//
// sumSorted = (sorted) => {
//   let sortedData = []
//   for (let i = -1; i > -4; i--) {
//     sortedData.push(this.addTransactions(sorted[i]))
//   }
// }
//
// sortFrequency = (frequencyObj) => {
//   let sorted = []
//   for (let trans in frequencyObj) {
//     sorted.push([trans, frequencyObj[trans]]);
//   }
//   return this.sumSorted(sorted.sort((a, b) => a[1] - b[1] ))
// }
//
// freqOfTransactions = (data) => {
//   let frequencyObj = {}
//   let lengthOfObj = 0
//   data.transactions.forEach(transaction => {
//     let desc = transaction.description
//     if (frequencyObj[desc]) {
//       frequencyObj[desc]++
//     } else {
//       frequencyObj[desc] = 1
//     }
//     lengthOfObj++
//   })
//
//   if (lengthOfObj < 4) {
//     return "Not enough data"
//   }
//
//   return this.sortFrequency(frequencyObj)
// }
//
//
// getBarChartData = () => {
//   let data = []
//   let defaultData = {
//     labels: ["Frequent Activity"],
//     datasets: [
//       {
//         label: "My Second dataset",
//         fillColor: "rgba(151,187,205,1)",
//         strokeColor: "rgba(151,187,205,1)",
//         highlightFill: "rgba(151,187,205,1)",
//         highlightStroke: "rgba(151,187,205,1)",
//         data: [this.props.data.balance]
//       }
//     ]
//   }
//   let freqTransactions = this.freqOfTransactions(this.props.data)
//   console.log(freqTransactions);
//   if (freqTransactions === "Not enough data") {
//     return defaultData
//   }
//   // freqTransactions.map(pair => {
//   //   console.log(pair);
//   //   // return {
//   //   //   label: `${pair.description}`,
//   //   //   value: `${pair.totalSpend}`
//   //   // }
//   // }
// }
