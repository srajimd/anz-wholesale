import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import SignInPage from './pages/sign-in/sign-in-page';
import AccountPage from './pages/account/account-page';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path='/anz-wholesale/' component={SignInPage} />
      <Route exact path='/anz-wholesale/account' component={AccountPage} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
