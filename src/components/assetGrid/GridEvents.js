import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//libs
import Mousetrap from 'mousetrap';
import _partial from 'lodash/partial';
import _debounce from 'lodash/debounce';

//readers
import AssetReader from '../../readers/asset';

//utils
import {calculateFirstVisibleAsset} from '../../utils/assetGrid';

export default ChildComponent => {
  class GridEvents extends PureComponent {

    constructor(props) {
      super(props);

      this.state = {
        previewAssetIndex: undefined,
        focusedAssetIndex: undefined,
        selectedAssets: [],
      };

      this.bindKeyboardEvents();
    }

    bindKeyboardEvents = () => {
      Mousetrap.bind('left', _partial(this.handleArrow, -1));
      Mousetrap.bind('right', _partial(this.handleArrow, 1));

      Mousetrap.bind('esc', this.handleESC);
      Mousetrap.bind('enter', this.showFocusedAssetPreview);
    };

    isPreviewOpen = () => {
      return this.state.previewAssetIndex !== undefined;
    }

    handleArrow = increamentBy => {
      const action = this.isPreviewOpen() ? this.changePreview : this.changeFocus;
      action(increamentBy);
    };

    handleESC = () => {
      // close preview
      if (this.isPreviewOpen()) {
        this.closeAssetPreview();
      } else {
        // clear Focused
        this.clearFocus();
      }
    };

    focusAsset = focusedAssetIndex => {
      this.setState({focusedAssetIndex});
      this.scrollFocusedAssetIntoView();
    }

    focusFirstVisibleAsset = () => {
      let firstVisibleAssetIndex = calculateFirstVisibleAsset(this.props.assetRows);
      this.focusAsset(firstVisibleAssetIndex);
    };

    scrollAssetIntoView = _debounce(asset => {
      this.props.containerScroller.intoView(asset);
    }, 50);

    getAssetNode = assetIndex => {
      const asset = this.props.completeAssets[assetIndex];
      return document.querySelector(`[data-id="${AssetReader.id(asset)}"]`);
    };

    scrollFocusedAssetIntoView = () => {
      const focusedAsset = this.getAssetNode(this.state.focusedAssetIndex);
      focusedAsset && this.scrollAssetIntoView(focusedAsset);
    };

    getAssetIndexWithinBounds = assetIndex => {
      const totalAssetsCount = this.props.completeAssets.length;

      let updatedAssetIndex = assetIndex < 0 ?  0 : assetIndex;
      updatedAssetIndex = updatedAssetIndex > totalAssetsCount - 1 ?  totalAssetsCount - 1 : updatedAssetIndex;

      return updatedAssetIndex;
    };

    changeFocus = increamentBy => {
      if (this.state.focusedAssetIndex === undefined) {
        this.focusFirstVisibleAsset();
        return;
      }

      const updatedFocusedIndex = this.getAssetIndexWithinBounds(this.state.focusedAssetIndex + increamentBy);
      const assetNodeToFocus = this.getAssetNode(updatedFocusedIndex);

      assetNodeToFocus && this.focusAsset(updatedFocusedIndex);
    }

    clearFocus = () => {
      this.focusAsset(undefined);
    }

    showFocusedAssetPreview = () => {
      if (this.state.focusedAssetIndex !== undefined) {
        this.showAssetPreview(this.state.focusedAssetIndex);
      }
    }

    changePreview = increamentBy => {
      const updatedPreviewIndex = this.getAssetIndexWithinBounds(this.state.previewAssetIndex + increamentBy);
      this.showAssetPreview(updatedPreviewIndex);
      this.focusAsset(updatedPreviewIndex);
    };

    showAssetPreview = previewAssetIndex => {
      this.setState({previewAssetIndex});
    }

    closeAssetPreview = () => {
      this.showAssetPreview(undefined);
    }

    render() {
      return (
        <ChildComponent
          {...this.props}
          {...this.state}
          showAssetPreview={this.showAssetPreview}
          closeAssetPreview={this.closeAssetPreview}
          changePreview={this.changePreview}
          clearFocus={this.clearFocus}
        />
      );
    }
  }

  GridEvents.propTypes = {
    assetRows: PropTypes.array,
    completeAssets: PropTypes.array,
    containerScroller: PropTypes.object,
  };

  return GridEvents;
};
