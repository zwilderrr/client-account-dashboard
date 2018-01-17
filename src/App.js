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
    let allAccounts = this.props.allAccounts
    let parsedData = allAccounts.map(accountType => {

      let transactions = this.filterTransactions(res, accountType)
      let balance = this.calculateBalance(transactions, allAccounts, accountType)
      return {
        accountType: accountType,
        transactions: {
          transactions
        },
        balance: balance
      }
    })
    this.props.data.setTransactionData(parsedData)
  }

  filterTransactions = (res, accountType) => {
    return res.filter(transaction => {
      let transTo = transaction.transTo.split(" Account")[0]
      let transFrom = transaction.transFrom.split(" Account")[0]
      return (
        accountType.includes(transTo) || accountType.includes(transFrom)
      )
    })
  }

  calculateBalance = (transactions, allAccounts, accountType) => {
    let sum = 0
    transactions.forEach(transaction => {
      let transTo = transaction.transTo.split(" Account")[0]
      let transFrom = transaction.transFrom.split(" Account")[0]
      //conditional required to handle internal transactions, which are listed as negative
      if (allAccounts.includes(transTo) && allAccounts.includes(transFrom)) {
        //"negitive value" coming into the account
        if (transTo === accountType) {
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


  render() {
    return (
      <div>
        <h1>App</h1>
        <DashboardContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allAccounts: state.settings.allAccounts,
    transactionData: state.data.transactionData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    data: bindActionCreators(DataActions, dispatch),
    settings: bindActionCreators(SettingsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
