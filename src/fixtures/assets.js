import _times from 'lodash/times';
import ASSET_TYPES from '../constants/assetTypes';

const dummtAssets = [
  {
    src: 'http://www.fujifilm.com.my/Products/digital_cameras/x/fujifilm_x20/sample_images/img/index/ff_x20_008.JPG',
    width: 4000,
    height: 3000,
    assetType: ASSET_TYPES.IMAGE,
  },
  {
    src: 'https://cdn.pixabay.com/photo/2015/06/19/17/58/sample-815141_960_720.jpg',
    width: 250,
    height: 250,
    assetType: ASSET_TYPES.IMAGE,
  },
  {
    src: 'http://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-1.jpg',
    width: 3000,
    height: 2000,
    assetType: ASSET_TYPES.IMAGE,
  },
  {
    src: 'https://kbob.github.io/images/sample-4.jpg',
    width: 3264,
    height: 2448,
    assetType: ASSET_TYPES.IMAGE,
  },
  {
    src: 'http://imaging.nikon.com/lineup/lens/zoom/normalzoom/af-s_dx_18-300mmf_35-56g_ed_vr/img/sample/sample1_l.jpg',
    width: 476,
    height: 717,
    assetType: ASSET_TYPES.IMAGE,
  },
  {
    src: 'https://i.ytimg.com/vi/RHLknisJ-Sg/maxresdefault.jpg',
    width: 1280,
    height: 720,
    assetType: ASSET_TYPES.IMAGE,
  },
  {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVMguScuZkiJraTJBmQPVKgaNh4AJvviRkKQVw8xDqmbaW-tUX',
    width: 259,
    height: 194,
    assetType: ASSET_TYPES.IMAGE,
  },
  {
    src: 'http://media.gjczz.com/images/ebde01f3bf2f8d9e49aff61b1d8b2cde.jpeg',
    width: 629,
    height: 419,
    assetType: ASSET_TYPES.IMAGE,
  },
];

export const generateDummyAssets = () => {
  return _times(50, count => {
    const assetNumber = Math.floor((Math.random() * dummtAssets.length));
    return dummtAssets[assetNumber];
  });
};
