import './css/main.scss';
import './font/fontello.eot';
import React from 'react';
import {render} from 'react-dom';
import NavBar from './comp/NavBar.jsx';
import ImageCollection from './comp/ImageCollection.jsx';
import OneImage from './comp/OneImage.jsx';

class App extends React.Component {
  render () {
    return <div>
    <NavBar />
    <section class="section">
      <div class="container">
        
      </div>
    </section>
    
    <section class="section timeline">
      <div class="container">			
        <div class="tile is-parent">
		
		<OneImage />
		
          <div class="tile is-8">
            <p><img src={require("./img/benjamin-voros-365387-unsplash.jpg")} /></p>
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


