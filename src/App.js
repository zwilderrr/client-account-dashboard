import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DashboardContainer from './components/DashboardContainer'
import * as DataActions from './actions/data'
import * as SettingsActions from './actions/settings'

class App extends React.Component {

  componentDidMount = () => {
    let custAccounts = ["Checking", "Savings"]
    let custId = 0
    this.props.settings.setAllAccounts(custAccounts)
    this.props.data.getTransactionData(custId, this.parseCustData)
  }

  parseCustData = (res) => {
    //this assumes each account has a different name/identifyer
    let allAccounts = this.props.allAccounts
    let parsedData = allAccounts.map(accountName => {
      let transactions = this.filterTransactions(res, accountName)
      let balance = transactions[0].runningBalance
      return {
        accountName: accountName,
        transactions,
        balance: balance
      }
    })

    //adds an O(n) calculation but makes for O(1) account access
    const dataObj = {}
    parsedData.forEach(account => {
      dataObj[account.accountName] = account
    })

    this.props.data.setTransactionData(dataObj)
    // without making obj
    // this.props.data.setTransactionData(parsedData)
  }

  filterTransactions = (res, accountName) => {
    //
    let transactions = []
    let runningBalance = 0

    for (let i = res.length - 1; i >= 0; i--) {
      let transaction = res[i]
      let transTo = transaction.transTo.split(" Account")[0]
      let transFrom = transaction.transFrom.split(" Account")[0]

      if (this.isOfThisAccount(transaction, accountName, transTo, transFrom)) {
        runningBalance += (this.transactionAmt(transaction, accountName, transTo, transFrom) * 100)
        if (transaction.runningBalance) {
          //it's already processed (ie an internal transaction) and tf already has a runningBalance associated with it
          let transDup = JSON.parse(JSON.stringify(transaction))
          transDup.runningBalance = (runningBalance / 100)
          transactions.unshift(transaction)
        } else {
          transaction.runningBalance = (runningBalance / 100)
          transactions.unshift(transaction)
        }
      }
    }
    return transactions
  }

  transactionAmt = (transaction, accountName, transTo, transFrom) => {
    if (this.props.allAccounts.includes(transTo) && this.props.allAccounts.includes(transFrom)) {
      //"negitive value" coming into the account
      if (transTo === accountName) {
        return -transaction.transAmt
      }
    }
    return transaction.transAmt
  }

  isOfThisAccount = (transaction, accountName, transTo, transFrom) => {
    return (accountName.includes(transTo) || accountName.includes(transFrom))
  }

  setDisplay = () => {
    if (this.props.dataLoaded) {
      return (
        <div>
          <h1>App</h1>
          <DashboardContainer />
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
    console.log(this.props.transactionData);
    return (
      this.setDisplay()
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
