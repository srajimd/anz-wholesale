import React from 'react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';

import { connect } from 'react-redux';
import { addAccountItem } from '../../redux/account/account-action';

import './account-component.scss';

import AccountAdd from '../../components/account/account-add-component';

class AccountList extends React.Component {
    constructor() {
        super();
        this.state = {
            accountdata: [],
            accountItems: [],
            transactiondata: [],
            isOpen: false,
            fullscreen: true,
            thisacctname: null,
            error: null
        }
    }
    openModal = (acctid, acctname) => {
        this.getTransactions(acctid);
        this.setState({ isOpen: true, thisacctname: acctname })
    }

    closeModal = () => this.setState({ isOpen: false });

    async componentDidMount() {
        this.setState({ accountItems: [] })
        await fetch('https://g9v1e.mocklab.io/accounts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ accountdata: response });
                this.state.accountdata.map((v, i) => (
                    this.props.addAccountItem(v)
                ));

                //console.log(this.props.accountItems);

                if (!this.state.accountdata.length) {
                    throw new Error('Something went wrong ...');
                }

            })
            .catch(error => this.setState({ error }));
        //console.log(error.message)
    }

    async getTransactions(aid) {
        this.setState({
            transactiondata: []
        });
        let params = {
            "id": aid
        };
        if (aid > 2) {
            params = {
                "new": 1
            };
        }
        //console.log(params);
        await fetch('https://g9v1e.mocklab.io/transactions', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json())
            .then(response => {
                //console.log(response);
                this.setState({ transactiondata: response });
                if (!this.state.transactiondata.length) {
                    throw new Error('Something went wrong ...');
                }

            })
            .catch(error => this.setState({ error }));
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
                        {(() => {
                            if (this.props.accountItems.length > 0) {
                                return (
                                    this.props.accountItems.map((v, i) => (
                                        <tr key={i}>
                                            <td>{v.id}</td>
                                            <td>{v.name}</td>
                                            <td>{v.accounttype}</td>
                                            <td className="text-center"><FontAwesomeIcon icon={faExchangeAlt} onClick={() => this.openModal(v.id, v.name)} /></td>
                                        </tr>
                                    ))
                                )
                            } else {
                                return (
                                    <tr>
                                        <td colSpan="4">No account found</td>
                                    </tr>
                                )
                            }

                        })()}
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
                                {(() => {
                                    if (this.state.transactiondata.length > 0) {
                                        return (
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
                                        )
                                    } else {
                                        return (
                                            <tr>
                                                <td colSpan="7">No transaction found</td>
                                            </tr>
                                        )
                                    }
                                })()}
                            </tbody>
                        </Table>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({ account: { accountItems } }) => ({
    accountItems
});

const mapDispatchToProps = dispatch => ({
    addAccountItem: aItem => dispatch(addAccountItem(aItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);