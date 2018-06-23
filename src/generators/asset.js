import React from 'react';
import ASSET_TYPES from '../constants/assetTypes';

const generateImage = (image, index, imageHeight) => {
  return (
    <div className='asset_image_container' key={`${image.src.substring(1, 10)} - ${index}`} style={{height: imageHeight}}>
      <img className='asset_image' src={image.src} />
    </div>
  );
};

const ASSET_TYPE_TO_GENERATOR = {
  [ASSET_TYPES.IMAGE]: generateImage,
};

export const generateAsset = (asset, index, assetHeight) => {
  return ASSET_TYPE_TO_GENERATOR[asset.assetType](asset, index, assetHeight);
};
