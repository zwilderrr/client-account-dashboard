import React from 'react'
import { connect } from 'react-redux'
import CountUp from 'react-countup';

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

  render() {
    return(
      <div>
        <h1 onClick={this.toggleShowDetails}>{this.props.data.accountName}</h1>
        <CountUp start={0} end={this.props.data.balance}
          duration={1.5}
          useGrouping={true}
          separator={","}
          decimals={2}
          decimal={"."}
          prefix={"$"}
        />

      </div>
    )
  }
}
// style={{display: this.state.showChart ? "in-line" : "none"}}

export default connect(null, null)(Account)
