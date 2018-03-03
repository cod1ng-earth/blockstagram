import React from 'react';

export default class OneImage extends React.Component {

    constructor(props) {
        super(props);
        this.img = props.img;
    }
    render() {
        return <div className="tile is-8">{/* !--- We need to figure out a way to change class based on the width of the image" --*/}
            <p><img src={this.img.imgdata} /></p>
          </div>
    }
}