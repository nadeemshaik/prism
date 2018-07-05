import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';

const IMAGE_LOADING_START = {isLoading: true};
const IMAGE_LOADING_END = {isLoading: false};

const renderPlaceHolder = className => {
  return <FontAwesomeIcon className={className} icon={faImage} size="3x"/>;
};

class ImageTag extends PureComponent {
  constructor(props) {
    super(props);
    this.state = IMAGE_LOADING_START;
    this.loadImage(props.src);
  }

  componentDidUpdate(prevProps) {
    if (this.props.src !== prevProps.src) {
      this.loadImage(this.props.src);
    }
  }

  isImageLoading = () => {
    this.setState(IMAGE_LOADING_START);
  }

  imageLoadComplete = () => {
    this.setState(IMAGE_LOADING_END);
  };

  loadImage = src => {
    const image = new Image();
    image.onload = this.imageLoadComplete;
    image.src = src;
    if (!image.complete) {
      this.isImageLoading();
    }
  }

  renderImage = () => {
    const {props} = this;
    return <img src={props.src} className={props.className} alt="image" style={props.style} />;
  }

  render() {
    const {props} = this;
    return this.state.isLoading ? renderPlaceHolder(props.placeholderClass) : this.renderImage();
  }
}

ImageTag.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  placeholderClass: PropTypes.string,
};

ImageTag.defaultProps = {
  className: '',
  placeholderClass: '',
};

export default ImageTag;
