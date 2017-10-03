import { createStore as createReduxStore, combineReducers} from 'redux';
import {createHistory, createMemoryHistory} from 'history';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as allReducers from '../reducer/reducers';

const createStore = () => {
  let initialState = undefined;
  if (typeof window === 'object' && window.initialState) {
    initialState = window.initialState;
  }
  const reducers = combineReducers({
    ...allReducers,
    routing: routerReducer
  });
  const devtools = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__? window.__REDUX_DEVTOOLS_EXTENSION__() : f=>f;
  const store = createReduxStore(reducers, initialState, devtools);

  let _history;
  if (typeof window === 'object') { //client
    _history = createHistory();
  } else { //server
    _history = createMemoryHistory('/');
  }
  const history = syncHistoryWithStore(_history, store);

  return {store, history};
};

export {
  createStore
};