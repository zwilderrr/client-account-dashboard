import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class Account extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showDetails: false
    }
  }

  render() {

    return(
      <div>
        {this.props.accountType} Account
      </div>
    )
  }
}
// style={{display: this.state.showChart ? "in-line" : "none"}}

export default connect(null, null)(Account)
