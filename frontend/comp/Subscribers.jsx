import React from 'react';
import * as blockstack from 'blockstack'
import md5 from 'md5'

export default class Subscriber  extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
                    subscribers: []
                }
    }

    componentWillMount() {

        blockstack.getFile('subscriber.json')
            .then((data) => {
                this.setState({subscribers: Array.from(JSON.parse(data))})
            })
    }

    addSubscriber (evt) {
        evt.preventDefault();

        let input = this.input.value

        let subscribers = this.state.subscribers
        subscribers.push(input)

        blockstack.putFile('subscriber.json', JSON.stringify(subscribers))
            .then(() => {
                this.setState({subscribers})
            })
        console.log(input)
        console.log(this.state)
    }

    render() {
        var userNames = this.state.subscribers.map(function (userName) {
            return (
                <li>{userName}</li>
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
