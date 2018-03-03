import React from 'react';
import * as blockstack from 'blockstack'

class SigninButton  extends React.Component {

  onCl (evt) {
      evt.preventDefault();
      blockstack.redirectToSignIn(undefined, undefined, ['store_write', 'publish_data']);
  }

  render() {
    return (
      <a onClick={this.onCl} className="button is-primary">sign in</a>
    );
  }
}

export default SigninButton;
