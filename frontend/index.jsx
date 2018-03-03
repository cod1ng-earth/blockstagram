import './css/main.scss';
import './font/fontello.eot';
import React from 'react';
import {render} from 'react-dom';
import NavBar from './comp/NavBar.jsx';

class App extends React.Component {
  render () {
    return <div>
    <NavBar />
    <section class="section">
      <div class="container">
        <h1 class="title">
          Hello World
        </h1>
        <p class="subtitle">
          My first website with <strong>Bulma</strong>!
         
        </p>
      </div>
    </section>
    
    <section class="section timeline">
      <div class="container">			
        <div class="tile is-parent">
          <div class="tile is-8">
            <p>img</p>
          </div>
          <div class="tile is-4">
            <p>img</p>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-4">
            <p>img</p>
          </div>
          <div class="tile is-8">
            <p>img</p>
          </div>
        </div>
      </div>
    </section>
    </div>
    ;
  }
}

render(<App/>, document.getElementById('app'));


