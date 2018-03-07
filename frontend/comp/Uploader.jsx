import React from 'react';
import * as blockstack from 'blockstack'
import md5 from 'md5'

export default class Uploader extends React.Component {

  upload (evt) {
    evt.preventDefault();

    let input = this.input
    let file = input.files[0]

    this.props.updateIsLoading(true)
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
      .then(fileUrl => {
        console.log(fileUrl);
        this.props.updateIsLoading(false)
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
            <button onClick={this.upload.bind(this)} className="button is-primary" disabled={this.props.isLoading}>Upload</button>
        </div>
    );
  }
}
