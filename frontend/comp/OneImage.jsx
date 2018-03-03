import React from 'react';

class OneImage extends React.Component {

    render() {
        return <div class="tile is-8">{/* !--- We need to figure out a way to change class based on the width of the image" --*/}
            <p><img src={value} /></p>
          </div>
 
    }

}

export default OneImage;