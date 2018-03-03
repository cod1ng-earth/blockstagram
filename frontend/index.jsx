import './css/main.scss';
import './font/fontello.eot';
import React from 'react';
import {render} from 'react-dom';
import NavBar from './comp/NavBar.jsx';
import ResetButton from './comp/ResetButton.jsx';
import Uploader from './comp/Uploader.jsx';

const blockstack = require( 'blockstack' );

import md5 from 'md5'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {
    if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn().then((data) => {
        console.log(data)
        this.setupUser()
        this.setState({loggedIn: true})
      })
    }
    if(blockstack.isUserSignedIn()) {
      console.log('Signed In')
      this.setState({loggedIn: true})
    }
  }

  setupUser() {
    blockstack.getFile('index.json').then(data => {
      if (data && !(data instanceof ArrayBuffer)) {
        console.log(data)
        index = JSON.parse(data)
      }
    })
  }

  render () {
    return <div>
    <NavBar loggedIn={this.state.loggedIn}/>
  
    <section className="section">
      <div className="container">
        <Uploader />
        <div id="image"></div>
        <ResetButton />
      </div>
    </section>
    
    <section className="section timeline">
      <div className="container">			
        <div className="tile is-parent">
          <div className="tile is-8">
            <p>img</p>
          </div>
          <div className="tile is-4">
            <p>img</p>
          </div>
        </div>
        <div className="tile is-parent">
          <div className="tile is-4">
            <p>img</p>
          </div>
          <div className="tile is-8">
            <p>img</p>
          </div>
        </div>
      </div>
    </section>
    </div>
    ;
  }
}

render(<App/>, document.getElementById('app'));


