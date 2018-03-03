import React from 'react';
import * as blockstack from 'blockstack'

class SigninButton  extends React.Component {

  onClick (evt) {
      evt.preventDefault();
      blockstack.redirectToSignIn();  
  }

  render() {
    return (
      <a onClick={this.onClick} className="button is-primary">Sign in</a>
    );
  }
}

export default SigninButton;
