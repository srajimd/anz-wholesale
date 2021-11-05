import React from 'react';
import {Redirect} from 'react-router-dom';
import './account-page.scss';

import Header from '../../components/header/header-component';
import AccountList from '../../components/account/account-list-component';
import Footer from '../../components/footer/footer-component';

const AccountPage = () => {
    if (!localStorage.getItem('anzuser')) {
        return <Redirect to='/anz-wholesale/' />
    }
    return (        
        <div>
            <Header />
            <div className="maincontent">
                <div className="fs-3 page-title">Accounts</div>
                <div className="container">                
                    <AccountList />
                </div>   
            </div>        
            <Footer />
        </div>       
    );
}
export default AccountPage;