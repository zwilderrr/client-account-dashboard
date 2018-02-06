import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Doughnut, Line } from 'react-chartjs-2'
import { Grid, Row, Col } from 'react-bootstrap'

import TransactionTable from './TransactionTable'
import Account from './Account'
import * as SettingsActions from '../actions/settings'
const moment = require('moment')
const numeral = require('numeral')


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
        toggleAcctDetails={this.toggleAcctDetails}
        colorIndex={index}
      />
    )
  }

  toggleAcctDetails = (account, showing) => {
    let displayAccounts = this.props.displayAccounts
    let allAccounts = this.props.allAccounts
    if (!showing) {
      this.removeFromDispAccts(account, displayAccounts, allAccounts)
    } else {
      this.addToDispAccts(account, displayAccounts, allAccounts)
    }
  }

  removeFromDispAccts = (account, displayAccounts, allAccounts) => {
    //maintains same display order
    let newDisplay = []
    allAccounts.forEach(el => {
      if (displayAccounts.includes(el) && el !== account) {
        newDisplay.push(el)
      }
    })
    this.props.settings.setDisplayAccounts(newDisplay)
  }

  addToDispAccts = (account, displayAccounts, allAccounts) => {
    let newDisplay = []
    allAccounts.forEach(el => {
      if (displayAccounts.includes(el)) {
        newDisplay.push(el)
      } else if (el === account) {
        newDisplay.push(el)
      }
    })
    this.props.settings.setDisplayAccounts(newDisplay)
  }

  filterTransactions = (accounts) => {
    let displayAccounts = [...accounts]
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

  getLineChartSettings = () => {
    let acctTrans = this.props.transactionData.allAccounts.transactions

    let chartData = {
      labels: [],
      datasets: [
        {
          label: "Balance",
          backgroundColor: "rgba(33, 163, 0, 0.31)",
          pointRadius: 0,
          borderColor: "rgba(33, 163, 0, 0.5)",
          data: [],
          fill: true,
          showLine: true,
        }
      ]
    }

    let chartOptions = {
      title: {
        display: true,
        text:'Balance History'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: this.formatLineTooltipBalance,
          title: this.formatLineTooltipTitle
        }
      },
      maintainAspectRatio: true,
      responsive: true,
      legend: false,
      scales: {
        yAxes: [{
          ticks: {
            callback: (value) => numeral(value).format('$0,0')
          }
        }],
        xAxes: [{
          ticks: {
            callback: (unix) => moment(unix).format('D/M/Y')
          }
        }]
      }
    }

    let numTrans = acctTrans.length
    let delta = numTrans < 25 ? 1 : Math.ceil(numTrans / 25)
    for (var i = 0; i < numTrans; i += delta) {
      chartData.labels.push(acctTrans[i].transTime)
      chartData.datasets[0].data.push(acctTrans[i].runningBalance)
    }

    return [chartData, chartOptions]
  }

  formatLineTooltipBalance = (tooltipItem) => {
    return numeral(tooltipItem.yLabel).format('$0,0.00')
  }

  formatLineTooltipTitle = (tooltipItem, data) => {
    let index = tooltipItem[0].index
    let unix = data.labels[index]
    return moment(unix).format('ddd MMM Do, YYYY @ h:mm:ss a')
  }

  getDoughnutChartSettings = () => {
    const colors = [
      "rgba(52,152,219,.5)",
      "rgba(52,152,219,.45)",
      "rgba(46,204,113,.5)",
      "rgba(46,204,113,.45)",
      "rgba(49, 46, 204, 0.5)",
      "rgba(49, 46, 204, 0.45)",
      "rgba(204, 46, 202, 0.5)",
      "rgba(204, 46, 202, 0.45)",
      "rgba(196, 204, 46, 0.5)",
      "rgba(196, 204, 46, 0.45)",
    ]
    let colorIndex = 0
    let chartData = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
          borderWidth: 3,
          hoverBorderColor: "transparent",
          hoverBorderWidth: 0
        }
      ]
  	}
    let chartOptions = {
      cutoutPercentage: 80,
      maintainAspectRatio: true,
      responsive: true,
      tooltips: {
        intersect: true,
        callbacks: {
          label: this.formatDoughnutTooltipBalance,
          title: this.formatDoughnutTooltipTitle
        }
      },
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

  formatDoughnutTooltipBalance = (tooltipItem, data) => {
    let index = tooltipItem.index
    let balance = data.datasets[0].data[index]
    return `Balance: ${numeral(balance).format('$0,0.00')}`
  }

  formatDoughnutTooltipTitle = (tooltipItem, data) => {
    return data.labels[tooltipItem[0].index]
  }

  render() {
    const transactionData = this.filterTransactions(this.props.displayAccounts)
    const accounts = this.getAccounts()
    const doughnutChartData = this.getDoughnutChartSettings()[0]
    const doughnutChartOptions = this.getDoughnutChartSettings()[1]
    const lineChartData = this.getLineChartSettings()[0]
    const lineChartOptions = this.getLineChartSettings()[1]

    return(
      <div>
        <Grid fluid>
          <Row className="grid-padding">
            <h1>Welcome, Zack!</h1>
            <br/>
            <h3>Account Overview</h3>

            <Row>
              <Col className="dash-item" sm={4}>
                <Doughnut width={145} data={doughnutChartData} options={doughnutChartOptions}/>
              </Col>

              <Col className="dash-item" sm={8}>
                <Line data={lineChartData} options={lineChartOptions} />
              </Col>
            </Row>

            <Row className="dash-item">
              <div className="search-box">
                <input
                className="search"
                type="text"
                placeholder="Search Transactions..."
                value={this.state.searchInput}
                onChange={this.handleSearchInput}
                />
              </div>
            </Row>

            <Row >
              <Col className="dash-item" sm={6}>
                <TransactionTable transactionData={transactionData}/>
              </Col>

              <Col className="dash-item" sm={6}>
                <h3>Accounts</h3>
                {accounts}
              </Col>
            </Row>

          </Row>
        </Grid>
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
