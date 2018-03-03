import React from 'react';
import * as blockstack from 'blockstack'
import md5 from 'md5'

export default class Uploader  extends React.Component {

  upload (evt) {
    evt.preventDefault();

    let input = this.input
    let file = input.files[0]

    this.readFile(file)
    
    console.dir(input)
  }

  readFile(file) {
    let filereader = new FileReader()

    filereader.onload = (event) => {
      let result = event.target.result

      let path = 'images/' + md5(result)
      this.uploadImageAndUpdateIndex(path, result)
    }

    filereader.readAsDataURL(file)
  }

  uploadImageAndUpdateIndex(path, result) {
    blockstack.putFile(path, result)
      .then((e) => {
        console.log(e)

        this.props.updateIndexAndImages(path, result)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  render() {
    return (
        <div>
            <input type="file" accept=".png, .jpg, .jpeg" ref={element => this.input = element}/>
            <button onClick={this.upload.bind(this)}>Upload</button>
        </div>
    );
  }
}
