import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import dataReducer from './reducers/dataReducer'
import settingsReducer from './reducers/settingsReducer'

const appReducer = combineReducers({data: dataReducer, settings: settingsReducer})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
