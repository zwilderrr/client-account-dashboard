import React from 'react'
import { connect } from 'react-redux'
import CountUp from 'react-countup'
import {Line} from 'react-chartjs-2';
const moment = require('moment')
const numeral = require('numeral')

// import { bindActionCreators } from 'redux'


class Account extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showChart: false
    }
  }

  setShowDetails = (boolean) => {
    this.setState({
      showChart: boolean
    })
  }

  toggleShowDetails = (event) => {
    this.props.showAcctDetails(event, this.setShowDetails)
  }

  getChartSettings = () => {
    let acctTrans = this.props.data.transactions

    let chartData = {
      labels: [],
      datasets: [
        {
          label: "Balance",
          backgroundColor: "rgba(219, 52, 52, 0.3)",
          pointRadius: 0,
          borderColor: "rgba(219, 52, 52, 0.7)",
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
          label: this.formatTooltipBalance,
          title: this.formatTooltipTitle
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
            callback: (utc) => moment(utc).format('D/M/Y')
          }
        }]
      }

    }

    let numTrans = acctTrans.length
    let delta = numTrans < 25 ? 1 : Math.ceil(numTrans / 25)
    for (var i = 0; i < numTrans; i += delta) {
      chartData.labels.unshift(acctTrans[i].transTime)
      chartData.datasets[0].data.unshift(acctTrans[i].runningBalance)

    }

    return [chartData, chartOptions]
  }

  formatTooltipBalance = (tooltipItem) => {
    return numeral(tooltipItem.yLabel).format('$0,0.00')

  }

  formatTooltipTitle = (tooltipItem, data) => {
    let index = tooltipItem[0].index
    let utc = data.labels[index]
    return moment(utc).format('ddd MMM Do, YYYY @ h:mm:ss a')
  }

  getChartStyle = () => {
    return (this.state.showChart) ? "animated fadeIn" : "none"
  }


  render() {
    const chartSettings = this.getChartSettings()
    const chartStyle = this.getChartStyle()
    const chartData = chartSettings[0]
    const chartOptions = chartSettings[1]

    return(
      <div>
        <h1 onClick={this.toggleShowDetails}>{this.props.data.accountName}</h1>
        <div>
        <CountUp start={0} end={this.props.data.balance}
          duration={1.5}
          useGrouping={true}
          separator={","}
          decimals={2}
          decimal={"."}
          prefix={"$"}
        />
        </div>

        <div className={chartStyle}>
          <Line data={chartData} options={chartOptions} redraw/>
        </div>

      </div>
    )
  }
}


export default connect(null, null)(Account)
