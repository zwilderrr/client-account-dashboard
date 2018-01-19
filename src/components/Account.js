import React from 'react'
import { connect } from 'react-redux'
import CountUp from 'react-countup'
import {Line} from 'react-chartjs-2';

// import { bindActionCreators } from 'redux'


class Account extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showDetails: false
    }
  }

  setShowDetails = (boolean) => {
    this.setState({
      showDetails: boolean
    })
  }

  toggleShowDetails = (event) => {
    this.props.showAcctDetails(event, this.setShowDetails)
  }

  getChartSettings = () => {
    let acctTrans = this.props.data.transactions

    // let delta = Math.round(acctTrans.length / 5)
    let chartData = {
      labels: [],
      datasets: [
        {
          label: "Balance over time",
          fillColor: "rgba(46,204,113,.5)",
          strokeColor: "#2ecc71",
          highlightFill: "#2ecc71",
          highlightStroke: "#2ecc71",
          backgroundColor: "rgba(219, 52, 52, 0.5)",
          borderColor: "transparent",
          data: [
            //balance
          ],
          fill: false,
        }
      ]
    }

    let chartOptions = {
      title: {
        display: true,
        text:'Chart.js Line Chart'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      maintainAspectRatio: true,
      responsive: true

    }

    for (var i = 0; i < acctTrans.length; i++) {
      chartData.labels.push(acctTrans[i].transTime)
      chartData.datasets[0].data.push(acctTrans[i].runningBalance)

    }

    return [chartData, chartOptions]
  }

  render() {
    const chartSettings = this.getChartSettings()
    const chartData = chartSettings[0]
    const chartOptions = chartSettings[1]
    console.log(chartData);

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

        <Line data={chartData} options={chartOptions}/>

      </div>
    )
  }
}
// style={{display: this.state.showChart ? "in-line" : "none"}}

export default connect(null, null)(Account)
