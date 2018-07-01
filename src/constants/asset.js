import ASSET_TYPES from '../constants/assetTypes';
import AssetCards from '../components/assetCards';

export const MAX_ASSET_HEIGHT = 250;

export const STORAGE_PATH = 'http://localhost:4000/storage';

export const ASSET_TYPE_TO_CARD = {
  [ASSET_TYPES.IMAGE]: AssetCards.ImageCard,
  [ASSET_TYPES.VIDEO]: AssetCards.VideoCard,
};
