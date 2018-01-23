import React from 'react'
import { connect } from 'react-redux'
import CountUp from 'react-countup'
import {Line} from 'react-chartjs-2';
import {Col} from 'react-bootstrap'
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
    let showing = this.state.showChart
    this.props.toggleAcctDetails(event, showing)
    this.setState({
      showChart: showing ? false : true
    })
  }

  getChartSettings = () => {
    let acctTrans = this.props.data.transactions
    const colors = [
      "rgba(52,152,219,.3)",
      "rgba(52,152,219,.7)",
      "rgba(46,204,113,.3)",
      "rgba(46,204,113,.7)",
      "rgba(49, 46, 204, 0.3)",
      "rgba(49, 46, 204, 0.7)",
      "rgba(204, 46, 202, 0.3)",
      "rgba(204, 46, 202, 0.7)",
      "rgba(196, 204, 46, 0.3)",
      "rgba(196, 204, 46, 0.7)",
    ]
    let colorIndex = 0
    //colorIndex should be set to the index + 1 of the acctName in allAccounts (exept if it's zero, in which case colorIndex should equal 0)
    //currently not passing in props correctly

    let chartData = {
      labels: [],
      datasets: [
        {
          label: "Balance",
          backgroundColor: "rgba(52,152,219,.3)",
          pointRadius: 0,
          borderColor: "rgba(52,152,219,.3)",
          data: [],
          fill: true,
          showLine: true,

        }
      ]
    }

    let chartOptions = {
      title: {
        display: true,
        text:`${this.props.data.accountName} Account Balance History`
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
    let delta = numTrans < 30 ? 1 : Math.ceil(numTrans / 30)
    for (var i = 0; i < numTrans; i += delta) {
      if (colorIndex >= colors.length - 1) {
        colorIndex = 1
      }
      chartData.labels.push(acctTrans[i].transTime)
      chartData.datasets[0].data.push(acctTrans[i].runningBalance)
      chartData.datasets.backgroundColor = colors[colorIndex]
      chartData.datasets.borderColor = colors[colorIndex + 1]
      colorIndex += 2
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
      <div >
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

        <Line data={chartData} options={chartOptions} redraw/>

      </div>
    )
  }
}


export default connect(null, null)(Account)
