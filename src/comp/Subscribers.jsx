import React from 'react';
const blockstack = require('blockstack');

export default class Subscriber  extends React.Component {

  constructor(props) {
    super(props)
    
    this.onAddSubscriber = this.onAddSubscriber.bind(this)
  }
  
  onAddSubscriber(evt) {
    evt.preventDefault()
    this.addSubscriber(this.input.value)
    return false; 
  }

  async addSubscriber(newSubscriber) {
    const keyData = await blockstack.getFile('key.json', {
        username: newSubscriber,
        decrypt: false
    })
    console.log(keyData)
    this.props.onSubscriberAdded({ 
      username: newSubscriber, 
      publicKey: JSON.parse(keyData) 
    })
  }

    render() {
        const userNames = this.props.subscribers.map(subscriber => {
            return (
                <li key={subscriber.username}>{subscriber.username}</li>
            );
        });

        return (
            <form onSubmit={this.onAddSubscriber}>
                <h3>Add friend</h3>
                <input name="username" ref={element => this.input = element} defaultValue="Enter Blockstack.id" />
                <button type="submit">Add</button>
                <ul>
                    {userNames}
                </ul>
				<div className="container">
                    <h3>Remove all friends</h3> 
                    <a className="button is-danger" onClick={this.props.removeAllSubscribers}>x</a>
				</div>
            </form>
        );
    }
}
