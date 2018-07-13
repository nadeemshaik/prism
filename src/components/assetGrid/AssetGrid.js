import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//libs
import _forEach from 'lodash/forEach';
import _reduce from 'lodash/reduce';
import _partial from 'lodash/partial';
import _isUndefined from 'lodash/isUndefined';
import _noop from 'lodash/noop';

//readers
import AssetReader from '../../readers/asset';

//constants
import {ASSET_TYPE_TO_CARD} from '../../constants/asset';

//components
import GridEvents from './GridEvents';
import FullScreenPreivew from '../fullScreenPreivew';

class AssetGrid extends PureComponent {

  renderFullscreenPreview() {
    return (
      <FullScreenPreivew
        assets={this.props.completeAssets}
        currentIndex={this.props.previewAssetIndex}
        onClosePreview={this.props.closeAssetPreview}
        changePreview={this.props.changePreview}
        containerScroller={this.props.containerScroller}
      />
    );
  }

  renderAssetCard = (assetDetails) => {
    const {asset} = assetDetails;
    const AssetCard = ASSET_TYPE_TO_CARD[AssetReader.type(asset)];
    const isFocused = this.props.focusedAssetIndex === assetDetails.index;
    return (
      <AssetCard
        key={AssetReader.id(asset)}
        {...assetDetails} //asset, dimensions, positions, index
        assetClass='AssetGrid__assetContainer'
        previewImageClass={isFocused ? 'AssetGrid__focusedImage' : ''}
        openAssetPreview={_partial(this.props.showAssetPreview, assetDetails.index)}
        onUnmount={isFocused ? this.props.clearFocus : _noop}
      />
    );
  }

  render() {
    const {props} = this;
    return (
      <div>
        <div style={{position: 'relative', height: props.containerHeight}}>
          {
            _reduce(props.assetRows, (assets, assetRow) => {
              _forEach(assetRow.assets, assetDetails => {
                assets.push(this.renderAssetCard(assetDetails));
              });
              return assets;
            }, [])
          }
        </div>
        {!_isUndefined(this.props.previewAssetIndex) ? this.renderFullscreenPreview() :null}
      </div>
    );
  }
}

AssetGrid.propTypes = {
  completeAssets: PropTypes.array.isRequired,
  assetRows: PropTypes.array.isRequired,
  previewAssetIndex: PropTypes.number,
  focusedAssetIndex: PropTypes.number,
  closeAssetPreview: PropTypes.func.isRequired,
  showAssetPreview: PropTypes.func.isRequired,
  changePreview: PropTypes.func.isRequired,
  clearFocus: PropTypes.func.isRequired,
  containerHeight: PropTypes.number,
  containerScroller: PropTypes.object,
};

export default GridEvents(AssetGrid);
