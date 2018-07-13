//libs
import _forEach from 'lodash/forEach';

//readers
import AssetReader from '../readers/asset';

export const  isScrolledIntoView = el => {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
};

export const calculateFirstVisibleAsset = assetRows => {
  let firstVisibleAssetIndex;
  _forEach(assetRows, assetRow => {
    _forEach(assetRow.assets, assetDetail => {
      if (isScrolledIntoView(document.querySelector(`[data-id="${AssetReader.id(assetDetail.asset)}"]`))) {
        firstVisibleAssetIndex = assetDetail.index;
        return false;
      }
    });
    if (firstVisibleAssetIndex !== undefined) return false;
  });

  return firstVisibleAssetIndex;
};
