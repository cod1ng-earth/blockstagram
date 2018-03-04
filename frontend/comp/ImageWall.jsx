import React from 'react';


class OneImage extends React.Component {
    
    render() {
        return (
        <div className="card">
            <div className="card-header">
                <div className="card-header-title">
                    some title
                </div>
            </div>

            <div className="card-image">
              <figure className="image">
                <img src={this.props.img} alt="" ref={(img) => { this.foo = img; }}/>
              </figure>
            </div>
            
            <div className="card-content">
            <div className="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href="#">#css</a> <a href="#">#responsive</a>
                <br />
                <time>11:09 PM - 1 Jan 2016</time>
            </div>
            </div>
          

        </div>
        );
        
    }

    componentDidMount() {
        this.foo.onload = () => {   
            console.log( this.foo.width + ", " + this.foo.height );
        };
    }
}

export class ImageWall extends React.Component {

    render() {
        return (<div className="imagewall">
            { this.props.images.map((image, index) => {
                return (<OneImage  key={index} img={image} />);
            })} 
        </div>)
    }
}