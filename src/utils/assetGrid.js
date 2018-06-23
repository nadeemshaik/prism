import {MAX_ASSET_HEIGHT} from '../constants/asset';
import update from 'immutability-helper';

import _forEach from 'lodash/forEach';

const genereateAssetRow = () => {
  return {
    assets: [],
    isFull: false,
    rowHeight: MAX_ASSET_HEIGHT,
  };
};

const getAssetsCobinedAspectRatio = assets => {
  let combinedAspectRatio = 0;

  _forEach(assets, asset => {
    combinedAspectRatio += asset.width / asset.height;
  });

  return Math.floor(combinedAspectRatio * 100) / 100;
};

const isAssetRowFull = (assetRow, maxAssetRowWidth) => {
  const {assets} = assetRow,
    combinedAspectRatio = getAssetsCobinedAspectRatio(assets);

  return combinedAspectRatio > maxAssetRowWidth / MAX_ASSET_HEIGHT;
};

const addAssetToRow = (assetRow, asset, rowWidth) => {
  let lastAssetRow = assetRow;
  if (lastAssetRow.isFull) {
    lastAssetRow = genereateAssetRow();
    lastAssetRow.assets.push(asset);
  } else {
    lastAssetRow = update(lastAssetRow, {assets: {$push: [asset]}});

    if (isAssetRowFull(lastAssetRow, rowWidth)) {
      lastAssetRow = update(lastAssetRow, {
        isFull: {$set: true},
        rowHeight: {$set: Math.floor(rowWidth / getAssetsCobinedAspectRatio(lastAssetRow.assets) * 100) / 100},
      });
    }
  }

  return lastAssetRow;
};

export const addAssetsToRows = (assetRows, assets, rowWidth) => {
  let updatedAssetRows = assetRows,
    lastAssetRow = assetRows[assetRows.length] || genereateAssetRow();

  _forEach(assets, asset => {
    lastAssetRow = addAssetToRow(lastAssetRow, asset, rowWidth);

    if (lastAssetRow.isFull) {
      updatedAssetRows = update(updatedAssetRows, {$push: [lastAssetRow]});
    }
  });

  return updatedAssetRows;
};
