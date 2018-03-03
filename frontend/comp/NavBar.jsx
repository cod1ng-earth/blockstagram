import React from 'react';
import * as blockstack from 'blockstack'
import SigninButton from './SigninButton.jsx';
import SignoutButton from './SignoutButton.jsx';

export default class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
        <nav className="navbar is-warning" role="navigation" aria-label="main navigation">
            <div className="navbar-brand is-pulled-left">
                <a className="navbar-item">Blockstagram</a>
                
            </div>
        
            <div className="navbar-end is-pulled-right">
                <div className="navbar-item">
                    { !this.props.userData ? <SigninButton /> : <SignoutButton userData={this.props.userData} /> }
                </div>
            </div>
        </nav>
        );
    }

}
