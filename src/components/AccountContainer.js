import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TransactionTable from './TransactionTable'
import Account from './Account'
import * as SettingsActions from '../actions/settings'
import {Doughnut} from 'react-chartjs-2';


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
    filteredTransactions.forEach(transaction => {
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

  getChartSettings = () => {


    const colors = [
      "rgba(52,152,219,.5)",
      "rgba(52,152,219,.5)",
      "rgba(46,204,113,.5)",
      "rgba(46,204,113,.45)",
    ]
    let colorIndex = 0

    let chartData = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
          hoverBorderColor: "transparent"
        }
      ]
  	}

    let chartOptions = {
      cutoutPercentage: 80,
      maintainAspectRatio: true,
      responsive: true
    }

    this.props.allAccounts.forEach(accountName => {
      if (colorIndex >= colors.length - 1) {
        colorIndex = 1
      }
      chartData.labels.push(`${accountName} Account`)
      chartData.datasets[0].data.push(this.props.transactionData[accountName].balance)
      chartData.datasets[0].backgroundColor.push(colors[colorIndex])
      chartData.datasets[0].hoverBackgroundColor.push(colors[colorIndex + 1])
      colorIndex += 2
    })

    return [chartData, chartOptions]
  }


  render() {
    const transactionData = this.filterTransactions(this.props.displayAccounts)
    const accounts = this.getAccounts()
    const chartData = this.getChartSettings()[0]
    const chartOptions = this.getChartSettings()[1]
    return(
      <div>
        <h1>AccountContainer</h1>

        <Doughnut onElementsClick={this.click} data={chartData} options={chartOptions}/>

        {accounts}


        <input
          type="text"
          placeholder="Search Transactions..."
          value={this.state.searchInput}
          onChange={this.handleSearchInput}
        />



        <TransactionTable transactionData={transactionData}/>
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


// {
//       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//       datasets: [
//       {
//         label: 'My First dataset',
//         fill: false,
//         lineTension: 0.1,
//         borderColor: 'rgba(75,192,192,1)',
//         borderCapStyle: 'butt',
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: 'miter',
//         pointBorderColor: 'rgba(75,192,192,1)',
//         pointBackgroundColor: '#fff',
//         pointBorderWidth: 1,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//         pointHoverBorderColor: 'rgba(220,220,220,1)',
//         pointHoverBorderWidth: 2,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: [65, 59, 80, 81, 56, 55, 40]
//       }
//       ]
//       }
