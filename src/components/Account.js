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

  //toggleShowDetails

  render() {
    return(
      <div>
        {this.props.data.accountName}
      </div>
    )
  }
}
// style={{display: this.state.showChart ? "in-line" : "none"}}

export default connect(null, null)(Account)
