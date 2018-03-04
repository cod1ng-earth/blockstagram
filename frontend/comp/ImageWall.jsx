import React from 'react';


class OneImage extends React.Component {
    
    render() {
        return (<div className=""> 
            <img src={this.props.img} ref={(img) => { this.foo = img; }}/>
        </div>)
    }

    componentDidMount() {
        this.foo.onload = () => {   
            console.log( this.foo.width + ", " + this.foo.height );
        };
    }
}

export class ImageWall extends React.Component {

    render() {
        return (<div className="columns imagewall">
            { this.props.images.map((image, index) => {
                return (<OneImage  key={index} img={image} />);
            })} 
        </div>)
    }
}