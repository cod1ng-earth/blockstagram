import React from 'react';
import * as blockstack from 'blockstack'

export default class ResetButton extends React.Component {

  constructor(props) {
    super(props)
    this.reset = this.reset.bind(this)

  }
  
async reset (evt) {
  evt.preventDefault();
  // Resets index file. TODO: Images are still stored!
  await blockstack.putFile('index.json', '{"images":[]}', {encrypt: false})
  window.location.reload()
}

  render() {
    return (
      <button onClick={this.reset} id="reset" className="button is-primary">Reset</button>
    );
  }
}
