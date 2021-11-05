import React from 'react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';

import './account-component.scss';

import AccountAdd from '../../components/account/account-add-component';

class AccountList extends React.Component {
    constructor() {
        super();
        this.state = {
            accountdata: [],
            transactiondata: [],
            isOpen: false,
            fullscreen: true,
            thisacctname:null,
            error:null
        }
    }
    openModal = (acctid, acctname) => {
        this.getTransactions(acctid);
        this.setState({ isOpen: true, thisacctname: acctname })
    }

    closeModal = () => this.setState({ isOpen: false });

    async componentDidMount(){
        await fetch('https://g9v1e.mocklab.io/accounts',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({accountdata: response});
            if(!this.state.accountdata.length){
                throw new Error('Something went wrong ...');  
            }

        })
        .catch(error => this.setState({error}));
        //console.log(error.message)
    }

    async getTransactions(aid){        
        let params =  {
            "id": aid
        };
        //console.log(params);
        await fetch('https://g9v1e.mocklab.io/transactions',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(response => {
            //console.log(response);
            this.setState({transactiondata: response});
            if(!this.state.transactiondata.length){
                throw new Error('Something went wrong ...');  
            }

        })
        .catch(error => this.setState({error}));
        //console.log(this.state.error)
    } 

    render() {

        return (
            <div className="account">
                <AccountAdd />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="col-sm-1">#</th>
                            <th>Name</th>
                            <th className="col-md-4">Account Type</th>
                            <th className="col-sm-1">Transaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.accountdata.map((v, i) => (
                                <tr key={i}>
                                    <td>{v.id}</td>
                                    <td>{v.name}</td>
                                    <td>{v.accounttype}</td>
                                    <td className="text-center"><FontAwesomeIcon icon={faExchangeAlt} onClick={() => this.openModal(v.id, v.name)}  /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

                <Modal
                    show={this.state.isOpen} onHide={this.closeModal}
                    fullscreen={this.state.fullscreen}
                    aria-labelledby="transactionlist"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="transactionlist">
                            Transaction of {this.state.thisacctname}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="col-sm-1">#</th>
                                    <th className="col-sm-1">Date</th>
                                    <th>Description</th>
                                    <th className="col-sm-1">Debit</th>
                                    <th className="col-sm-1">Credit</th>
                                    <th className="col-sm-1">Balance</th>
                                    <th className="col-md-1">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    this.state.transactiondata.map((v1, i1) => (
                                        <tr key={i1}>
                                            <td>{i1 + 1}</td>
                                            <td>{v1.date}</td>
                                            <td>{v1.desc}</td>
                                            <td>{v1.debit}</td>
                                            <td>{v1.credit}</td>
                                            <td>{v1.balance}</td>
                                            <td>{v1.status}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default AccountList;