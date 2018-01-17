import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TransactionTable from './TransactionTable'
import * as SettingsActions from '../actions/settings'

class AccountContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      searchInput: ""
    }
  }

  handleSearchInput = (event) => {
    event.preventDefault()
    this.setState({
      searchInput: event.target.value
    })
  }

  filterTransactions = (allAccounts) => {
    //this.props.transactionData.filter(transaction => {
    //allAccounts.includes(transaction.account)
  // })
    if (this.state.searchInput) {
      //filter by search input
    }

    //return transactionData
  }

  getAccounts = () => {
    this.props.allAccounts.forEach(accountType => {
      // account component with transactionData={this.props.transactionData[accountType]}
      //pass in toggleAccountDetails
    })
  }

  toggleAccountDetails = (event) => {
    this.settings.setDisplayAccounts(event.target.innerText)
  }

  render() {
    const transactionData = this.filterTransactions(this.props.settings.allAccounts)
    const accounts = this.getAccounts()

    return(
      <div>
        <h1>AccountContainer</h1>

        <input
          type="text"
          placeholder="Search Transactions..."
          value={this.state.searchInput}
          onChange={this.handleSearchInput}
        />

        <TransactionTable transactionData={transactionData} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allAccounts: state.settings.allAccounts,
    transactionData: state.data.transactionData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    settings: bindActionCreators(SettingsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)
