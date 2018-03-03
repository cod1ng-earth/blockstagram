import './css/main.scss';
import './font/fontello.eot';
import React from 'react';
import {render} from 'react-dom';
import NavBar from './comp/NavBar.jsx';

class App extends React.Component {
  render () {
    return <div>
    <NavBar />
  
    <section className="section">
      <div className="container">
        <input type="file" id="file-upload" accept=".png, .jpg, .jpeg" />
        <button id="file-submit">Upload</button>

          <div id="image"></div>
          <button id="reset">Reset</button>
      </div>
    </section>
    
    <section className="section timeline">
      <div className="container">			
        <div className="tile is-parent">
          <div className="tile is-8">
            <p>img</p>
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


