import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {STORAGE_PATH} from '../../../constants/gridConfig';
import {ROTATION_BY_ORIENTATION} from '../../../constants/asset';
import AssetReader from '../../../readers/asset';

import {getImageStylesByOrientation} from '../../../utils/image';

import ImageTag from '../../assetTags/image';

class ImageCard extends PureComponent {
  render() {
    const {props} = this,
      {asset} = props,
      assetStyles = {...props.assetDimensions, ...props.assetPositions, position: 'absolute'},
      orientation = AssetReader.orientation(asset),
      imageStyles = getImageStylesByOrientation(props.assetDimensions, orientation);

    return (
      <div
        className={props.assetClass}
        style={assetStyles}
        onClick={props.onClick}
        data-id={AssetReader.id(asset)}
      >
        <ImageTag
          style={imageStyles}
          placeholderClass='asset__imagePlaceholder'
          src={`${STORAGE_PATH}/${AssetReader.preview(asset)}`}
        />
      </div>
    );
  }
}

ImageCard.propTypes = {
  asset: PropTypes.object.isRequired,
  assetClass: PropTypes.string.isRequired,
  assetDimensions: PropTypes.object.isRequired,
  assetPositions: PropTypes.object.isRequired,
};

export default ImageCard;
