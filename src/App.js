import React from 'react';
import { Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import SignInPage from './pages/sign-in/sign-in-page';
import AccountPage from './pages/account/account-page';

function App() {
  return (
    <Switch>
      <Route exact path='/anz-wholesale/' component={SignInPage} />
      <Route exact path='/anz-wholesale/account' component={AccountPage} />
    </Switch>
  );
}

export default App;
