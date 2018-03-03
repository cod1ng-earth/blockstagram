import React from 'react';
import * as blockstack from 'blockstack'

class SigninButton  extends React.Component {

  onCl (evt) {
      evt.preventDefault();
      blockstack.redirectToSignIn();  
  }

  render() {
    return (
        <a href="" id="signin-button" className="button is-primary" onClick={this.onCl}>sign in</a>
    );
  }
}

export default SigninButton;