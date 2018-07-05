import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './FullScreenPreivew.css';

//readers
import AssetReader from '../../readers/asset';

//utils
import {getAdjustedImageDimensions, getImageDimensionsByOrientation} from '../../utils/image';

//components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//constants
import {STORAGE_PATH, ROTATION_BY_ORIENTATION} from '../../constants/asset';
import {CONTROL_TYPES, CONTROL_SECTION_CLASSES, CONTROL_CLASSES, CONTROL_ICONS} from './constants/controls';



class FullScreenPreivew extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: props.currentIndex,
    };
    this.controlToIndexer = {
      [CONTROL_TYPES.LEFT]: this.decreaseIndex,
      [CONTROL_TYPES.RIGHT]: this.increaseIndex,
    };
  }

  componentDidMount() {
    this.setState({
      bodyDimensions: {
        width: this.previewBody.clientWidth,
        height: this.previewBody.clientHeight,
      },
    });
  }

  setBodyRef = previewBody => {
    this.previewBody = previewBody;
  }

  increaseIndex = () => {
    this.setState({currentIndex: this.state.currentIndex + 1});
  };

  decreaseIndex = () => {
    this.setState({currentIndex: this.state.currentIndex - 1});
  };

  renderHeader = () => {
    return (
      <div className="FullScreenPreivew__header">
        <FontAwesomeIcon icon="arrow-left" className="FullScreenPreivew__navIcon" size="1x" onClick={this.props.onClosePreview} />
      </div>
    );
  };

  renderNavControls = (controlType) => {
    return (
      <div className={`FullScreenPreivew__control-section ${CONTROL_SECTION_CLASSES[controlType]}`}>
        <div className={`FullScreenPreivew__control ${CONTROL_CLASSES[controlType]} `} onClick={this.controlToIndexer[controlType]} >
          <FontAwesomeIcon icon={CONTROL_ICONS[controlType]} className={`FullScreenPreivew__navIcon FullScreenPreivew__controlIcon`}/>
        </div>
      </div>
    );
  };

  renderControls = () => {
    const {currentIndex} = this.state;
    return (
      <div>
        {currentIndex !== 0 ? this.renderNavControls(CONTROL_TYPES.LEFT) : null}
        {currentIndex !== this.props.assets.length - 1 ? this.renderNavControls(CONTROL_TYPES.RIGHT) : null}
      </div>
    )
  };

  renderPreviewImage = () => {
    const {assets} = this.props,
      {currentIndex} = this.state,
      currentAsset = assets[currentIndex],
      orientation = AssetReader.orientation(currentAsset);
    const imageDimensions = getImageDimensionsByOrientation(currentAsset),
      adjustedDimensions = getAdjustedImageDimensions(imageDimensions, this.state.bodyDimensions, orientation);
    return <img src={`${STORAGE_PATH}/${currentAsset.src}`} className="FullScreenPreivew__asset" {...adjustedDimensions} style={{transform: ROTATION_BY_ORIENTATION[orientation]}} />;
  };

  renderBody() {
    return (
      <div className="FullScreenPreivew__body" ref={this.setBodyRef}>
        {this.state.bodyDimensions ? this.renderPreviewImage() : null}
        {this.renderControls()}
      </div>
    );
  }

  render() {
    return (
      <div className="FullScreenPreivew__container">
        {this.renderHeader()}
        {this.renderBody()}
      </div>
    );
  }
}

FullScreenPreivew.propTypes = {
  assets: PropTypes.array,
  currentIndex: PropTypes.number,
};

FullScreenPreivew.defaultProps = {
  currentIndex: 0,
};

export default FullScreenPreivew;
