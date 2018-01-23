import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DashboardContainer from './components/DashboardContainer'
import * as DataActions from './actions/data'
import * as SettingsActions from './actions/settings'

class App extends React.Component {

  componentDidMount = () => {
    let custId = 0
    this.props.data.getTransactionData(custId, this.parseCustData)
  }

  parseCustData = (res) => {
    let allAcctsBalance = 0
    let parsedData = {
      custAccountNames: custAccounts,
      allAcctsTrans: []
    }
    //custAccounts would be something like res.custAcctNames
    let custAccounts = ["Checking", "Savings"]
    this.props.settings.setAllAccounts(custAccounts)

    custAccounts.forEach(account => {
      parsedData.account: {
        runningBalance: 0,
        transactions: []
      }
    })



    for (var i = res.length - 1; i >= 0; i--) {
      let transaction = res[i]
      let transTo = transaction.transTo.split(" Account")[0]
      let transFrom = transaction.transFrom.split(" Account")[0]

      if (this.isInternalTransaction(transaction, transTo, transFrom)) {
        transaction["allAcctsBalance"] = allAcctsBalance
      } else {

        //is money going in?
          //what's the running balance?
      }
      allAcctsBalance += transaction.transAmt
      transaction["allAcctsBalance"] = allAcctsBalance

      //determines whether transTo or transFrom is a customer acct
      if this.props.allAccounts.includes(transTo) {
        if (!parsedData[transTo]) {
          parsedData[transTo] = []
        }
        parsedData[transTo].unshift(transaction)
      } else {
        if (!parsedData[transFrom]) {
          parsedData[transFrom] = []
        }
        parsedData[transFrom].unshift(transaction)
      }

      runningBalance += transaction.transAmt
      transaction.runningBalance = runningBalance


      allAcctsTrans.unshift(transaction)
    }
  }

  transferIn = (transTo, transFrom) => {
    return this.props.allAccounts.includes(transTo)
  }

  isInternalTransaction = (transaction, transTo, transFrom) => {
    return (this.props.allAccounts.includes(transTo) || this.props.allAccounts.includes(transFrom))
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
