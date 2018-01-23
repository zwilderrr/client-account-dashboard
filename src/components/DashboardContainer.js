import React from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import AccountContainer from './AccountContainer'
import Footer from './Footer'

class DashboardContainer extends React.Component {

  render() {

    return(

      <div>
        <AccountContainer />
        <Footer />
      </div>
    )
  }
}

export default connect(null, null)(DashboardContainer)
