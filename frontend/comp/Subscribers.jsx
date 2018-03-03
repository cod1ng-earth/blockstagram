import React from 'react';
import * as blockstack from 'blockstack'
import md5 from 'md5'

export default class Subscriber  extends React.Component {

    constructor(props) {
        super(props);

        blockstack.getFile('subscriber.json')
            .then((data) => {
                this.state = {
                    subscribers: Array.from(JSON.parse(data))
                }
            })
            .catch(() => {
                this.state = {
                    subscribers: []
                }
            })
    }

    addSubscriber (evt) {
        evt.preventDefault();

        let input = this.input.value

        let subscribers = this.state.subscribers
        subscribers.push(input)

        blockstack.putFile('subscriber.json', JSON.stringify(tempState))
            .then(() => {
                this.setState({subscribers})
            })
        console.log(input)
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <input name="username" ref={element => this.input = element}/>
                <button onClick={this.addSubscriber.bind(this)}>Add</button>
            </div>
        );
    }
}
