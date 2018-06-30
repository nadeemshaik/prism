import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {STORAGE_PATH} from '../../../constants/asset';

class VideoAsset extends PureComponent {

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
    return <video className='asset_video' src={`${STORAGE_PATH}/${this.props.asset.src}`} controls autoPlay />;
  }

  renderPreview() {
    return (
      <div className='asset_video_preview'>
        <div className='overlay'></div>
        <FontAwesomeIcon icon="play" className='playAction' size="3x" onClick={this.playVideo} />
        <img
          ref={this.setPreviewImgRef}
          className='asset_image'
          src={`${STORAGE_PATH}/${this.props.asset.preview}`}
        />
      </div>
    );
  }


  render() {
    const {props} = this,
      {asset} = props;
    return (
      <div className={props.assetClass} key={`${asset.src.substring(1, 10)} - ${props.assetIndex}`} style={{height: props.assetHeight}}>
        {this.state.playVideo ? this.renderVideo() : this.renderPreview()}
      </div>
    );
  }
}

VideoAsset.propTypes = {
  asset: PropTypes.object.isRequired,
  assetClass: PropTypes.string.isRequired,
  assetHeight: PropTypes.number.isRequired,
  assetIndex: PropTypes.number,
};

export default VideoAsset;
