import React from 'react';
import * as blockstack from 'blockstack'

export default class SigninButton  extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    const appConfig = new blockstack.AppConfig(['store_write', 'publish_data'])
    this.userSession = new blockstack.UserSession({ appConfig })
    this.signin = this.signin.bind(this)
  }

  signin (evt) {
    evt.preventDefault();
    if (this.props.userData) {
      blockstack.signUserOut('/');
    } else {
      //const origin = window.location.origin 
      
      //blockstack.redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data']);

      //blockstack.redirectToSignIn(); //null, null, ['store_write', 'publish_data']
      this.userSession.redirectToSignIn()
    }
  }

  render() {
    const btnText = this.props.userData ? `Sign out ${this.props.userData.username}` : 'Sign in'
    return (
      <span onClick={this.signin} className="button is-primary">{btnText}</span>
    );
  }
}
