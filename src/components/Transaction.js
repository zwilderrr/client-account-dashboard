import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Transaction extends React.Component {



  render() {
    return(
      <div>
        <h3>transaction</h3>
      </div>
    )
  }
}


export default connect(null, null)(Transaction)
