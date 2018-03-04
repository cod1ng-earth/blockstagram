import React from 'react';
import * as blockstack from 'blockstack'
import md5 from 'md5'

export default class Subscriber  extends React.Component {

    constructor(props) {
        super(props);

        this.state = { subscribers: [] }
    }

    componentWillMount() {
        blockstack.getFile('subscriber.json')
            .then((data) => {
                this.setState({subscribers: Array.from(JSON.parse(data))})
            }).catch(err => {
                console.warn("ohoh");
            })
    }

    addSubscriber (evt) {
        evt.preventDefault();

        let newSubscriber = this.input.value

        const options = { username: newSubscriber }
        blockstack.getFile('key.json', options)
            .then((data) => {
                this.persistSubscriber(newSubscriber)
            })
            .catch((e) => {
                console.log(newSubscriber + ' is no blockstagram user yet');
            })
    }

    persistSubscriber(userName) {
        let subscribers = this.state.subscribers
        subscribers.push(userName)

        blockstack.putFile('subscriber.json', JSON.stringify(subscribers))
            .then(() => {
                this.setState({subscribers})
            })
    }

    render() {
        var userNames = this.state.subscribers.map(function (userName) {
            return (
                <li key={userName}>{userName}</li>
            );
        });

        return (
            <div>
                <ul>
                    {userNames}
                </ul>
                <input name="username" ref={element => this.input = element}/>
                <button onClick={this.addSubscriber.bind(this)}>Add</button>
            </div>
        );
    }
}
