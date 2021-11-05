import React from 'react';

import './header-component.scss';


const Header = () => {
    
    const logOut = () => {
        localStorage.removeItem('anzuser');
    };

   
    const users = JSON.parse(localStorage.getItem('anzuser'));
    return (
        <div className="header">
            <div className=""></div>
            <div className="">Welcome {users.name} |  <a href="/anz-wholesale/" onClick={logOut}>Logout</a></div>
        </div>
    )
    
}

export default Header;