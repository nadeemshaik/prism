import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {STORAGE_PATH} from '../../../constants/gridConfig';

import AssetReader from '../../../readers/asset';

class VideoCard extends PureComponent {

  state = {
    playVideo: false,
  };

  setPreviewImgRef = previewImg => {
    this.previewImg = previewImg;
  }

  playVideo = () => {
    this.setState({playVideo: true});
  }

  renderVideo() {
    return <video className='asset_video' src={`${STORAGE_PATH}/${AssetReader.src(this.props.asset)}`} controls autoPlay />;
  }

  renderPreview() {
    return (
      <div className='asset_video_preview'>
        <div className='overlay'></div>
        <FontAwesomeIcon icon="play" className='playAction' size="3x" onClick={this.playVideo} />
        <img
          ref={this.setPreviewImgRef}
          className='asset_image'
          src={`${STORAGE_PATH}/${AssetReader.preview(this.props.asset)}`}
        />
      </div>
    );
  }


  render() {
    const {props} = this;
    return (
      <div className={props.assetClass} style={{height: props.assetHeight}}>
        {this.state.playVideo ? this.renderVideo() : this.renderPreview()}
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
