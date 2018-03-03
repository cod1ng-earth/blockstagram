import './css/main.scss';
//import * as modules from './modules';

const blockstack = require('blockstack');
import md5 from 'md5'

$(() => {
  const $container = $('.container');
  $('#signin-button').on('click', (e) => {
    e.preventDefault()
    blockstack.redirectToSignIn();
  })

  if (blockstack.isSignInPending()) {
    blockstack.handlePendingSignIn().then((data) => {
      console.log(data)
      setupUser()
    })
  }

  $('#reset').on('click', (e) => {
    blockstack.putFile('index.json')
  })

  let index = {
    images: []
  }

  function setupUser() {
    $('#signin-button')[0].style.display = 'none'

    blockstack.getFile('index.json').then((data) => {
      if (data && !(data instanceof ArrayBuffer)) {
        console.log(data)
        index = JSON.parse(data)
      }
    })

  }

  let file = $('#file-upload')[0]

  $('#file-submit').on('click', (e) => {
    e.preventDefault()

    let filereader = new FileReader()

    filereader.onload = (event) => {
      let result = event.target.result

      let span = document.createElement('span')
      span.innerHTML = `<img src="${result}">`

      $('#image')[0].insertBefore(span, null)

      let path = 'images/' + md5(result)

      blockstack.putFile(path, result)
        .then((e) => {
          console.log(e)

          index.images.push(path)

          return blockstack.putFile('index.json', JSON.stringify(index))

        })
        .then((e) => {
          console.log(e)
        })
        .catch((e) => {
          console.error(e)
        })
    }

    filereader.readAsDataURL(file.files[0])


    console.dir(file)

  })

});
