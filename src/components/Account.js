import React from 'react'
import { connect } from 'react-redux'
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

      </div>
    )
  }
}
// style={{display: this.state.showChart ? "in-line" : "none"}}

export default connect(null, null)(Account)
