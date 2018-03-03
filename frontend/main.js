import './css/main.scss';
//import * as modules from './modules';

import * as blockstack from 'blockstack'


$(() => {
    const $container = $('.container');
    $('#signin-button').on('click',(evt) => {
        evt.preventDefault();
        blockstack.redirectToSignIn();        
      })
});