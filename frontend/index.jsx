import './css/main.scss';
import React from 'react';
import {render} from 'react-dom';
import NavBar from './comp/NavBar.jsx';
import ImageCollection from './comp/ImageCollection.jsx';
import ResetButton from './comp/ResetButton.jsx';
import Uploader from './comp/Uploader.jsx';
import Subscribers from './comp/Subscribers.jsx';
import OneImage from './comp/OneImage.jsx';

const blockstack = require( 'blockstack' );
const { getPublicKeyFromPrivate } = require('blockstack');

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      userData: null,
      loggedIn: false,
      index: {
        imagePaths: []
      },
      images: []
    }
  }

  componentDidMount() {
    if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn().then((data) => {
        console.dir(data)
        this.setupUser()
        this.setupKey()
        
      })
    } else if (blockstack.isUserSignedIn()) {
      console.log('Signed In')
      this.setupUser()
    }
  }

  setupUser() {
    const userData = blockstack.loadUserData();
    this.setState({
      userData: userData,
      loggedIn: true
    });

    blockstack.getFile('index.json').then(data => {
      if (data && !(data instanceof ArrayBuffer)) {
        console.log(data)
        let index = JSON.parse(data)
        if (!index.imagePaths) {
          index.imagePaths = []
        }
        this.setState({ index: index })
      }
    })
      .then(() => {
        let promises = this.state.index.imagePaths.map((path) => {
          return this.fetchFile(path)
        })
        return Promise.all(promises)
      })
      .then((images) => {
        this.setState({ images: images})
      })
      .catch((e) => {
        console.error(e)
      })
  }

  setupKey() {
      const publicKey = getPublicKeyFromPrivate(blockstack.loadUserData().appPrivateKey)
      blockstack.putFile('key.json', JSON.stringify(publicKey))
          .then(() => {
              console.log("public key saved");
              console.log(JSON.stringify(publicKey))
          })
          .catch(e => {
              console.log(e);
          });
  }

  fetchFile(path) {
    return blockstack.getFile(path)
  }

  updateIndexAndImages(path, image) {
    let index = [...this.state.index.imagePaths, path]
    let images = [...this.state.images, image]

    blockstack.putFile('index.json', JSON.stringify(index))
      .then(() => {
        console.log('Index.json uploaded')
        this.setState({ index, images })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  render () {
    return <div>
    
    <NavBar userData={this.state.userData}/>
  
    <section className="section">
      <div className="container">
        <Uploader updateIndexAndImages={this.updateIndexAndImages.bind(this)}/>
        <ResetButton />
      </div>
    </section>

    <section className="section">
      <div className="container">
          { this.state.loggedIn ? <Subscribers/> : '' }
      </div>
    </section>
    
    <section className="section">
      <div className="container">
        <div className="columns imagewall">
        { this.state.images.map((image, index) => {
          return (<OneImage key={index} img={image} />);
        })} 
        </div>
        
      </div>
    </section>

    </div>
    ;
  }
}

render(<App/>, document.getElementById('app'));


