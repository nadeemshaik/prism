import {MAX_ASSET_HEIGHT, PADDING_TOP_ASSET, PADDING_LEFT_ASSET} from '../constants/gridConfig';

import update from 'immutability-helper';
import _forEach from 'lodash/forEach';
import _reduce from 'lodash/reduce';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _isUndefined from 'lodash/isUndefined';

import AssetReader from '../readers/asset';

const GRID_LEFT_PADDING = 50;

const ASSET_ROW = function () {
  this.assets = [];
  this.isFull = false;
  this.rowHeight = MAX_ASSET_HEIGHT;

  this.addAssetDetail = (assetDetail) => {
    this.assets.push(assetDetail);
  };
};

const ASSET_DETAIL = function (asset) {
  this.asset = asset;
};

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
  const extraWidth = assetIndex === 0 ? PADDING_LEFT_ASSET : 0;
  const extraHeight = _isUndefined(assetIndex) ? 0 : PADDING_TOP_ASSET;

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

const isAssetRowFull = (assetRow, rowWidth) => {
  const {assets} = assetRow,
    combinedAspectRatio = getAssetsCobinedAspectRatio(assets);

  return combinedAspectRatio > rowWidth / MAX_ASSET_HEIGHT;
};

const addAssetToRow = (assetRow, asset, rowWidth) => {
  //if assetRow is full, start a new row
  const lastAssetRow = assetRow.isFull ? new ASSET_ROW() : assetRow;
  const assetDetail = new ASSET_DETAIL(asset);

  lastAssetRow.addAssetDetail(assetDetail);

  if (isAssetRowFull(lastAssetRow, rowWidth)) {
    lastAssetRow.isFull = true;
  }

  return lastAssetRow;
};

const generateAssetRows = (assets, rowWidth) => {
  let updatedAssetRows = [],
    lastAssetRow = new ASSET_ROW();

  _forEach(assets, (asset, assetIndex) => {
    //add assets to last row until its full
    lastAssetRow = addAssetToRow(lastAssetRow, asset, rowWidth);

    // when its full or this is the last asset, i.e last row, push the row into the assetRows array
    if (lastAssetRow.isFull || assetIndex === assets.length - 1) {
      updatedAssetRows = update(updatedAssetRows, {$push: [lastAssetRow]});
    }
  });

  return updatedAssetRows;
};

export const generateAssetParams = (assetRows, rowWidth) => {
  let currentRowTop = PADDING_TOP_ASSET,
    assetCount = 0,
    containerHeight = 0;

  _forEach(assetRows, assetRow => {
    const rowHeight = getAssetRowHeight(assetRow, rowWidth);
    assetRow.top = currentRowTop;

    _forEach(assetRow.assets, (assetDetails, assetIndex) => {
      const width = rowHeight * getAssetAspectRatio(assetDetails.asset, assetIndex),
        previewAssetDetials = assetRow.assets[assetIndex - 1],
        previewAssetXEnd = _get(previewAssetDetials, 'positions.left', 0) + _get(previewAssetDetials, 'dimensions.width', 0);

      assetDetails.dimensions = {
        height: rowHeight - PADDING_TOP_ASSET, // calculated height, width are including the padding
        width: width - (assetIndex === 0 ? 0 : PADDING_LEFT_ASSET),
      };

      assetDetails.positions = {
        top: currentRowTop,
        left: previewAssetXEnd + (assetIndex !== 0 ? PADDING_LEFT_ASSET : GRID_LEFT_PADDING),
      };

      assetDetails.index = assetCount;
      assetCount++;
    });

    currentRowTop += rowHeight;
    containerHeight += rowHeight;
  });

  return containerHeight;
};

export const getAssetRowHeight = (assetRow, rowWidth) => {
  return Math.floor(rowWidth / getAssetsCobinedAspectRatio(assetRow.assets) * 100) / 100;
};

export default class InfiniteScroller {
  constructor(assets, rowWidth) {
    this.setParams(assets, rowWidth);
  }

  setParams(assets = this.assets, rowWidth = this.rowWidth) {
    this.assets = assets;
    this.rowWidth = rowWidth;
  }

  generateAssetRows = () => {
    this.assetRows = generateAssetRows(this.assets, this.rowWidth);
  };

  generateGridParams = () => {
    this.generateAssetRows(this.assets, this.rowWidth);
    this.containerHeight = generateAssetParams(this.assetRows, this.rowWidth);

    return {
      containerHeight: this.containerHeight,
      assetRows: this.assetRows,
    };
  }
};
