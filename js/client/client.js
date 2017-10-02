import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from '../store/createStore'
import { Router, Route } from 'react-router'
import routes from '../lib/routes'

let {store, history} = createStore();
render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('mea')
);

store.subscribe(() => {
  console.log("client");
  console.log(store.getState())
})

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });