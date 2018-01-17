import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DashboardContainer from './components/DashboardContainer'
import * as DataActions from './actions/data'
import * as SettingsActions from './actions/settings'

class App extends Component {

  componentDidMount = () => {
    let custAccounts = ["Checking, Savings"]
    let custId = 0
    this.settings.setDisplayAccounts(custAccounts)
    this.data.getTransactionData(custId, this.parseCustData)
  }

  parseCustData(res) {


  }

  render() {
    return (
      <div>
        <h1>App</h1>
        <DashboardContainer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    data: bindActionCreators(DataActions, dispatch),
    settings: bindActionCreators(SettingsActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(App)
