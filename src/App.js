import React from 'react';

import moment from 'moment';
import NavBar from './comp/NavBar.jsx';
import ResetButton from './comp/ResetButton.jsx';
import Uploader from './comp/Uploader.jsx';
import Subscribers from './comp/Subscribers.jsx';
import { ImageWall } from './comp/ImageWall.jsx';
import SimpleCryptoJS from 'simple-crypto-js'

const blockstack = require('blockstack');
const { getPublicKeyFromPrivate } = require('blockstack');
const { encryptECIES, decryptECIES } = require('blockstack/lib/encryption')

window.blockstack = blockstack;

export default class App extends React.Component {

  constructor() {
    super()
    this.userSession = new blockstack.UserSession()

    this.state = {
      userData: null,
      loggedIn: false,
      index: {
        images: []
      },

      // Just the images
      images: [],
      image: [],

      // { username, path, image }
      imageFeed: [],
      subscribers: [],
      aesKey: null,
      tab: 'my',

      isLoading: false
    }
    this.setTab = this.setTab.bind(this)
    this.readSubscribersImages = this.readSubscribersImages.bind(this)
    this.onSubscriberAdded = this.onSubscriberAdded.bind(this)
    this.removeAllSubscribers = this.removeAllSubscribers.bind(this)

  }

  async componentWillMount() {
    const session = this.userSession
    if (!session.isUserSignedIn() && session.isSignInPending()) {
      const userData = await session.handlePendingSignIn()

      if (!userData.username) {
        throw new Error('This app requires a username.')
      }
      
      await this.setupUser()
      await this.setupKey()
      await this.setupSubscriber()
      window.history.pushState(null, null, '/')
    } else if (session.isUserSignedIn()) {
      console.log('Signed In')
      await this.setupUser();
      await this.setupSubscriber()
      await this.loadAESKey()
    }
  }

  async setupUser() {
    const userData = this.userSession.loadUserData();
    this.setState({
      userData: userData,
      loggedIn: true
    });

    const indexJson = await blockstack.getFile('index.json', {
      decrypt: false
    });

    console.log(indexJson)
    const data = (indexJson && !(indexJson instanceof ArrayBuffer)) 
        ? JSON.parse(indexJson)
        : { 'images': [] }
    this.setState({ index: data }, async () => {
      const promises = this.state.index.images.map(image => {
        return blockstack.getFile(image.path, {decrypt: false})
      })
  
      const images = await Promise.all(promises)
      this.setState({ images: images })
    });
    
  }

  async loadAESKey() {
    const data = await blockstack.getFile(`keys/${this.state.userData.username}`)
    if (!data) {
      this.setState({ aesKey: null })
    } else {
      let encryptedKey = JSON.parse(data)
      let decryptedKey = decryptECIES(blockstack.loadUserData().appPrivateKey, encryptedKey)
      this.setState({ aesKey: decryptedKey })
    }
  }

  async setupKey() {
    try {
      const aesKey = SimpleCryptoJS.generateRandom()
      const publicKey = getPublicKeyFromPrivate(blockstack.loadUserData().appPrivateKey)

      await blockstack.putFile('key.json', JSON.stringify(publicKey))

      console.log("public key saved");
      console.log(JSON.stringify(publicKey))

      const encryptedAesKey = encryptECIES(publicKey, aesKey)
      const username = this.state.userData.username

      await blockstack.putFile(`keys/${username}`, JSON.stringify(encryptedAesKey))

      this.setState({ aesKey })
    } catch (e) {
      console.err(e);
    }
  }

  updateIndexAndImages(path, image) {
    let index = this.state.index
    const created = moment().toISOString();
    index['images'] = [...index.images, { path, created }]
    let images = [...this.state.images, image]

    blockstack.putFile('index.json', JSON.stringify(index), {
      encrypt: false
    })
    .then(() => {
      console.log('Index.json uploaded')
      this.setState({ index, images })
    })
    .catch((e) => {
      console.error(e)
    })
  }

  updateFeed(images) {
    console.log('in update feed: ', images);
    const newImageFeed = this.state.imageFeed;
    newImageFeed.push(images);
    newImageFeed.sort((imageA, imageB) => { return imageA.created < imageB.created });
    this.setState({ imageFeed: newImageFeed });
  }

  subscriberImageLoaded(indexEntry) {
    if (!this.state.imageFeed.length) {
      return false;
    }
    return this.state.imageFeed.some((el) =>
      el.path === indexEntry.path && el.username === indexEntry.username
    )
  }

  setTab(tab) {
      this.setState({ tab })
  }

  async setupSubscriber() {
      const jsonsubscribers = await blockstack.getFile('subscribers.json')
      if (jsonsubscribers) {
        const subscribers = JSON.parse(jsonsubscribers || [])
        console.log('data returned from subscribers.json', subscribers);
        this.setState({ subscribers });
      }  else {
        this.setState({ subscribers: [] });
      }
      await this.readSubscribersImages();  
      window.setInterval(this.readSubscribersImages, 15000);
  }

  readSubscribersImages() {
    this.state.subscribers.forEach(subscriber => {
      console.log('A subscriber is', subscriber);
      this.readSingleSubscribersImages(subscriber.username);
    });
  }

  async readSingleSubscribersImages(username) {
    const indexData = await blockstack.getFile('index.json', {
      username: username,
      decrypt: false
    })
    const data = JSON.parse(indexData);
    console.log('Subscribers indexData is', indexData);
    data.images.forEach(async indexEntry => {
      if (!this.subscriberImageLoaded({ ...indexEntry, username })) {
        const imageData = await blockstack.getFile(indexEntry.path, { username, decrypt: false })
        this.updateFeed({ path: indexEntry.path, username: username, image: imageData, created: indexEntry.created }); 
      }
    })
  }

  updateIsLoading(isLoading) {
    this.setState({
      isLoading: isLoading
    });
  }

  onSubscriberAdded(subscriber) {
    const subscribers = this.state.subscribers;
    subscribers.push(subscriber);
    this.setState({ subscribers })
    this.persistSubscribers().then(() => {
      this.readSingleSubscribersImages(subscriber.username);
    });    
  }

  persistSubscribers() {
    return blockstack.putFile('subscribers.json', JSON.stringify(this.state.subscribers))
      .then(() => 'submitted subscribers.json')
      .catch(e => console.dir(e))
  }

  removeAllSubscribers() {
    blockstack.putFile('subscribers.json', '[]').then(() => {
      this.setState({ subscribers: [] });
    });
  }

  render() {
    return <div>
<NavBar userData={this.state.userData} />
      <section className="section">
      
        <div className="container is-desktop">
        
          <div className="columns blockstagram-columns">

            <div className="column is-two-thirds">
              <div className="tabs is-boxed">
                <ul>
                  <li className={this.state.tab === 'my' ? "is-active" : ''} onClick={() => this.setTab('my')}>
                      <a><i className="fas fa-image"></i> My Pictures</a>
                  </li>
                  <li className={this.state.tab === 'friends' ? "is-active" : ''} onClick={() => this.setTab('friends')}>
                      <a><i className="fas fa-image"></i>Friends Pictures</a>
                  </li>
                </ul>
              </div>

              <div className="container">
                {this.state.tab === 'my' ?
                  <ImageWall images={this.state.images} />
                  :
                  <ImageWall images={this.state.imageFeed.map(imageData => imageData.image)} />
                }
                {this.state.isLoading ?
                  <img src="img/loading.gif" alt=""/> : ''
                }
              </div>
            </div>

            <div className="column">
              <Uploader updateIndexAndImages={this.updateIndexAndImages.bind(this)} 
                        updateIsLoading={this.updateIsLoading.bind(this)} 
                        isLoading={this.state.isLoading}
              />
              <div className="container">
                <h3>Start again with a fresh wall</h3>
                <ResetButton />
              </div>

              <div className="container">
                {this.state.loggedIn ? <Subscribers
                  subscribers={this.state.subscribers}
                  onSubscriberAdded={this.onSubscriberAdded}
                  removeAllSubscribers={this.removeAllSubscribers}
                  updateFeed={this.updateFeed.bind(this)} /> : ''}
              </div>

              Made with 💙 and 🍕 in Berlin.
            Thanks to <a href="https://blockstack.org/">blockstack</a>!
          </div>



          </div>
        </div>
      </section>

    </div>
      ;
  }
}


