import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './account-component.scss';

class AccountAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountname: '',
            accounttype: '',
            accountdate: [],
            error: null
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        //console.log(name + ':' + value);
        this.setState({ [name]: value })
    }

    onChangeAlphaNumericInput = e => {
        const { name, value } = e.target;
        const regex = /^[0-9a-zA-Z]+$/; //this will admit letters, numbers and dashes
        if (value.match(regex) || value === "") {
            this.setState({ [name]: value })
        }else{
            return false;
        }
    }
    render() {
        return (
            <div className="account-add-form">
                <form method="post">
                    <div className="row">
                        <div className="col-md-4">
                            <input type="text" className="form-control" name="accountname" placeholder="Name" label="Name" value={this.state.accountname} onChange={this.onChangeAlphaNumericInput} required />
                        </div>
                        <div className="col-md-4">
                            <select name="accounttype" className="form-select" onChange={this.handleChange} required>
                                <option value="">-- Select Account Type</option>
                                <option value="savings">Saving Account</option>
                                <option value="creditcard">Credit Card</option>
                                <option value="debitcard">Debit Card</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> Add New Account</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AccountAdd;