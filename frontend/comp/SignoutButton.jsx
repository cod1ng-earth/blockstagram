import React from 'react';
import * as blockstack from 'blockstack'

export default class SignoutButton  extends React.Component {

  onCl (evt) {
      evt.preventDefault();
      blockstack.signUserOut();  
  }

  render() {
    
    return (
      <a onClick={this.onCl} className="button is-primary">
        Sign out &nbsp; <strong>{ this.props.userData.username }</strong>
      </a>
    );
  }
}