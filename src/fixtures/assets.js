import _times from 'lodash/times';
import ASSET_TYPES from '../constants/assetTypes';

const dummtAssets = [
  {
    src: 'image_1.jpg',
    preview: 'image_1_preview.jpg',
    width: 3000,
    height: 2000,
    assetType: ASSET_TYPES.IMAGE,
  },
  {
    src: 'image_2.jpg',
    preview: 'image_2_preview.jpg',
    width: 259,
    height: 194,
    assetType: ASSET_TYPES.IMAGE,
  },
  {
    src: 'image_3.jpg',
    preview: 'image_3_preview.jpg',
    width: 1280,
    height: 720,
    assetType: ASSET_TYPES.IMAGE,
  },
  {
    src: 'image_4.jpg',
    preview: 'image_4_preview.jpg',
    width: 476,
    height: 717,
    assetType: ASSET_TYPES.IMAGE,
  },
  {
    src: 'image_5.jpg',
    preview: 'image_5_preview.jpg',
    width: 3264,
    height: 2448,
    assetType: ASSET_TYPES.IMAGE,
  },
  {
    src: 'image_6.jpg',
    preview: 'image_6_preview.jpg',
    width: 270,
    height: 202,
    assetType: ASSET_TYPES.IMAGE,
  },
  {
    src: 'image_7.JPG',
    preview: 'image_7_preview.JPG',
    width: 4000,
    height: 3000,
    assetType: ASSET_TYPES.IMAGE,
  },
  {
    src: 'image_8.jpeg',
    preview: 'image_8_preview.jpeg',
    width: 629,
    height: 419,
    assetType: ASSET_TYPES.IMAGE,
  },
  {
    src: 'video_1.mp4',
    preview: 'video_1_preview.PNG',
    width: 1280,
    height: 720,
    assetType: ASSET_TYPES.VIDEO,
  },
  {
    src: 'video_2.mp4',
    preview: 'video_1_preview.PNG',
    width: 1280,
    height: 720,
    assetType: ASSET_TYPES.VIDEO,
  }
];

export const generateDummyAssets = () => {
  return _times(50, count => {
    const assetNumber = Math.floor((Math.random() * dummtAssets.length));
    return dummtAssets[assetNumber];
  });
};
