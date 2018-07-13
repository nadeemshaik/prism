import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';

const IMAGE_LOADING_START = {isLoading: true};
const IMAGE_LOADING_END = {isLoading: false};

const renderPlaceHolder = (className, errorMsg) => {
  return (
    <div className="imageTag__placeholder">
      <FontAwesomeIcon className={className} icon={faImage} size="3x" />
      {errorMsg ? <span className="imageTag__errorMsg">{errorMsg}</span> : null}
    </div>
  );
};

class ImageTag extends PureComponent {
  constructor(props) {
    super(props);
    this.state = IMAGE_LOADING_START;
  }

  componentDidMount() {
    this.loadImage(this.props.src);
  }

  componentDidUpdate(prevProps) {
    if (this.props.src !== prevProps.src) {
      this.loadImage(this.props.src);
    }
  }

  isImageLoading = () => {
    this.setState(IMAGE_LOADING_START);
  };

  imageLoadComplete = () => {
    this.setState(IMAGE_LOADING_END);
  };

  imageLoadError = () => {
    this.setState({errorMsg: "Error Loading Image"});
  }

  loadImage = src => {
    const image = new Image();
    image.onload = this.imageLoadComplete;
    image.onerror = this.imageLoadError;
    image.src = src;
    if (!image.complete) {
      this.isImageLoading();
    }
  }

  renderImage = () => {
    const {props} = this;
    return <img src={props.src} className={props.className} alt="asset_preview_image" style={props.style} />;
  }

  render() {
    const {props, state} = this;
    return state.isLoading ? renderPlaceHolder(props.placeholderClass, state.errorMsg) : this.renderImage();
  }
}

ImageTag.propTypes = {
  src: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  placeholderClass: PropTypes.string,
};

ImageTag.defaultProps = {
  className: '',
  placeholderClass: '',
};

export default ImageTag;
