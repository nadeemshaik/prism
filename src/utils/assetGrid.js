//constants
import {MAX_ASSET_HEIGHT, PADDING_TOP_IMAGE, PADDING_LEFT_IMAGE} from '../constants/asset';

//libs
import update from 'immutability-helper';
import _forEach from 'lodash/forEach';
import _reduce from 'lodash/reduce';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _isUndefined from 'lodash/isUndefined';

import AssetReader from '../readers/asset';

const GRID_LEFT_PADDING = 50;

const ASSET_ROW = function (assets = []) {
  this.assets = assets;
  this.isFull = false;
  this.rowHeight = MAX_ASSET_HEIGHT;

  this.addAssetDetail = (assetDetail) => {
    this.assets.push(assetDetail);
  };
};

const ASSET_DETAIL = function (asset) {
  this.asset = asset;
}

export const getAssetsFromAssetRows = assetRows => {
  return _reduce(assetRows, (assets, assetRow) => {
    assets.push(..._map(assetRow.assets, 'asset'));
    return assets;
  }, []);
};

export const getAssetAspectRatio = (asset, assetIndex) => {
  const orientation = AssetReader.orientation(asset);
  const width = AssetReader.width(asset);
  const height = AssetReader.height(asset);

  // when calculating aspect ration we wil consider the extra top and left padding as part of the image
  const extraWidth = assetIndex === 0 ? PADDING_LEFT_IMAGE : 0;
  const extraHeight = _isUndefined(assetIndex) ? 0 : PADDING_TOP_IMAGE;

  switch (orientation) {
    case 6:
    case 8:
      return (height + extraWidth) / (width + extraHeight);
    default:
      return (width + extraWidth) / (height + extraHeight);
  }
};

const getAssetsCobinedAspectRatio = assets => {
  let combinedAspectRatio = 0;

  _forEach(assets, (assetDetails, assetIndex) => {
    combinedAspectRatio += getAssetAspectRatio(assetDetails.asset, assetIndex);
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

  if (lastAssetRow.isFull) { //if assetRow is full, start a new row
    lastAssetRow = new ASSET_ROW([new ASSET_DETAIL(asset)]);
  } else {
    lastAssetRow.addAssetDetail(new ASSET_DETAIL(asset));

    if (isAssetRowFull(lastAssetRow, rowWidth)) {
      lastAssetRow.isFull = true;
    }
  }

  return lastAssetRow;
};

export const addAssetsToRows = (assetRows, assets, rowWidth) => {
  let updatedAssetRows = assetRows,
    lastAssetRow = assetRows[assetRows.length - 1] || new ASSET_ROW();

  //in case lastAssetRow adds new items, we need to replace it rather than add a new row
  let shouldSplice = !lastAssetRow.isFull;
  _forEach(assets, asset => {
    lastAssetRow = addAssetToRow(lastAssetRow, asset, rowWidth);

    if (lastAssetRow.isFull) {
      const updateOperation = shouldSplice ? {$splice: [[assetRows.length - 1, 1, lastAssetRow]]} : {$push: [lastAssetRow]};
      updatedAssetRows = update(updatedAssetRows, updateOperation);
      shouldSplice = false;
    }
  });

  if (!lastAssetRow.isFull) {
    updatedAssetRows = update(updatedAssetRows, {$push: [lastAssetRow]});
  }

  return updatedAssetRows;
};

export const getGridParams = (assetRows, assets, rowWidth) => {
  const updatedAssetRows = addAssetsToRows(assetRows, assets, rowWidth);

  let currentRowTop = PADDING_TOP_IMAGE,
    assetCount = 0,
    containerHeight = 0;

  _forEach(updatedAssetRows, assetRow => {
    const rowHeight = Math.floor(rowWidth / getAssetsCobinedAspectRatio(assetRow.assets) * 100) / 100;
    _forEach(assetRow.assets, (assetDetails, assetIndex) => {
      const width = rowHeight * getAssetAspectRatio(assetDetails.asset, assetIndex),
        previewAssetDetials = assetRow.assets[assetIndex - 1],
        previewAssetEnd = _get(previewAssetDetials, 'positions.left', 0) + _get(previewAssetDetials, 'dimensions.width', 0);

      assetDetails.dimensions = {
        height: rowHeight - PADDING_TOP_IMAGE, // calculated height, width are including the padding
        width: width - (assetIndex === 0 ? 0 : PADDING_LEFT_IMAGE),
      };

      assetDetails.positions = {
        top: currentRowTop,
        left: previewAssetEnd + (assetIndex !== 0 ? PADDING_LEFT_IMAGE : GRID_LEFT_PADDING),
      };

      assetDetails.index = assetCount;
      assetCount++;
    });

    currentRowTop += rowHeight;
    containerHeight += rowHeight;
  });

  return {
    assetRows: updatedAssetRows,
    containerHeight,
  };
};
