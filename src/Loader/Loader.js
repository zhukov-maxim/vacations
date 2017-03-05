import React, { Component } from 'react';
import './Loader.less';

class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <div className="loader__bounce loader__bounce_1"></div>
        <div className="loader__bounce loader__bounce_2"></div>
        <div className="loader__bounce loader__bounce_3"></div>
      </div>
    );
  }
}

export default Loader;

Loader.propTypes = {
}
