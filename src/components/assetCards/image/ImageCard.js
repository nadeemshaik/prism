import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {STORAGE_PATH} from '../../../constants/asset';
import AssetReader from '../../../readers/asset';

class ImagePreview extends PureComponent {
  render() {
    const {props} = this,
      {asset} = props;
    return (
      <div className={props.assetClass} style={{height: props.assetHeight}} onClick={props.onClick}>
        <img className='asset_image' src={`${STORAGE_PATH}/${AssetReader.preview(asset)}`} />
      </div>
    );
  }
}

ImagePreview.propTypes = {
  asset: PropTypes.object.isRequired,
  assetClass: PropTypes.string.isRequired,
  assetHeight: PropTypes.number.isRequired,
};

export default ImagePreview;
