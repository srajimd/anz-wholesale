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
            fullscreen: true
        }
        this.state.accountdata = [
            {
                "id": 1,
                "name": "ANZ1234",
                "accounttype": "Savings"
            },
            {
                "id": 2,
                "name": "ANZ84343",
                "accounttype": "Credit Card"
            }
        ];
        this.state.transactiondata = [
            {

                "date": "11-06-2021",
                "desc": "Flipkart Apparel Shopping",
                "debit": "$12",
                "credit": "-",
                "balance": "$100",
                "status": "Success"
            },
            {
                "date": "11-06-2021",
                "desc": "Kannan Grocery Purchase",
                "debit": "$15",
                "credit": "-",
                "balance": "$85",
                "status": "Success"
            },
            {
                "date": "10-05-2021",
                "desc": "Fund Transfer",
                "debit": "-",
                "credit": "$10",
                "balance": "$95",
                "status": "Success"
            },
            {
                "date": "11-04-2021",
                "desc": "Fund Transfer",
                "debit": "-",
                "credit": "$10",
                "balance": "$95",
                "status": "Pending"
            },
            {
                "date": "11-02-2021",
                "desc": "Flipkart Apparel Shopping",
                "debit": "$10",
                "credit": "-",
                "balance": "$95",
                "status": "Failed"
            }
        ];
    }
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

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
                                    <td className="text-center"><FontAwesomeIcon icon={faExchangeAlt} onClick={this.openModal} /></td>
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
                            Transaction
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