import ASSET_TYPES from '../../../constants/assetTypes';

export const CONTROL_TYPES = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

export const CONTROL_SECTION_CLASSES = {
  [CONTROL_TYPES.LEFT]: 'FullScreenPreivew__control-section-left',
  [CONTROL_TYPES.RIGHT]: 'FullScreenPreivew__control-section-right',
  [ASSET_TYPES.IMAGE]: 'FullScreenPreivew__control-section-image',
  [ASSET_TYPES.VIDEO]: 'FullScreenPreivew__control-section-video',
};

export const CONTROL_CLASSES = {
  [CONTROL_TYPES.LEFT]: 'FullScreenPreivew__control-left',
  [CONTROL_TYPES.RIGHT]: 'FullScreenPreivew__control-right',
};

export const CONTROL_ICONS = {
  [CONTROL_TYPES.LEFT]: 'chevron-left',
  [CONTROL_TYPES.RIGHT]: 'chevron-right',
};
