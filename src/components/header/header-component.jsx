import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import './header-component.scss';


const Header = () => {

    const logOut = () => {
        localStorage.removeItem('anzuser');
    };


    const users = JSON.parse(localStorage.getItem('anzuser'));
    return (
        <div className="header">
            <div className="row">
                <div className="col-md-6 fs-3 logotxt">ANZ</div>
                <div className="col-md-6 text-end welcometxt"><span className="fw-bolder">Welcome {users.name}</span> |  <a href="/anz-wholesale/" onClick={logOut}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></a></div>
            </div>
        </div>
    )

}

export default Header;