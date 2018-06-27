import React, { Component } from 'react';

class Transaction extends Component {
    constructor(props) {
        super(props);
        this.intl = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    }
    
    render() {
        return (
            <div>
                <div className="itemBox container-fluid">
                    <div className="row rowAtts">
                        <div className="col-xs-4 col-sm-4 col-md-3 col-xl-2">
                            <p>{this.props.date}</p>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-5 col-xl-6" style={{textAlign: 'left'}}>
                            <p>{this.intl.format(this.props.balance)}</p>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-xl-4" style={{textAlign: 'right'}}>
                            <p style={{color: /^\+\$\d*/.test(this.props.amount) ? 'green' : 'red'}}>{this.props.amount}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Transaction;