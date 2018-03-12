import React from 'react';
import * as blockstack from 'blockstack'

export default class ResetButton  extends React.Component {

  reset (evt) {
      evt.preventDefault();
      // Resets index file. TODO: Images are still stored!
      blockstack.putFile('index.json').then( () => {
        window.location.reload()
      })
      
  }
  render() {
    return (
      <button onClick={this.reset} id="reset" className="button is-primary">Reset</button>
    );
  }
}