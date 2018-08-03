import React, { Component } from 'react';
import './Ledger.css';
import Transaction from './Transaction';

class LedgerShell extends Component {
    constructor(props) {
        super();
        this.intl = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
        this.buttonBlue = { backgroundColor: '#8BA6A9', borderColor: '#8BA6A9' };
        this.state = {
            balance: '',
            withdrawAmount: 0,
            depositAmount: 0,
            withdrawClicked: false,
            transactions: []
        };

        this.withdrawOrDepositUI = this.withdrawOrDepositUI.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.depositOrWithdrawClicked = this.depositOrWithdrawClicked.bind(this);
    }

    componentDidMount() {
        let options = {
            method: "POST",
            body: JSON.stringify(this.props.tokenId),
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch("api/getBalance", options)
            .then(res => res.json())
            .then(payload => {
                if (payload.message) { // If the token isn't valid...
                    alert(payload.message);
                } else { // If it is...
                    this.setState({ balance: this.intl.format(payload.balance), transactions: payload.transactions });
                }
            }).catch(() => alert("An unknown error occured."));
    }

    depositOrWithdrawClicked(event) {
        let regex = /^[0-9]\d*(()?(\.\d{0,2})?)$/;
        let url = this.state.withdrawClicked ? "/api/makeWithdrawl" : "/api/makeDeposit";
        let options = {
            method: "PUT",
            body: JSON.stringify({
                [event.target.name]: this.state[event.target.name],
                ...this.props.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (!regex.test(this.state[event.target.name])) {
            alert("Incorrect Format!");
        } else {
            fetch(url, options)
                .then(res => res.json())
                .then(payload => {
                    if (payload.message) { // If the token or money format isn't valid...
                        alert(payload.message);
                    } else { // if it is...
                        this.setState({ balance: this.intl.format(payload.balance), transactions: [...this.state.transactions, payload] });
                    }
                }
                ).catch(() => alert("An unknown error occured."));
        }
    }

    handleChangeInput(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    // The input where the user enters a number.
    withdrawOrDepositUI() {
        return (
            <div className="form-group">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                    </div>
                    <input
                        name={this.state.withdrawClicked ? "withdrawAmount" : "depositAmount"}
                        value={this.state.withdrawClicked ? this.state.withdrawAmount : this.state.depositAmount}
                        onChange={this.handleChangeInput}
                        type="number"
                        className="form-control"
                        placeholder={this.state.withdrawClicked ? "Enter withdrawl amount here..." : "Enter deposit amount here..."}>
                    </input>
                    <div className="input-group-append">
                        <button
                            onClick={this.depositOrWithdrawClicked}
                            name={this.state.withdrawClicked ? "withdrawAmount" : "depositAmount"}
                            className="btn btn-outline-secondary"
                            type="button">
                            {this.state.withdrawClicked ? "Make Withdrawl" : "Make Desposit"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-md-10 col-lg-10 col-xl-10">
                            <div className="jumbotron loginShell">
                                <div className="row">
                                    <div className="col-9">
                                        <h2 className="balanceText">Balance: {this.state.balance}</h2>
                                    </div>
                                    <div className="col-3 logoutButton">
                                        <button onClick={() => this.props.destroySession()} className="btn btn-primary logoutButton">Log Out</button>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-5 col-md-4 col-xl-3">
                                        <div className="group">
                                            <div className="btn-group" role="group">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    style={!this.state.withdrawClicked ? this.buttonBlue : {}}
                                                    onClick={() => this.setState({ withdrawClicked: false })}>
                                                    Deposit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    style={this.state.withdrawClicked ? this.buttonBlue : {}}
                                                    onClick={() => this.setState({ withdrawClicked: true })}>
                                                    Withdraw
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-7 col-md-8 col-xl-9">
                                        {this.withdrawOrDepositUI()}
                                    </div>
                                </div>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-xs-4 col-sm-4 col-md-3 col-xl-2">
                                            <h5>Date</h5>
                                        </div>
                                        <div className="col-xs-4 col-sm-4 col-md-5 col-xl-6" style={{ textAlign: 'left' }}>
                                            <h5>Balance</h5>
                                        </div>
                                        <div className="col-xs-4 col-sm-4 col-md-4 col-xl-4" style={{ textAlign: 'right' }}>
                                            <h5>Amount</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="ledgerItemHolder">
                                    {this.state.transactions.map((item) => <Transaction key={item.id} date={item.date} balance={item.balance} amount={item.amount} />).reverse()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LedgerShell;