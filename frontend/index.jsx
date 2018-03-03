import './css/main.scss';
import './font/fontello.eot';
import React from 'react';
import {render} from 'react-dom';
import NavBar from './comp/NavBar.jsx';
import ImageCollection from './comp/ImageCollection.jsx';

class App extends React.Component {
  render () {
    return <div>
    <NavBar />
    <section className="section">
      <div className="container">
        
      </div>
    </section>
    
    <section className="section timeline">
      <div className="container">			
        <div className="tile is-parent">
		
		<ImageCollection />
		
          <div className="tile is-8">
            <p><img src={require("./img/benjamin-voros-365387-unsplash.jpg")} /></p>
          </div>
          <div className="tile is-4">
            <p>img</p>
          </div>
        </div>
        <div className="tile is-parent">
          <div className="tile is-4">
            <p>img</p>
          </div>
          <div className="tile is-8">
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


