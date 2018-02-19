import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DashboardContainer from './components/DashboardContainer'
import Header from './components/Header'
import Footer from './components/Footer'
import * as DataActions from './actions/data'
import * as SettingsActions from './actions/settings'


class App extends React.Component {

  componentDidMount = () => {
    let custId = 0
    this.props.data.getTransactionData(custId, this.parseCustData)
  }

  parseCustData = (res) => {
    let custAccounts = ["Checking", "Savings", "R & D"]
    new Promise((resolve, reject) => {
      this.props.settings.setAllAccounts(custAccounts)
      console.log("after set all accounts");
      resolve(res)
    }).then((res) => this.actuallyParseData(res))
  }

  actuallyParseData = (res) => {

    console.log("actually parse");

    let parsedData = this.makeParsedDataSkeleton()

    for (let i = res.length - 1; i >= 0; i--) {
      let transaction = res[i]
      let transTo = transaction.transTo.split(" Account")[0]
      let transFrom = transaction.transFrom.split(" Account")[0]
      let runningBalance = "runningBalance"
      let allAcctsRecord = {
        transId: transaction.transId,
        transTime: transaction.transTime,
        transAmt: 0
      }
      if (this.isInternalTransaction(transTo, transFrom)) {
        this.updateWithInternalTrans(transTo, transFrom, transaction, parsedData, runningBalance)
      } else {
        this.updateWithExternalTrans(transTo, transFrom, transaction, parsedData, runningBalance)
        allAcctsRecord.transAmt = transaction.transAmt
        parsedData.allAccounts.balance += transaction.transAmt
      }
      allAcctsRecord[runningBalance] = parsedData.allAccounts.balance
      parsedData.allAccounts.transactions.push(allAcctsRecord)

    }
    this.props.data.setTransactionData(parsedData)
  }

  makeParsedDataSkeleton = () => {
    let skeleton = {
      allAccounts: {
        balance: 0,
        transactions: []
      }
    }

    this.props.allAccounts.forEach(acct => {
      skeleton[acct] = {
        accountName: acct,
        balance: 0,
        transactions: []
      }
    })
    return skeleton
  }

  isInternalTransaction = (transTo, transFrom) => {
    return (this.props.allAccounts.includes(transTo) &&
    this.props.allAccounts.includes(transFrom))
  }

  updateWithInternalTrans = (transTo, transFrom, transaction, parsedData, runningBalance) => {
    let dupedTrans = JSON.parse(JSON.stringify(transaction))

    parsedData[transFrom].balance += transaction.transAmt
    parsedData[transTo].balance -= transaction.transAmt

    parsedData[transFrom].transactions.push(transaction)
    parsedData[transTo].transactions.push(dupedTrans)

    transaction[runningBalance] = parsedData[transFrom].balance
    dupedTrans[runningBalance] = parsedData[transTo].balance
  }

  updateWithExternalTrans = (transTo, transFrom, transaction, parsedData, runningBalance) => {
    if (transaction.transAmt < 0) {
      parsedData[transFrom].balance += transaction.transAmt
      transaction[runningBalance] = parsedData[transFrom].balance
      parsedData[transFrom].transactions.push(transaction)
    } else {
      parsedData[transTo].balance += transaction.transAmt
      transaction[runningBalance] = parsedData[transTo].balance
      parsedData[transTo].transactions.push(transaction)
    }
  }

  setDisplay = () => {
    if (this.props.dataLoaded) {
      return (
        <div className="animated fadeIn">
          <Header className="header"/>
          <DashboardContainer />
          <Footer />
        </div>
      )
    } else {
      return (
        <div>
          Loading your data..
        </div>
      )
    }
  }


  render() {
    return (
      <div className="background">
        {this.setDisplay()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allAccounts: state.settings.allAccounts,
    transactionData: state.data.transactionData,
    dataLoaded: state.data.dataLoaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    data: bindActionCreators(DataActions, dispatch),
    settings: bindActionCreators(SettingsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
