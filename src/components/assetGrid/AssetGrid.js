import React, {PureComponent} from 'react';
import './AssetGrid.css';
import '../../css/asset.css';

import _map from 'lodash/map';

import InfiniteScroller from '../infiniteScroller';
import {addAssetsToRows} from '../../utils/assetGrid';
import {generateAsset} from '../../generators/asset';

import {generateDummyAssets} from '../../fixtures/assets';

class AssetGrid extends PureComponent {
  state = {
    containerHeight: null,
    assetRows: [],
    rowHeights: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({
      containerHeight: this.assetGridNode.clientHeight,
      containerWidth: this.assetGridNode.clientWidth,
    });
  }

  setAssetGridRef = ref => {
    this.assetGridNode = ref;
  }

  loadMoreAssets = () => {
    this.setState({isLoading: true});
    const assetRows = addAssetsToRows(this.state.assetRows, generateDummyAssets(), this.state.containerWidth);

    setTimeout(() => {
      this.setState({
        assetRows,
        rowHeights: _map(assetRows, 'rowHeight'),
        isLoading: false,
      });
    }, 1000);
  }

  renderAssetRow(assetRow, index) {
    return (
      <div className="AssetGrid__assetRow" key={index}>
        {
          _map(assetRow.assets, (asset, assetIndex) => {
            return generateAsset(asset, {assetIndex, assetHeight: assetRow.rowHeight, assetClass: 'AssetGrid__assetContainer'});
          })
        }
      </div>
    );
  }

  render() {
    const {state} = this;
    return (
      <div className='AssetGrid__container' ref={this.setAssetGridRef}>
        {
          state.containerHeight ? <InfiniteScroller
            containerHeight={state.containerHeight}
            elementHeight={state.rowHeights}
            loadMoreItems={this.loadMoreAssets}
            isLoading={state.isLoading}
            itemRows={state.assetRows}
            rowRenderer={this.renderAssetRow}
          /> : null
        }
      </div>
    );
  }
}

export default AssetGrid;
