import React, {PureComponent} from 'react';

//css
import './AssetGrid.css';
import '../assetCards/assetCards.css';
import '../assetTags/image/ImageTag.css';

//libs
import _debounce from 'lodash/debounce';
import zenscroll from 'zenscroll';

//components
import AssetGrid from './AssetGrid';

//utils
import {getAssetsFromAssetRows} from '../../utils/assetGrid';
import {getGridParams} from '../../utils/assetGrid';
import getScrollBarWidth from '../../utils/getScrollBarWidth';

//services
import {fetchAssets} from '../../services/assets';

const PADDING_BESIDES_GRID = 100;

class AssetGridContainer extends PureComponent {
  state = {
    containerWidth: 0,
    containerHeight: 0,
    assetRows: [],
    scoller: undefined,
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.setGridDimensions();
    this.loadAssets();
    this.setScrollContainer();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  setScrollContainer() {
    const scrollContainer = document.getElementById('AssetGrid__scroller');
    this.setState({scroller: zenscroll.createScroller(scrollContainer, 500, 30)});
  }

  onResize = event => {
    this.setGridDimensions();
    this.reCalculateAssetRows([], getAssetsFromAssetRows(this.state.assetRows));
  };

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
    fetchAssets()
      .then(assets => {
        this.reCalculateAssetRows(this.state.assetRows, assets);
        this.reCalculateAssetRows.flush();
      });
  }

  renderAssetGrid() {
    const {state}  = this;
    return (
      <AssetGrid
        assetRows={state.assetRows}
        containerScroller={state.scroller}
        containerHeight={state.containerHeight}
      />
    );
  }

  render() {
    const {state} = this;
    return (
      <div className='AssetGrid__container' id='AssetGrid__scroller' ref={this.setAssetGridRef}>
        {state.containerHeight ? this.renderAssetGrid() : null}
      </div>
    );
  }
}

export default AssetGridContainer;
