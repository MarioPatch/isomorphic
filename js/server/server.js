import http from 'http';
import fs from 'fs';
import express from 'express';
import ReactDomServer from 'react-dom/server';
import React from 'react';

import { Provider } from 'react-redux';
import { Route, Router, RouterContext, IndexRoute, match } from 'react-router'
import { createStore } from '../store/createStore'
import routes from '../lib/routes'
import {increment, decrement} from "../action/counter";


fs.readFile(__dirname+'/../../html/index.html', (err, html) => {
  if (err) throw err;
  let app = express();
  html = html.toString();

  app.use('/', express.static(__dirname + '/../../public'));
  app.use('/favicon.ico', express.static(__dirname + '/../../public/img/favicon.ico'));
  app.get('*', (req, res) => {
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
      res.type('html');
      let {store} = createStore();

      store.subscribe(() => {
        console.log('[server side] store suscription...');
        console.log(store.getState())
      })

      store.dispatch(increment())
      store.dispatch(increment())
      store.dispatch(decrement())
      store.dispatch(increment())

      const component = ( <Provider store={store} >
        <RouterContext {...renderProps}/>
        </Provider>);

      html = html
      .replace('<!-- APP -->', ReactDomServer.renderToString(component))
      .replace('<!-- SCRIPT_REACT -->', 'window.initialState = ' + JSON.stringify(store.getState()));
      res.status(200).send(html);
    })
  });

  app.listen('3000');
  console.log('Server running at http://127.0.0.1:3000/');
});
