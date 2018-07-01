import React, {PureComponent} from 'react';

//css
import './AssetGrid.css';
import '../assetCards/assetCards.css';

//libs
import _map from 'lodash/map';
import _debounce from 'lodash/debounce';

//components
import FullScreenPreivew from '../fullScreenPreivew';
import InfiniteScroller from '../infiniteScroller';

//utils
import {addAssetsToRows, getAssetsFromAssetRows} from '../../utils/assetGrid';
import getScrollBarWidth from '../../utils/getScrollBarWidth';

//services
import {fetchAssets} from '../../services/assets';

//readers
import AssetReader from '../../readers/asset';

//constants
import {ASSET_TYPE_TO_CARD} from '../../constants/asset';

const PADDING_BESIDES_GRID = 100;

class AssetGrid extends PureComponent {
  state = {
    containerHeight: null,
    assetRows: [],
    rowHeights: [],
    isLoading: false,
    fullScreenAsset: undefined,
  };

  componentDidMount() {
    window.onresize = (event) => {
      this.setGridDimensions();
      this.reCalculateAssetRows([], getAssetsFromAssetRows(this.state.assetRows));
    };
    this.setGridDimensions();
  }

  getAssetRows = (currentAssets, newAssets) => {
    return addAssetsToRows(currentAssets, newAssets, this.state.containerWidth - PADDING_BESIDES_GRID);
  };

  reCalculateAssetRows = _debounce((currentAssets, newAssets) => {
    const assetRows = this.getAssetRows(currentAssets, newAssets);
    this.setState({
      assetRows,
      rowHeights: _map(assetRows, 'rowHeight'),
    });
  }, 300);

  setGridDimensions = () => {
    this.setState({
      containerHeight: this.assetGridNode.clientHeight,
      containerWidth: this.assetGridNode.clientWidth - getScrollBarWidth(),
    });
  };

  setAssetGridRef = ref => {
    this.assetGridNode = ref;
  }

  loadMoreAssets = () => {
    this.setState({isLoading: true});
    fetchAssets()
      .then(assets => {
        this.reCalculateAssetRows(this.state.assetRows, assets);
        this.reCalculateAssetRows.flush();
        this.setState({
          isLoading: false,
        });
      });
  }

  showAssetPreview = (fullScreenAsset) => {
    this.setState({fullScreenAsset});
  }

  closePreview = () => {
    this.setState({fullScreenAsset: undefined});
  }

  renderAssetCard(asset, assetIndex, assetHeight) {
    const AssetCard = ASSET_TYPE_TO_CARD[AssetReader.type(asset)];
    return (
      <AssetCard
        key={AssetReader.id(asset)}
        asset={asset}
        assetIndex={assetIndex}
        assetHeight={assetHeight}
        assetClass='AssetGrid__assetContainer'
        onClick={() => {this.showAssetPreview(asset)}}
      />
    );
  }

  renderAssetRow = (assetRow, index) => {
    const that = this;
    return (
      <div className="AssetGrid__assetRow" key={index}>
        {
          _map(assetRow.assets, (asset, assetIndex) => (
            this.renderAssetCard(asset, assetIndex, assetRow.rowHeight)
          ))
        }
      </div>
    );
  }

  renderFullscreenPreview() {
    return (
      <FullScreenPreivew
        asset={this.state.fullScreenAsset}
        onClosePreview={this.closePreview}
      />
    );
  }

  renderInfiniteScroller() {
    const {state}  = this;
    return (
      <InfiniteScroller
        containerHeight={state.containerHeight}
        elementHeight={state.rowHeights}
        loadMoreItems={this.loadMoreAssets}
        isLoading={state.isLoading}
        itemRows={state.assetRows}
        rowRenderer={this.renderAssetRow}
        containerClassName="AssetGrid__scrollerContainer"
      />
    );
  }

  render() {
    const {state} = this;
    return (
      <div className='AssetGrid__container' ref={this.setAssetGridRef}>
        {state.containerHeight ? this.renderInfiniteScroller() : null}
        {state.fullScreenAsset ? this.renderFullscreenPreview() :null}
      </div>
    );
  }
}

export default AssetGrid;
