import React, { Component } from 'react';
import _ from 'lodash';

class Signup extends Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            retPassword: '' // The retyped password to match the original.
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.sendData = this.sendData.bind(this);
        this.validateErrors = this.validateErrors.bind(this);
    }

    handleChangeInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

     // Sendsa copy of the state (Signup info) to LoginSignupForm
    sendData() {        
        this.props.handleFormSubmit(_.cloneDeep(this.state));
    }

    // From the errors passed through the props, this will validate each one and push
    // jsx to an array corrosponding to the errors.
    validateErrors() {
        let showErrors = [];
        let errors = this.props.errors;
        let emailFormatFailsUI = (<p key={0} className="errors">* Email format is invalid</p>);
        let fieldsAreEmptyUI = (<p key={1} className="errors">* All fields are required</p>);
        let emailAlreadyExistsUI = (<p key={2} className="errors">* Email already exists</p>);
        let passwordFailsFormatUI = (<p key={3} className="errors">* Password must have 6 characters, one uppercase and lowercase letter, and a number</p>);
        let retPasswordDoesntMatchUI = (<p key={4} className="errors">* Passwords do not match</p>);

        if (errors) {
            if (errors.emailFormatFails) showErrors.push(emailFormatFailsUI);
            if (errors.emailIsEmpty || errors.passwordIsEmpty) showErrors.push(fieldsAreEmptyUI);
            if (errors.emailAlreadyExists) showErrors.push(emailAlreadyExistsUI);
            if (errors.passwordFormatFails) showErrors.push(passwordFailsFormatUI);
            if (errors.retPasswordDoesntMatch) showErrors.push(retPasswordDoesntMatchUI);
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
                        <input 
                            name="email" value={this.state.email} 
                            onChange={this.handleChangeInput} type="text" 
                            className="form-control" placeholder="Email" 
                            aria-label="email">
                        </input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                        </div>
                        <input 
                            name="password" 
                            value={this.state.password} 
                            onChange={this.handleChangeInput} 
                            type="password" 
                            className="form-control" 
                            placeholder="Password" 
                            aria-label="password"></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                        </div>
                        <input 
                            name="retPassword" 
                            value={this.state.retPassword} 
                            onChange={this.handleChangeInput} 
                            type="password" className="form-control" 
                            placeholder="Retype Password" 
                            aria-label="retPassword"></input>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;