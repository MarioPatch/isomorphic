import fs from 'fs';
import express from 'express';
import ReactDomServer from 'react-dom/server';
import React from 'react';

import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';
import { createStore } from '../store/createStore';
import routes from '../lib/routes';
import {increment, decrement} from '../action/counter';

const __dirname = fs.realpathSync('.');

fs.readFile(__dirname+'/html/index.html', (err, html) => {
  if (err) throw err;
  let app = express();
  html = html.toString();

  app.use('/', express.static(__dirname + '/public'));
  app.use('/favicon.ico', express.static(__dirname + '/public/img/favicon.ico'));
  app.get('*', (req, res) => {
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
      res.type('html');
      let {store} = createStore();

      store.dispatch(increment());
      store.dispatch(increment());
      store.dispatch(decrement());
      store.dispatch(increment());

      const component = (
        <Provider store={store} >
          <RouterContext {...renderProps}/>
        </Provider>
      );

      html = html
        .replace('<!-- APP -->', ReactDomServer.renderToString(component))
        .replace('<!-- SCRIPT_REACT -->', 'window.initialState = ' + JSON.stringify(store.getState()));
      res.status(200).send(html);
    });
  });

  app.listen('3000');
});
