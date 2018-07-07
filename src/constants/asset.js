import ASSET_TYPES from '../constants/assetTypes';
import AssetCards from '../components/assetCards';

export const ROTATION_BY_ORIENTATION = {
  1: 'rotate(0deg)',
  3: 'rotate(180deg)',
  6: 'rotate(90deg)',
  8: 'rotate(270deg)'
};

export const ASSET_TYPE_TO_CARD = {
  [ASSET_TYPES.IMAGE]: AssetCards.ImageCard,
  [ASSET_TYPES.VIDEO]: AssetCards.VideoCard,
};
