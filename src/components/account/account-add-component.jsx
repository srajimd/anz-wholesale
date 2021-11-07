import React from 'react';
import {withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


import { connect } from 'react-redux';
import { addAccountItem } from '../../redux/account/account-action';

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
    handleSubmit = async e => {
        e.preventDefault();

        if(this.state.accountname!=='' && this.state.accounttype!==''){       
      
            let params =  { 
                "id": (this.props.accountItems.length+1),           
                "name": this.state.accountname, 
                "accounttype": this.state.accounttype
            };

            //console.log(params);

            this.props.addAccountItem(params);
           
            this.setState({
                accountname:'',
                accounttype:''
            })

            //return <Redirect to='/anz-wholesale/account' />
            this.props.history.push('/anz-wholesale/account');
        }
        return false;
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
                            <select name="accounttype" id="accounttype" className="form-select" onChange={this.handleChange} value={this.state.accounttype} required>
                                <option value="">-- Select Account Type</option>
                                <option value="savings">Saving Account</option>
                                <option value="creditcard">Credit Card</option>
                                <option value="debitcard">Debit Card</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-primary" onClick={this.handleSubmit}><FontAwesomeIcon icon={faPlus} /> Add New Account</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = ({ account: {accountItems} }) => ({
    accountItems
});

const mapDispatchToProps = dispatch => ({
    addAccountItem: aItem => dispatch(addAccountItem(aItem))
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountAdd));

//export default withRouter(AccountAdd);