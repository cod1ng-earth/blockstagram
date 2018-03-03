import React from 'react';
import * as blockstack from 'blockstack'

export default class Uploader  extends React.Component {

  upload (evt) {
      evt.preventDefault();
    let file = $('#file-upload')[0]
    this.readFile(file.files[0])
    
    console.dir(file)
  }

  uploadImageAndUpdateIndex(path, result) {
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

  readFile(file) {
    let filereader = new FileReader()

    filereader.onload = (event) => {
      let result = event.target.result

      let span = document.createElement('span')
      span.innerHTML = `<img src="${result}">`

      $('#image')[0].insertBefore(span, null)

      let path = 'images/' + md5(result)
      uploadImageAndUpdateIndex(path, result)
    }

    filereader.readAsDataURL(file)
  }

  render() {
    return (
        <div>
            <input type="file" id="file-upload" accept=".png, .jpg, .jpeg" />
            <button onClick={this.upload} id="file-submit">Upload</button>
        </div>
    );
  }
}