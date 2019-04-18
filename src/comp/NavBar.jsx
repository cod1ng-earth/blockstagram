import React from 'react';

import SigninButton from './SigninButton.jsx';
import bsLogo from '../img/blockstagram.png';
import bsLogoMobile from '../img/blockstagram_mobile.png';
export default class NavBar extends React.Component {

    render() { 
        return (
        <nav className="navbar is-white" role="navigation" aria-label="main navigation">
            <div className="navbar-brand is-pulled-left">
                <a className="navbar-item">
                    <img src={bsLogo} className="is-hidden-mobile" alt=""/>
                    <img src={bsLogoMobile} className="is-hidden-tablet" alt=""/>
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
