import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {STORAGE_PATH} from '../../../constants/asset';
import AssetReader from '../../../readers/asset';

import ImageTag from '../../assetTags/image';

const rotation = {
  1: 'rotate(0deg)',
  3: 'rotate(180deg)',
  6: 'rotate(90deg)',
  8: 'rotate(270deg)'
};

const getImageStylesByOrientation = (dimensions, orientation) => {
  switch (orientation) {
    case 3:
      return {transform: rotation[orientation], ...dimensions};
    case 6:
    case 8:
      const newDimensions = {height: dimensions.width, width: dimensions.height};
      const top = (newDimensions.width - newDimensions.height) / 2;
      return {...newDimensions, top, left: -top, position: 'absolute', transform: rotation[orientation]};
    default:
      return dimensions;
  }
};

class ImageCard extends PureComponent {
  render() {
    const {props} = this,
      {asset} = props,
      assetStyles = {...props.assetDimensions, ...props.assetPositions, position: 'absolute'},
      orientation = AssetReader.orientation(asset),
      imageStyles = getImageStylesByOrientation(props.assetDimensions, orientation);

    return (
      <div className={props.assetClass} style={assetStyles} onClick={props.onClick}>
        <ImageTag
          style={imageStyles}
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
