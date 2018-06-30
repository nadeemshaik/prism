import React, {PureComponent} from 'react';

//css
import './AssetGrid.css';
import '../assetCards/assetCards.css';

//libs
import _map from 'lodash/map';

//components
import FullScreenPreivew from '../fullScreenPreivew';
import InfiniteScroller from '../infiniteScroller';

//utils
import {addAssetsToRows} from '../../utils/assetGrid';
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
      this.setState({
        containerHeight: this.assetGridNode.clientHeight,
        containerWidth: this.assetGridNode.clientWidth - getScrollBarWidth(),
      });
  }

  setAssetGridRef = ref => {
    this.assetGridNode = ref;
  }

  loadMoreAssets = () => {
    this.setState({isLoading: true});
    fetchAssets()
      .then(assets => {
        const assetRows = addAssetsToRows(this.state.assetRows, assets, this.state.containerWidth - PADDING_BESIDES_GRID);
        this.setState({
          assetRows,
          rowHeights: _map(assetRows, 'rowHeight'),
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

  renderAssetRow = (assetRow, index) => {
    const that = this;
    return (
      <div className="AssetGrid__assetRow" key={index}>
        {
          _map(assetRow.assets, (asset, assetIndex) => {
            const AssetCard = ASSET_TYPE_TO_CARD[AssetReader.type(asset)];
            return (
              <AssetCard
                asset={asset}
                assetIndex={assetIndex}
                assetHeight={assetRow.rowHeight}
                assetClass='AssetGrid__assetContainer'
                onClick={() => {that.showAssetPreview(asset)}}
              />
            )
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
          containerClassName="AssetGrid__scrollerContainer"
          /> : null
        }
        {state.fullScreenAsset ? (
          <FullScreenPreivew
            asset={state.fullScreenAsset}
            onClosePreview={this.closePreview}
          />
        ) :null}
      </div>
    );
  }
}

export default AssetGrid;
