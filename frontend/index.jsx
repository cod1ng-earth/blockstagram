import './css/main.scss';
import './font/fontello.eot';
import React from 'react';
import {render} from 'react-dom';
import NavBar from './comp/NavBar.jsx';
import ImageCollection from './comp/ImageCollection.jsx';
import ResetButton from './comp/ResetButton.jsx';
import Uploader from './comp/Uploader.jsx';
import Subscribers from './comp/Subscribers.jsx';

const blockstack = require( 'blockstack' );
class App extends React.Component {

  constructor() {
    super()
    this.state = {
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
        console.log(data)
        this.setupUser()
        this.setState({loggedIn: true})
      })
    }
    if(blockstack.isUserSignedIn()) {
      console.log('Signed In')
      this.setupUser()
      this.setState({loggedIn: true})
    }
  }

  setupUser() {
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
    
    <NavBar loggedIn={this.state.loggedIn}/>
  
    <section className="section">
      <div className="container">
        <Uploader updateIndexAndImages={this.updateIndexAndImages.bind(this)}/>
        <ResetButton />
      </div>

      <div className="images">
        { this.state.images.map((image, index) => {
          return (<img key={index} src={image} /> )
        })}
      </div>

    </section>

    <section className="section">
      <div className="container">
        <Subscribers/>
      </div>
    </section>
    
    <section className="section timeline">
      <div className="container">			
        <div className="tile is-parent">

		  <ImageCollection />
		
        <div className="tile is-8">
            <p><img src={require("./img/benjamin-voros-365387-unsplash.jpg")} /></p>
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
      </div>
    </section>

    </div>
    ;
  }
}

render(<App/>, document.getElementById('app'));


