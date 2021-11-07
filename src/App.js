import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCurrentUser } from './redux/user/user-actions';
import { addAccountItem } from './redux/account/account-action';


import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import SignInPage from './pages/sign-in/sign-in-page';
import AccountPage from './pages/account/account-page';


class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/anz-wholesale/' component={SignInPage} />
        <Route exact path='/anz-wholesale/account' component={AccountPage} />
      </Switch>
    );
  }
}

const mapStateToProps = ({ user, account }) => ({
  currentUser: user.currentUser,
  accountItems: []
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  addAccountItem: accountItems => dispatch(addAccountItem(accountItems))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);