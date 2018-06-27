import React, { Component } from 'react';
import Login from './Login';
import Signup from './Signup';
import './LoginSignup.css';

class LoginSignupSubmit extends Component {
    constructor(props) {
        super();
        this.state = {
            signupClicked: false,
        };
        this.login = React.createRef();
        this.signup = React.createRef();
        this.handleSignupLoginClicked = this.handleSignupLoginClicked.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleSignupLoginClicked() {
        this.setState(prevState => ({
            signupClicked: !prevState.signupClicked,
        }));
        this.props.setErrorsToNull();
    }

    // Takes in login signup information from either Login or Signup Component
    // and calls handleLoginSignup in the parent component.
    handleFormSubmit(data) {
        this.props.handleLoginSignup(data, this.state.signupClicked);
    }

    render() {
        let loginSignupForm = () => {
            return (
                <div>
                    <h3>{this.state.signupClicked ? "Signup" : "Login"}</h3>
                    <br></br>
                    {this.state.signupClicked ?
                        <Signup
                            handleFormSubmit={this.handleFormSubmit}
                            errors={this.props.signupErrors}
                            ref={this.signup}
                        /> :
                        <Login
                            handleFormSubmit={this.handleFormSubmit}
                            errors={this.props.loginErrors}
                            ref={this.login}
                        />}
                    <button type="submit" className="btn btn-primary spaceButton">Login</button>
                    <p 
                        className="mockLink" 
                        onClick={this.handleSignupLoginClicked}>{this.state.signupClicked ? 
                        "Already have an account? Login here!" : 
                        "No account? Signup here!"}
                    </p>
                </div>
            );
        }

        let loginOrSignup = this.state.signupClicked ? "signup" : "login";

        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault();
                    this[loginOrSignup].current.sendData(); // This is triggering a function in either
                                                            // in the Login or Signup component,
                                                            // that sends login or signup information 
                                                            // depending whether state.signupClicked
                                                            // is true or false.
                }}>
                    {loginSignupForm()}
                </form>
            </div>
        );
    }
}

export default LoginSignupSubmit;