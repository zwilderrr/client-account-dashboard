import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Modal, Button } from 'react-bootstrap'

import Transaction from './Transaction'
const moment = require('moment')
const numeral = require('numeral')


class TransactionTable extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false,
    }
  }

  handleModalClose = () => {
    this.setState({
      showModal: false
    })
  }

  handleModalShow = (row) => {
    this.setState({
      showModal: true,
      transactionDetails: row
    })
  }

  getOptions = () => {
    return {
      onRowClick: (row) => {
        this.handleModalShow(row)
      }
    }
  }

  formatDate = (utc) => {
    return moment(utc).format('MMM Do, YYYY')
  }

  formatTransAmt = (amt) => {
    return numeral(amt).format('$0,0.00')
  }

  render() {
    const options = this.getOptions()

    return(
      <div>
      <div>
        <h3>Transaction Table</h3>
        <BootstrapTable width={30} height={1000} data={this.props.transactionData} options={options} hover responsive scrollTop={'Top'}>
          <TableHeaderColumn isKey dataSort dataField='transTime' dataFormat={this.formatDate}>Date</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField='description'>Description</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField='transFrom'>Transfer From</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField='transTo'>Transfer To</TableHeaderColumn>
          <TableHeaderColumn dataSort dataFormat={this.formatTransAmt} dataField='transAmt'>Amount</TableHeaderColumn>
        </BootstrapTable>
        <div className="table-bottom"></div>
      </div>


        <Modal show={this.state.showModal} onHide={this.handleModalClose} >
					<Modal.Header closeButton>
						<Modal.Title>Transaction Details</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Transaction details={this.state.transactionDetails} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleModalClose}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}

export default TransactionTable
