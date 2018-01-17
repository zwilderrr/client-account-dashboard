import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
const moment = require('moment')


class TransactionTable extends React.Component {



  formatDate = (utc) => {
    return moment(utc).format('MMM Do, YYYY')
  }

  render() {
    return(
      <div>
        <h1>Transaction Table</h1>
        <BootstrapTable data={this.props.transactionData} height={"40px"} striped hover>
          <TableHeaderColumn isKey dataField='transTime' dataFormat={this.formatDate}>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
          <TableHeaderColumn dataField='transFrom'>Transfer From</TableHeaderColumn>
          <TableHeaderColumn dataField='transTo'>Transfer To</TableHeaderColumn>
          <TableHeaderColumn dataField='transAmt'>Amount</TableHeaderColumn>
        </BootstrapTable>

      </div>
    )
  }
}

export default connect(null, null)(TransactionTable)
