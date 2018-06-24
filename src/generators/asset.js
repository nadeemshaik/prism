import React from 'react';
import ASSET_TYPES from '../constants/assetTypes';

const generateImage = (image, {assetIndex, assetHeight, assetClass}) => {
  return (
    <div className={`asset_image_container ${assetClass}`} key={`${image.src.substring(1, 10)} - ${assetIndex}`} style={{height: assetHeight}}>
      <img className='asset_image' src={image.src} />
    </div>
  );
};

const ASSET_TYPE_TO_GENERATOR = {
  [ASSET_TYPES.IMAGE]: generateImage,
};

export const generateAsset = (asset, params) => {
  return ASSET_TYPE_TO_GENERATOR[asset.assetType](asset, params);
};
