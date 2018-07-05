import ASSET_TYPES from '../constants/assetTypes';
import AssetCards from '../components/assetCards';

export const MAX_ASSET_HEIGHT = 250;

export const PADDING_TOP_IMAGE = 4;
export const PADDING_LEFT_IMAGE = 4;

export const ROTATION_BY_ORIENTATION = {
  1: 'rotate(0deg)',
  3: 'rotate(180deg)',
  6: 'rotate(90deg)',
  8: 'rotate(270deg)'
};


export const STORAGE_PATH = 'http://localhost:4000/storage';

export const ASSET_TYPE_TO_CARD = {
  [ASSET_TYPES.IMAGE]: AssetCards.ImageCard,
  [ASSET_TYPES.VIDEO]: AssetCards.VideoCard,
};
