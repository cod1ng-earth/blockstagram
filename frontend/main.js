import './css/main.scss';
//import * as modules from './modules';

const blockstack = require ('blockstack');

$(() => {
    const $container = $('.container');
    $('#signin-button').on('click',() => {
        blockstack.redirectToSignIn();
        return false;
      })
});