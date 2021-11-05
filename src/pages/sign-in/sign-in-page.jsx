import React from 'react';
import {Redirect} from 'react-router-dom';
import './sign-in-page.scss';

import SignIn from '../../components/sign-in/sign-in-component';

const SignInPage = () => {
    if (localStorage.getItem('anzuser')) {
        return <Redirect to='/anz-wholesale/account' />
    }
    return(             
    <div className='sign-in-page'>
       <div className="sign-header">
            <h3>Sign In</h3>
            <p>Please enter your credentials to login.</p>
        </div>
       <SignIn />
    </div>
    );
}

export default SignInPage;