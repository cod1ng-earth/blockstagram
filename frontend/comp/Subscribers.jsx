import React from 'react';
import * as blockstack from 'blockstack'

export default class Subscriber  extends React.Component {

    constructor(props) {
        super(props);
        this.state = { subscribers: [] }
    }

    componentWillMount() {
        blockstack.getFile('subscribers.json')
            .then((data) => {
                console.log('data returned from subscribers.json', data);
                this.setState({subscribers: JSON.parse(data || [])})
                this.readSubscribersImages()
            }).catch(err => {
                console.warn(err);
            })
    }

    removeAllSubscribers() {
        blockstack.putFile('subscribers.json', '[]').then(() => {
            this.setState({subscribers: []});
        });
    }

    readSingleSubscribersImages(username) {
        blockstack.getFile('index.json', {
            username: username
        }).then(indexData => {
            let data = JSON.parse(indexData);
            data.images.map((indexEntry) => { 
              blockstack.getFile(indexEntry.path, {username}).then((imageData) => {
                this.props.updateFeed({path: indexEntry.path, username: username, image: imageData, created: indexEntry.created});
              })
            });
        }).catch(err => {
            console.warn(err);
        });
    }

    readSubscribersImages () {
        this.state.subscribers.forEach(subscriber => {
            this.readSingleSubscribersImages(subscriber.username);
        });
    }

    addSubscriber (evt) {
        evt.preventDefault();
        const newSubscriber = this.input.value

        blockstack.getFile('key.json', { 
            username: newSubscriber
        }).then(keyData => {
            let subscribers = this.state.subscribers;
            subscribers.push({username: newSubscriber, publicKey: JSON.parse(keyData)});
            this.setState({subscribers})
            this.persistSubscribers();
            this.readSingleSubscribersImages(newSubscriber);
        })
        .catch(e => {
            console.log(newSubscriber + ' is no blockstagram user yet');
        })
    }

    persistSubscribers() {
        blockstack.putFile('subscribers.json', JSON.stringify(this.state.subscribers))
            .then(() => 'submitted subscribers.json')
            .catch(e => console.dir(e))
    }

    render() {
        var userNames = this.state.subscribers.map((subscriber) => {
            return (
                <li key={subscriber.username}>{subscriber.username}</li>
            );
        });

        return (
            <form onSubmit={this.addSubscriber.bind(this)}>
                
                <input name="username" ref={element => this.input = element}/>
                <button type="submit">Add</button>
            
                <ul>
                    {userNames}
                </ul>
                <a className="button is-danger" onClick={this.removeAllSubscribers.bind(this)}>x</a>
            </form>
        );
    }
}
