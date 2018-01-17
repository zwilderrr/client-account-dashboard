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
    this.props.settings.setDisplayAccounts(custAccounts)
    this.props.data.getTransactionData(custId, this.parseCustData)
  }

  parseCustData = (res) => {
    //this assumes each account has a different name/identifyer
    let allAccounts = this.props.allAccounts
    let parsedData = allAccounts.map(accountName => {

      let transactions = this.filterTransactions(res, accountName)
      let balance = this.calculateBalance(transactions, allAccounts, accountName)
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
    return res.filter(transaction => {
      let transTo = transaction.transTo.split(" Account")[0]
      let transFrom = transaction.transFrom.split(" Account")[0]
      return (
        accountName.includes(transTo) || accountName.includes(transFrom)
      )
    })
  }

  calculateBalance = (transactions, allAccounts, accountName) => {
    let sum = 0
    transactions.forEach(transaction => {
      let transTo = transaction.transTo.split(" Account")[0]
      let transFrom = transaction.transFrom.split(" Account")[0]
      //conditional required to handle internal transactions, which are listed as negative
      if (allAccounts.includes(transTo) && allAccounts.includes(transFrom)) {
        //"negitive value" coming into the account
        if (transTo === accountName) {
          sum += -transaction.transAmt
        } else {
          //"negitive value" going out
          sum += transaction.transAmt
        }
      } else {
        sum += transaction.transAmt
      }
    })
    return sum
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
