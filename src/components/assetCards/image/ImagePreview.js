import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {STORAGE_PATH} from '../../../constants/asset';

class ImagePreview extends PureComponent {
  render() {
    const {props} = this,
      {asset} = props;
    return (
      <div className={props.assetClass} key={`${asset.src.substring(1, 10)} - ${props.assetIndex}`} style={{height: props.assetHeight}} onClick={props.onClick}>
        <img className='asset_image' src={`${STORAGE_PATH}/${asset.preview || asset.src}`} />
      </div>
    );
  }
}

ImagePreview.propTypes = {
  asset: PropTypes.object.isRequired,
  assetClass: PropTypes.string.isRequired,
  assetHeight: PropTypes.number.isRequired,
  assetIndex: PropTypes.number,
};

export default ImagePreview;
