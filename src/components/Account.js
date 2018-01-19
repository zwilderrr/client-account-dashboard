import React from 'react'
import { connect } from 'react-redux'
import CountUp from 'react-countup'
const LineChart = require("react-chartjs").Line

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

  getLineChartData = () => {
    //make balance over time be by the minute and use real transactions so you can click on them to display a modal box with a transaction in full details
      return {
    	labels: ["January", "February", "March", "April", "May", "June", "July"],
    	datasets: [
    		{
    			label: "",
    			fillColor: "rgba(46,204,113,.5)",
    			strokeColor: "#2ecc71",
    			highlightFill: "#2ecc71",
    			highlightStroke: "#2ecc71",
    			data: [2800, 4800, 4000, 1900, 860, 2700, 9000]
    		}
    	]
    };
  }

  render() {
    const chartData = this.getLineChartData()

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

        <LineChart data={chartData} />

      </div>
    )
  }
}
// style={{display: this.state.showChart ? "in-line" : "none"}}

export default connect(null, null)(Account)
