import React from 'react';
import * as blockstack from 'blockstack'
import SigninButton from './SigninButton.jsx';

export default class NavBar extends React.Component {

    render() {
        return (
        <nav className="navbar is-warning" role="navigation" aria-label="main navigation">
            <div className="navbar-brand is-pulled-left">
                <a className="navbar-item">
                <img src="img/blockstagram.png" />
                </a>
            </div>
        
            <div className="navbar-end is-pulled-right">
                <div className="navbar-item">
                     <SigninButton userData={this.props.userData} />
                </div>
            </div>
        </nav>
        );
    }

}
