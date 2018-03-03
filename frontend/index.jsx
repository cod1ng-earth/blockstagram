import './css/main.scss';

import React from 'react';
import {render} from 'react-dom';
import SigninButton from './comp/SigninButton.jsx';

class App extends React.Component {
  render () {
    return <section className="section">
    <div className="container">
      <h1 className="title">
        Hello World
      </h1>
      <p className="subtitle">
        My first website with <strong>Bulma</strong>!
        <SigninButton />
      </p>
    </div>
  </section>;
  }
}

render(<App/>, document.getElementById('app'));


