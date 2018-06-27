import React, { Component } from 'react';
import _ from 'lodash';

class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: ''
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.sendData = this.sendData.bind(this);
        this.validateErrors = this.validateErrors.bind(this);
    }

    // Sends a copy the state (Login info) to LoginSignupForm
    sendData() {
        this.props.handleFormSubmit(_.cloneDeep(this.state));
    }

    handleChangeInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // From the errors passed through the props, this will validate each one and push
    // jsx to an array corrosponding to the errors.
    validateErrors() {
        let showErrors = [];
        let errors = this.props.errors;
        let emailFormatFailsUI = (<p key={0} className="errors">* Email has incorrect format</p>);
        let fieldsAreEmptyUI = (<p key={1} className="errors">* All fields are required</p>);
        let invalidUserOrPassUI = (<p key={2} className="errors">* Email and/or password is invalid</p>);

        if (errors) {
            if (errors.emailFormatFails) showErrors.push(emailFormatFailsUI);
            if (errors.emailIsEmpty || errors.passwordIsEmpty) showErrors.push(fieldsAreEmptyUI);
            if (errors.emailDoesntExist || errors.passwordDoesntMatch) showErrors.push(invalidUserOrPassUI);
        } 
        return showErrors;
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    {this.validateErrors()}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                        </div>
                        <input name="email" value={this.state.email} onChange={this.handleChangeInput} type="text" className="form-control" placeholder="Email" aria-label="email"></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                        </div>
                        <input name="password" value={this.state.password} onChange={this.handleChangeInput} type="password" className="form-control" placeholder="Password" aria-label="password"></input>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;