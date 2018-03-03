import React from 'react';
import * as blockstack from 'blockstack'

class SignoutButton  extends React.Component {

  onCl (evt) {
      evt.preventDefault();
      blockstack.signUserOut();  
  }

  render() {
    const username = blockstack.loadUserData().username;
    return (<div>
      <span>Welcome {username}</span>
      <a onClick={this.onCl} id="signout-button" className="button is-primary">sign out</a>
    </div>
    );
  }
}

export default SignoutButton;
