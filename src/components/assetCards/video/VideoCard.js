import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {STORAGE_PATH} from '../../../constants/gridConfig';

import AssetReader from '../../../readers/asset';

import ImageTag from '../../assetTags/image';

class VideoCard extends PureComponent {

  componentWillUnmount() {
    this.props.onUnmount();
  }

  renderPreview() {
    const {props} = this;
    return (
      <div className='asset_video_preview' style={props.dimensions} onClick={props.openAssetPreview}>
        <div className={`overlay ${props.previewImageClass}`}></div>
        <FontAwesomeIcon icon="play" className='playAction'/>
        <ImageTag
          style={props.dimensions}
          placeholderClass='asset__imagePlaceholder'
          className={props.previewImageClass}
          src={`${STORAGE_PATH}/${AssetReader.preview(this.props.asset)}`}
        />
      </div>
    );
  }


  render() {
    const {props} = this,
        assetStyles = {...props.dimensions, ...props.positions, position: 'absolute'};

    return (
      <div className={props.assetClass} style={assetStyles} data-id={AssetReader.id(props.asset)}>
        {this.renderPreview()}
      </div>
    );
  }
}

VideoCard.propTypes = {
  asset: PropTypes.object.isRequired,
  assetClass: PropTypes.string.isRequired,
  previewImageClass: PropTypes.string,
  dimensions: PropTypes.object,
  positions: PropTypes.object,
  onUnmount: PropTypes.func.isRequired,
  openAssetPreview: PropTypes.func.isRequired,
};

export default VideoCard;
