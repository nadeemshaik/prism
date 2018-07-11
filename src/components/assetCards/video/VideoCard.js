import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {STORAGE_PATH} from '../../../constants/gridConfig';

import AssetReader from '../../../readers/asset';

import ImageTag from '../../assetTags/image';

class VideoCard extends PureComponent {

  renderPreview() {
    const {props} = this;
    return (
      <div className='asset_video_preview' style={props.assetDimensions} onClick={props.onClick}>
        <div className='overlay'></div>
        <FontAwesomeIcon icon="play" className='playAction'/>
        <ImageTag
          style={props.assetDimensions}
          placeholderClass='asset__imagePlaceholder'
          src={`${STORAGE_PATH}/${AssetReader.preview(this.props.asset)}`}
        />
      </div>
    );
  }


  render() {
    const {props} = this,
        assetStyles = {...props.assetDimensions, ...props.assetPositions, position: 'absolute'};

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
  assetHeight: PropTypes.number.isRequired,
};

export default VideoCard;
