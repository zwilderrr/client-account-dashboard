import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TransactionTable from './TransactionTable'
import Account from './Account'
import * as SettingsActions from '../actions/settings'
const DoughnutChart = require("react-chartjs").Doughnut


class AccountContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      searchInput: ""
    }
  }

  handleSearchInput = (event) => {
    event.preventDefault()
    this.setState({
      searchInput: event.target.value
    })
  }

  getAccounts = () => {
    return this.props.allAccounts.map((accountName, index) =>
      <Account
        key={index}
        data={this.props.transactionData[accountName]}
        showAcctDetails={this.showAcctDetails}
      />
    )
  }

  showAcctDetails = (event, cb) => {
    if (this.props.displayingAccountDetails) {
      //prevents two account details being open
      if (event.target.innerText === this.props.displayAccounts[0]) {
        this.props.settings.setDisplayAccounts(this.props.allAccounts)
        this.props.settings.displayingAccountDetails(false)
        cb(false)
      } else {
        return
      }
    } else {
      this.props.settings.setDisplayAccounts([event.target.innerText])
      this.props.settings.displayingAccountDetails(true)
      cb(true)
    }
  }

  filterTransactions = (accounts) => {
    let displayAccounts = accounts
    if (displayAccounts.length === 0) {
      displayAccounts = this.props.allAccounts
    }

    let filteredTransactions = this.props.rawData.filter(transaction => {
      let transTo = transaction.transTo.split(" Account")[0]
      let transFrom = transaction.transFrom.split(" Account")[0]
      return (
        displayAccounts.includes(transTo) || displayAccounts.includes(transFrom)
      )
    })

    if (this.state.searchInput) {
      filteredTransactions = this.filterBySearchTerm(filteredTransactions)
    }
    return filteredTransactions
  }

  filterBySearchTerm = (filteredTransactions) => {
    let filteredBySearch = []
    filteredTransactions.map(transaction => {
      for (var key in transaction) {
        if (transaction[key]
          .toString()
          .toLowerCase()
          .includes(this.state.searchInput)) {
          filteredBySearch.push(transaction)
          break
        }
      }
    })
    return filteredBySearch
  }

  getPieChartData = () => {
    const data = []
    const colors = [
      "#3498db",
      "#2ecc71",
      "#f39c12",
      "#34495e",
      "#7f8c8d"
    ]
    let colorIndex = 0
    this.props.allAccounts.map((accountName) => {
      colorIndex === colors.length - 1 ? colorIndex = 1 : colorIndex
      data.push({
        label: `${accountName} Account`,
        value: this.props.transactionData[accountName].balance,
        color: colors[colorIndex]
      })
      colorIndex++
    })

    return data
  }

  render() {
    const transactionData = this.filterTransactions(this.props.displayAccounts)
    const accounts = this.getAccounts()
    const chartData = this.getPieChartData()
    return(
      <div>
        <h1>AccountContainer</h1>

        {accounts}
        <div>
          <DoughnutChart data={chartData} options={{percentageInnerCutout: 70, animationEasing: 'easeInOutQuart', labels: true}}/>
        </div>

        <input
          type="text"
          placeholder="Search Transactions..."
          value={this.state.searchInput}
          onChange={this.handleSearchInput}
        />



        <TransactionTable transactionData={transactionData} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allAccounts: state.settings.allAccounts,
    displayAccounts: state.settings.displayAccounts,
    displayingAccountDetails: state.settings.displayingAccountDetails,
    transactionData: state.data.transactionData,
    rawData: state.data.rawData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    settings: bindActionCreators(SettingsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)
