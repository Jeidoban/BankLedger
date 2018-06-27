import React, { Component } from 'react';
import './App.css';
import LoginSignupShell from './Components/LoginSignup/LoginSignupShell';
import LedgerShell from './Components/Ledger/LedgerShell';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      id: -1
    };
    this.setSession = this.setSession.bind(this);
    this.destroySession = this.destroySession.bind(this);
  }

  // Sets token and id
  setSession(session) {
    this.setState({token: session.token, id: session.id});
  }

  // Destroys token and id
  destroySession() {
    this.setState({token: '', id: -1});
  }

  render() {
    return (
      <div className="App">
        {(this.state.id <= -1) ? <LoginSignupShell setSession={this.setSession}/> : <LedgerShell destroySession={this.destroySession} tokenId={this.state} />}
      </div>
    );
  }
}

export default App;
