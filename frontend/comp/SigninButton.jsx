import React from 'react';
import * as blockstack from 'blockstack'

class SigninButton  extends React.Component {

  onCl (evt) {
      evt.preventDefault();
      blockstack.redirectToSignIn();  
  }

  render() {
    return (
      <a onClick={this.onCl} className="button is-primary navbar-item">sign in</a>
    );
  }
}

export default SigninButton;
