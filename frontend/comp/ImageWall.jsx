import React from 'react';
import classnames from 'classnames';
const blockstack = require( 'blockstack' );


class OneImage extends React.Component {

    constructor() {
       super();
       this.state = { imageData: null };
    }

    componentWillMount() {
      blockstack.getFile(this.props.path, { username: this.props.username }).then((imageData) => {
          this.setState({ imageData });
      })
    }

    render() {
        return (
        <div className="card">
            <div className="card-header">
                <div className="card-header-title">
                    some title
                </div>
            </div>

            <div className="card-image">
              <figure className={ classnames('image', { loading: !this.state.imageData }) }>
                <img src={this.state.imageData || 'img/loading.gif'} alt="" ref={(img) => { this.foo = img; }}/>
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
        const style = this.props.show ? {} : { display: 'None'};
        return (<div className="imagewall" style={style}>
            { this.props.imageInfos.map((imageInfo, index) => {
                return (<OneImage  key={`${imageInfo.path}-${imageInfo.username}`} path={imageInfo.path} username={imageInfo.username} />);
            })} 
        </div>)
    }
}
