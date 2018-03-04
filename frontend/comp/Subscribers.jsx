import React from 'react';
import * as blockstack from 'blockstack'

export default class Subscriber  extends React.Component {

    addSubscriber(evt) {
        evt.preventDefault();
        this.props.addSubscriber(this.input.value)
    }

    render() {
        var userNames = this.props.subscribers.map((subscriber) => {
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
                <a className="button is-danger" onClick={this.props.removeAllSubscribers.bind(this)}>x</a>
            </form>
        );
    }
}
