import React from 'react';
import {Redirect} from 'react-router-dom';
import './account-page.scss';

import Header from '../../components/header/header-component';
import Account from '../../components/account/account-component';
import Footer from '../../components/footer/footer-component';

const AccountPage = () => {
    if (!localStorage.getItem('anzuser')) {
        return <Redirect to='/anz-wholesale/' />
    }
    return (        
        <div>
            <Header />
            <h1>Accounts</h1>
            <Account />
            <Footer />
        </div>       
    );
}
export default AccountPage;