import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Layout from '../component/layout/Layout';
import Home from '../component/page/Home';
import Page404 from '../component/page/Page404';
import Page1 from '../component/page/Page1';

const routes = 
<Router>
  <Route component={Layout}>
    <Route path='/page1' component={Page1}/>
    <Route path='/' component={Home}/>
    <Route path='*' component={Page404}/>
  </Route>
</Router>;

export default routes;