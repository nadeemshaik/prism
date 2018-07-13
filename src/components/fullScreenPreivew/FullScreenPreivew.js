import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//libs
import _debounce from 'lodash/debounce';
import _partial from 'lodash/partial';

//styles
import './FullScreenPreivew.css';

//readers
import AssetReader from '../../readers/asset';

//utils
import {getAdjustedImageDimensions, getImageDimensionsByOrientation} from '../../utils/image';

//components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImageTag from '../assetTags/image';

//constants
import {STORAGE_PATH} from '../../constants/gridConfig';
import ASSET_TYPES from '../../constants/assetTypes';
import {ROTATION_BY_ORIENTATION} from '../../constants/asset';
import {CONTROL_TYPES, CONTROL_SECTION_CLASSES, CONTROL_CLASSES, CONTROL_ICONS} from './constants/controls';

class FullScreenPreivew extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.controlToIndexer = {
      [CONTROL_TYPES.LEFT]: _partial(props.changePreview, -1),
      [CONTROL_TYPES.RIGHT]: _partial(props.changePreview, 1),
    };
  }

  componentDidMount() {
    this.setBodyDimensions();
    this.setBodyDimensions.flush();
    window.addEventListener('resize', this.setBodyDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setBodyDimensions);
  }

  setBodyRef = previewBody => {
    this.previewBody = previewBody;
  };

  setBodyDimensions = _debounce(() => {
    this.setState({
      bodyDimensions: {
        width: this.previewBody.clientWidth,
        height: this.previewBody.clientHeight,
      },
    });
  }, 50);

  renderHeader = () => {
    return (
      <div className="FullScreenPreivew__header">
        <div className="FullScreenPreivew__backIcon" onClick={this.props.onClosePreview} >
          <FontAwesomeIcon icon="arrow-left" className="FullScreenPreivew__navIcon" size="1x" />
        </div>
      </div>
    );
  };

  renderNavControls = (controlType, assetType) => {
    return (
      <div className={`FullScreenPreivew__control-section ${CONTROL_SECTION_CLASSES[controlType]} ${CONTROL_SECTION_CLASSES[assetType]}`}>
        <div className={`FullScreenPreivew__control ${CONTROL_CLASSES[controlType]} `} onClick={this.controlToIndexer[controlType]} >
          <FontAwesomeIcon icon={CONTROL_ICONS[controlType]} className={`FullScreenPreivew__navIcon FullScreenPreivew__controlIcon`}/>
        </div>
      </div>
    );
  };

  renderControls = () => {
    const {assets, currentIndex} = this.props,
      assetType = AssetReader.type(assets[currentIndex]);
    return (
      <div>
        {currentIndex !== 0 ? this.renderNavControls(CONTROL_TYPES.LEFT, assetType) : null}
        {currentIndex !== this.props.assets.length - 1 ? this.renderNavControls(CONTROL_TYPES.RIGHT, assetType) : null}
      </div>
    );
  };

  renderPreviewImage = (currentAsset) => {
    const orientation = AssetReader.orientation(currentAsset);
    const imageDimensions = getImageDimensionsByOrientation(currentAsset),
      adjustedDimensions = getAdjustedImageDimensions(imageDimensions, this.state.bodyDimensions, orientation);
    return (
      <ImageTag
        src={`${STORAGE_PATH}/${AssetReader.src(currentAsset)}`}
        className="FullScreenPreivew__asset"
        placeholderClass="FullScreenPreivew__assetPlaceholder"
        style={{transform: ROTATION_BY_ORIENTATION[orientation], ...adjustedDimensions}}
      />
    );
  };

  renderPreviewVideo = (currentAsset) => {
    return (
      <video
        src={`${STORAGE_PATH}/${AssetReader.src(currentAsset)}`}
        className="FullScreenPreivew__asset"
        controls
      />
    );
  };

  renderPreview = () => {
    const {assets, currentIndex} = this.props,
      currentAsset = assets[currentIndex];

    return AssetReader.type(currentAsset) === ASSET_TYPES.IMAGE ? this.renderPreviewImage(currentAsset) : this.renderPreviewVideo(currentAsset);
  };

  renderBody() {
    return (
      <div className="FullScreenPreivew__body" ref={this.setBodyRef}>
        {this.state.bodyDimensions ? this.renderPreview() : null}
        {this.renderControls()}
      </div>
    );
  }

  render() {
    return (
      <div className="FullScreenPreivew__container">
        {this.renderBody()}
        {this.renderHeader()}
      </div>
    );
  }
}

FullScreenPreivew.propTypes = {
  assets: PropTypes.array,
  currentIndex: PropTypes.number,
  containerScroller: PropTypes.object,
  onClosePreview: PropTypes.func.isRequired,
  changePreview: PropTypes.func.isRequired,
};

FullScreenPreivew.defaultProps = {
  currentIndex: 0,
};

export default FullScreenPreivew;
