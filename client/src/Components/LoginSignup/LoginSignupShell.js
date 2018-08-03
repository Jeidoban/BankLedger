import React, { Component } from 'react';
import LoginSignupSubmit from './LoginSignupForm';
import './LoginSignup.css';

class LoginSignupShell extends Component {
    constructor(props) {
        super();
        this.state = {
            signupErrors: null, // Errors returned by a response.
            loginErrors: null,
        }

        this.handleLoginSignup = this.handleLoginSignup.bind(this);
        this.setErrorsToNull = this.setErrorsToNull.bind(this);
        this.handleSignupLogin = React.createRef();
    }

    setErrorsToNull() {
        this.setState({signupErrors: null, loginErrors: null});
    }

    // Connects to the api for logging in and signing up. Takes in
    // data: username and password information, and a boolean
    // deciding whether it is a login or a signup.
    handleLoginSignup(data, isSignup) {
        let options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };

        if (isSignup) {
            fetch("/projects/bank-ledger/api/createUser", options)
                .then(res => res.json())
                .then(payload => {
                    if (payload.message) { // If signup is successful...
                        console.log(payload.message);
                        alert("Account successfully Created");
                        this.handleSignupLogin.current.handleSignupLoginClicked();
                    } else { // If signup returned errors...
                        this.setState({signupErrors: payload});
                    }
                });
        } else {
            fetch("/projects/bank-ledger/api/login", options)
                .then(res => res.json())
                .then(payload => {
                    if (payload.token) { // If login was successful...
                        this.props.setSession(payload);
                    } else { // if login returned errors...
                        this.setState({loginErrors: payload});
                    }
                }).catch(() => alert("An unknown error occured."));
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 col-lg-3 col-xl-3"></div>
                        <div className="col-md-8 col-lg-6 col-xl-6">
                            <div className="jumbotron loginShell">
                                <LoginSignupSubmit 
                                ref={this.handleSignupLogin}
                                handleLoginSignup={this.handleLoginSignup} 
                                signupErrors={this.state.signupErrors} 
                                loginErrors={this.state.loginErrors}
                                setErrorsToNull={this.setErrorsToNull}
                                />
                            </div>
                        </div>
                        <div className="col-md-2 col-lg-3 col-xl-3"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginSignupShell;