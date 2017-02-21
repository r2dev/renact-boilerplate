import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'


import Home from './Home'
const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  }
]
const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App routes={routes} initialData={preloadedState} />
    </Router>
  </Provider>
  ,
  document.getElementById('app')
)
