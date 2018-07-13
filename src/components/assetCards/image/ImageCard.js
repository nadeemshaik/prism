import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {STORAGE_PATH} from '../../../constants/gridConfig';
import AssetReader from '../../../readers/asset';

import {getImageStylesByOrientation} from '../../../utils/image';

import ImageTag from '../../assetTags/image';

class ImageCard extends PureComponent {

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    const {props} = this,
      {asset} = props,
      assetStyles = {...props.dimensions, ...props.positions, position: 'absolute'},
      orientation = AssetReader.orientation(asset),
      imageStyles = getImageStylesByOrientation(props.dimensions, orientation);

    return (
      <div
        className={props.assetClass}
        style={assetStyles}
        onClick={props.openAssetPreview}
        data-id={AssetReader.id(asset)}
      >
        <ImageTag
          style={imageStyles}
          placeholderClass='asset__imagePlaceholder'
          className={props.previewImageClass}
          src={`${STORAGE_PATH}/${AssetReader.preview(asset)}`}
        />
      </div>
    );
  }
}

ImageCard.propTypes = {
  asset: PropTypes.object.isRequired,
  assetClass: PropTypes.string.isRequired,
  previewImageClass: PropTypes.string,
  dimensions: PropTypes.object,
  positions: PropTypes.object,
  onUnmount: PropTypes.func.isRequired,
  openAssetPreview: PropTypes.func.isRequired,
};

export default ImageCard;
