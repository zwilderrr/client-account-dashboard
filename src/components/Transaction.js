import React from 'react'

const moment = require('moment')
const numeral = require('numeral')

class Transaction extends React.Component {

  formatDate = (utc) => {
    return moment(utc).format('MMM Do, YYYY @ h:mm:ss a')
  }

  formatTransAmt = (amt) => {
    return numeral(amt).format('$0,0.00')
  }

  render() {
    return(
      <div>
        <h4>Transaction ID: <b>{this.props.details.transId}</b></h4>
        <h4>Date: <b>{this.formatDate(this.props.details.transTime)}</b></h4>
        <h4>Amount: <b>{this.formatTransAmt(this.props.details.transAmt)}</b></h4>
        <h4>Description: <b>{this.props.details.description}</b></h4>
        <h4>From: <b>{this.props.details.transTo}</b></h4>
        <h4>To: <b>{this.props.details.transFrom}</b></h4>
      </div>
    )
  }
}

export default Transaction
