import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AccountContainer from './AccountContainer'

class DashboardContainer extends React.Component {

  render() {
    return(

      <div>
        <h1>DashboardContainer</h1>
        <AccountContainer />
      </div>
    )
  }
}

export default connect(null, null)(DashboardContainer)
