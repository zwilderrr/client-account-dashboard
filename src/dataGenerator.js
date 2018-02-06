const moment = require('moment')

let startingData = [
    {
      custId: 0,
      description: "VC funding",
      transAmt: 1000000,
      transFrom: "VC Partners",
      transId: 23877,
      transTime: moment().subtract({years: 3}).valueOf(),
      transTo: "Savings Account"
    },
    {
      custId: 0,
      description: "VC funding",
      transAmt: 1000000,
      transFrom: "VC Partners",
      transId: 23876,
      transTime: moment().subtract({years: 3, days: 1}).valueOf(),
      transTo: "Checking Account"
    },
    {
      custId: 0,
      description: "VC funding",
      transAmt: 1000000,
      transFrom: "VC Partners",
      transId: 23875,
      transTime: moment().subtract({years: 3, days: 1}).valueOf(),
      transTo: "R & D Account"
    },
    {
      custId: 0,
      description: "Account Opening",
      transAmt: 0,
      transFrom: "Account Opening",
      transId: 23874,
      transTime: moment().subtract({years: 3, days: 2}).valueOf(),
      transTo: "Savings Account"
    },
    {
      custId: 0,
      description: "Account Opening",
      transAmt: 0,
      transFrom: "Account Opening",
      transId: 23873,
      transTime: moment().subtract({years: 3, days: 3}).valueOf(),
      transTo: "Checking Account"
    },
    {
      custId: 0,
      description: "Account Opening",
      transAmt: 0,
      transFrom: "Account Opening",
      transId: 23872,
      transTime: moment().subtract({years: 3, days: 4}).valueOf(),
      transTo: "R & D Account"
    }
  ]

const randomNum = (range) => {
  return Math.floor(Math.random() * (range[1] - range[0]) + range[0])
}

const randomAmt = (startingAmt) => {
  return randomNum([Math.floor(startingAmt / 100), Math.floor(startingAmt / 50)])
}

const randomTransTo = () => {
  return [
    "Savings Account",
    "Checking Account",
    "Apple",
    "Stadium",
    "Renovations",
    "Event",
    "Product",
    "R & D",
    "Consulting",
    "Payroll"
  ][randomNum([0, 10])]
}

const randomTransFrom = () => {
  return [
    "Savings Account",
    "Checking Account",
    "R & D",
    "Customer Payment",
    "Investment"
  ][randomNum([0, 4])]
}

const hasNoInternalAccount = (transTo, transFrom, accounts) => {
  return !accounts.includes(transTo) && !accounts.includes(transFrom)
}

const isInternalTransaction = (transTo, transFrom, accounts) => {
  return accounts.includes(transTo) && accounts.includes(transFrom)
}

const isFromSameAccount = (transTo, transFrom) => {
  return transTo === transFrom
}

const isMoneyGoingOut = (transFrom, accounts) => {
  return accounts.includes(transFrom)
}

const makePositive = (num) => {
  return num < 0 ? -num : num
}

const makeNegative = (num) => {
  return num > 0 ? -num : num
}

const checkData = (newTransaction) => {

  let transTo = newTransaction.transTo
  let transFrom = newTransaction.transFrom
  let transAmt = newTransaction.transAmt
  let accounts = ["Checking Account", "Savings Account", "R & D"]


  if (hasNoInternalAccount(transTo, transFrom, accounts)) {
    newTransaction.transTo = "Checking Account"
    newTransaction.transAmt = makePositive(newTransaction.transAmt)
  }

  if (isFromSameAccount(transTo, transFrom)) {
    //arbitrary destination
    newTransaction.transTo = "Apple"
    newTransaction.transAmt = makeNegative(newTransaction.transAmt)
  }

  //need to make sure if it's money going out of the account, it's a negative amount
  if (isInternalTransaction(transTo, transFrom, accounts) ||
     isMoneyGoingOut(transFrom, accounts)) {
    newTransaction.transAmt = makeNegative(transAmt)
  }

  if (newTransaction.transAmt > 0) {
    newTransaction.transAmt = newTransaction.transAmt * 2
  }

  return newTransaction
}

const makeTimeInterval = (transTime) => {
  return Math.floor((moment().valueOf() - transTime) / 200)
}

const timeInterval = makeTimeInterval(startingData[0].transTime)

const dataGenerator = (data) => {
  let startingAmt = data[0].transAmt

  for (let i = 0; i < 200; i++) {
    let id = data[0].transId + 1
    let time = data[0].transTime + timeInterval
    let newTransaction = {
      custId: 0,
      description: randomTransTo(),
      transAmt: randomAmt(startingAmt),
      transFrom: randomTransFrom(),
      transId: id,
      transTime: time,
      transTo: randomTransTo()
    }
    data.unshift(checkData(newTransaction))
  }

  return data
}

let data = dataGenerator(startingData)
export {data}
