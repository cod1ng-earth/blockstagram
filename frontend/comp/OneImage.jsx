import React from 'react';

export default class OneImage extends React.Component {
    
    constructor(props) {
        super(props);
        this.img = props.img;
        //console.log(this.img);
    }

    render() {
        return <div className="">{/* !--- We need to figure out a way to change class based on the width of the image" --*/}
                <img src={this.img} ref={(img) => { this.foo = img; }}/>
          </div>
    }

    componentDidMount() {
        this.foo.onload = () => {   
            console.log( this.foo.width + ", " + this.foo.height );
        };
    }
}