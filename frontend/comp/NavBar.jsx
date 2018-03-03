import React from 'react';
import * as blockstack from 'blockstack'
import SigninButton from './SigninButton.jsx';

class NavBar extends React.Component {

    render() {
        return <nav class="navbar">
        <div class="container">
        <div class="the-icons span3" title="Code: 0xe800"><i class="icon-camera-alt">&#xe800;</i></div> 
        <SigninButton />
        </div>
    </nav>
    }

}

export default NavBar;