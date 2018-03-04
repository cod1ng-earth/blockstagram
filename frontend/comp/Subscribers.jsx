import React from 'react';
import * as blockstack from 'blockstack'
import md5 from 'md5'

export default class Subscriber  extends React.Component {

    constructor(props) {
        super(props);
        this.state = { subscribers: [] }
    }

    componentWillMount() {
        blockstack.getFile('subscribers.json')
            .then((data) => {
                this.setState({subscribers: Array.from(JSON.parse(data))})
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

    readSubscribersImages () {
        this.state.subscribers.forEach(subsc => {
            blockstack.getFile('index.json', {
                username: subsc.userId,  
                app: 'Blockstagram' //see here for correct parameter names: https://github.com/blockstack/blockstack.js/blob/master/src/storage/index.js#L59
            }).then(indexData => {
                console.log(indexData);
            }).catch(err => {
                console.warn(err);
            });
        });
    }
    addSubscriber (evt) {
        evt.preventDefault();
        const newSubscriber = this.input.value

        blockstack.getFile('key.json', { 
            username: newSubscriber,  
            app: 'Blockstagram'
        }).then(key => {
            let subs = this.state.subscribers;
            subs.push({
                userId: newSubscriber,
                publicKey: key
            });
            this.setState({
                subscribers: subs
            })
            this.persistSubscribers();
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
        var userNames = this.state.subscribers.map((userInfo, index) => {
            return (
                <li key={index}>{userInfo.userId}</li>
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
