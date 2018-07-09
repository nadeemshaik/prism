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

//constants
import {RUNWAY_PADDING_FACTOR} from '../../constants/gridConfig';

//utils
import InfiniteScrollerUtil from '../../utils/infiniteScroller';
import getScrollBarWidth from '../../utils/getScrollBarWidth';

//services
import {fetchAssets} from '../../services/assets';

const PADDING_BESIDES_GRID = 100;

class AssetGridContainer extends PureComponent {
  state = {
    containerHeight: 0,
    assetRows: [],
    scoller: undefined,
  };

  componentDidMount() {
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

  getGridWidth = () => {
    return this.assetGridNode.clientWidth - getScrollBarWidth() - PADDING_BESIDES_GRID;
  };

  getRunwayBoundaries = () => {
    const runwayContainer = this.assetGridNode;
    let runwayTop = runwayContainer.scrollTop - RUNWAY_PADDING_FACTOR * runwayContainer.clientHeight;
    let runwayBottom = runwayContainer.scrollTop + 2 * RUNWAY_PADDING_FACTOR * runwayContainer.clientHeight;

    if (runwayTop < 0) {
      runwayTop = 0;
    }

    if (runwayBottom > this.infiniteScrollerUtil.containerHeight) {
      runwayBottom = this.infiniteScrollerUtil.containerHeight;
    }

    return {
      runwayTop,
      runwayBottom,
    };
  };

  reCalculateAssetRows = _debounce(() => {
    this.infiniteScrollerUtil.generateGridParams();
    this.setState({
      assetRows: this.infiniteScrollerUtil.getVisibleAssets(this.getRunwayBoundaries()),
      containerHeight: this.infiniteScrollerUtil.containerHeight,
    });
  }, 300);

  onResize = () => {
    this.infiniteScrollerUtil.setParams(undefined, this.getGridWidth());
    this.reCalculateAssetRows();
  };

  setAssetGridRef = ref => {
    this.assetGridNode = ref;
  };

  loadAssets = () => {
    fetchAssets()
      .then(assets => {
        this.infiniteScrollerUtil = new InfiniteScrollerUtil(assets, this.getGridWidth());
        this.reCalculateAssetRows();
        this.reCalculateAssetRows.flush();

        this.setEventListeners();
      });
  }

  setEventListeners = () => {
    // resize sould only start after first round of calculation
    window.addEventListener('resize', this.onResize);
    this.assetGridNode.addEventListener('scroll', () => {
      this.setState({
        assetRows: this.infiniteScrollerUtil.getVisibleAssets(this.getRunwayBoundaries()),
      });
    });
  };

  renderAssetGrid() {
    const {state}  = this;
    return (
      <AssetGrid
        completeAssets={this.infiniteScrollerUtil.assets}
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
