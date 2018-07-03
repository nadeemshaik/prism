import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class ImageTag extends PureComponent {
  render() {
    const {props} = this;
    return (
      <img src={props.src} alt="image" style={props.style} />
    );
  }
}

ImageTag.propTypes = {
  src: PropTypes.string,
};

export default ImageTag;
