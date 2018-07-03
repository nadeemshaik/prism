import React, {PureComponent} from 'react';

//css
import './AssetGrid.css';
import '../assetCards/assetCards.css';

//libs
import _debounce from 'lodash/debounce';
import _isUndefined from 'lodash/isUndefined';

//components
import FullScreenPreivew from '../fullScreenPreivew';
import AssetGrid from './AssetGrid';

//utils
import {getAssetsFromAssetRows} from '../../utils/assetGrid';
import {getGridParams} from '../../utils/assetGrid';
import getScrollBarWidth from '../../utils/getScrollBarWidth';

//services
import {fetchAssets} from '../../services/assets';

//readers
import AssetReader from '../../readers/asset';

//constants
import {ASSET_TYPE_TO_CARD} from '../../constants/asset';

const PADDING_BESIDES_GRID = 100;

class AssetGridContainer extends PureComponent {
  state = {
    containerWidth: 0,
    containerHeight: 0,
    assetRows: [],
    previewAssetIndex: undefined,
  };

  componentDidMount() {
    window.onresize = (event) => {
      this.setGridDimensions();
      this.reCalculateAssetRows([], getAssetsFromAssetRows(this.state.assetRows));
    };
    this.setGridDimensions();
    this.loadAssets();
  }

  reCalculateAssetRows = _debounce((currentAssetRows, newAssets) => {
    const gridParams = getGridParams(currentAssetRows, newAssets, this.state.containerWidth - PADDING_BESIDES_GRID);
    this.setState(gridParams);
  }, 300);

  setGridDimensions = () => {
    this.setState({
      containerWidth: this.assetGridNode.clientWidth - getScrollBarWidth(),
    });
  };

  setAssetGridRef = ref => {
    this.assetGridNode = ref;
  }

  loadAssets = () => {
    this.setState({isLoading: true});
    fetchAssets()
      .then(assets => {
        this.reCalculateAssetRows(this.state.assetRows, assets);
        this.reCalculateAssetRows.flush();
      });
  }

  showAssetPreview = (previewAssetIndex) => {
    this.setState({previewAssetIndex});
  }

  closePreview = () => {
    this.setState({previewAssetIndex: undefined});
  }

  renderAssetCard = (assetDetails) => {
    const {asset} = assetDetails;
    const AssetCard = ASSET_TYPE_TO_CARD[AssetReader.type(asset)];
    return (
      <AssetCard
        key={AssetReader.id(asset)}
        asset={asset}
        assetDimensions={assetDetails.dimensions}
        assetPositions={assetDetails.positions}
        assetClass='AssetGrid__assetContainer'
        onClick={() => {this.showAssetPreview(assetDetails.index)}}
      />
    );
  }

  renderFullscreenPreview() {
    return (
      <FullScreenPreivew
        assets={getAssetsFromAssetRows(this.state.assetRows)}
        currentIndex={this.state.previewAssetIndex}
        onClosePreview={this.closePreview}
      />
    );
  }

  renderAssetGrid() {
    const {state}  = this;
    return (
      <AssetGrid
        assetRows={state.assetRows}
        assetRenderer={this.renderAssetCard}
        containerHeight={state.containerHeight}
      />
    );
  }

  render() {
    const {state} = this;
    return (
      <div className='AssetGrid__container' ref={this.setAssetGridRef}>
        {state.containerHeight ? this.renderAssetGrid() : null}
        {!_isUndefined(state.previewAssetIndex) ? this.renderFullscreenPreview() :null}
      </div>
    );
  }
}

export default AssetGridContainer;
