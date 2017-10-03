import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from '../store/createStore';
import { Router } from 'react-router';
import routes from '../lib/routes';
import {increment} from '../action/counter';

let {store, history} = createStore();
render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('mea')
);

store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());