import React from 'react';
export default ImageCollection;

class ImageCollection extends React.Component {

render() {
    var json = {"images":{"imgdata":"lsfoasdfoij"}};
    var arr = [];
    Object.keys(json).forEach(function(key) {
      arr.push(json[key]);
    });
    return     <section class="section timeline">
      <div class="container">	{arr.map(item => <OneImage key={item.index} value={item.imgdata} />)}
	  </div>
	  </section>
  }
}
