import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux'
import Routes from './routes'

const history = createHistory()

const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    router: routerReducer,
  }),
  applyMiddleware(middleware),
)

const Router = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
)

export default Router
