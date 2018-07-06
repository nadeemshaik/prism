import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//libs
import _forEach from 'lodash/forEach';
import _reduce from 'lodash/reduce';
import _partial from 'lodash/partial';
import _isUndefined from 'lodash/isUndefined';

//readers
import AssetReader from '../../readers/asset';

//constants
import {ASSET_TYPE_TO_CARD} from '../../constants/asset';

//components
import FullScreenPreivew from '../fullScreenPreivew';

//utils
import {getAssetsFromAssetRows} from '../../utils/assetGrid';

class AssetGrid extends PureComponent {

  state = {
    previewAssetIndex: undefined,
  };

  showAssetPreview = (previewAssetIndex) => {
    this.setState({previewAssetIndex});
  }

  closeAssetPreview = () => {
    this.setState({previewAssetIndex: undefined});
  }

  renderFullscreenPreview() {
    return (
      <FullScreenPreivew
        assets={getAssetsFromAssetRows(this.props.assetRows)}
        currentIndex={this.state.previewAssetIndex}
        onClosePreview={this.closeAssetPreview}
        containerScroller={this.props.containerScroller}
      />
    );
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
        onClick={_partial(this.showAssetPreview, assetDetails.index)}
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
        {!_isUndefined(this.state.previewAssetIndex) ? this.renderFullscreenPreview() :null}
      </div>
    );
  }
}

AssetGrid.propTypes = {
  assetRows: PropTypes.array.isRequired,
  assetRenderer: PropTypes.func.isRequired,
  containerHeight: PropTypes.number,
  containerScroller: PropTypes.object,
};

export default AssetGrid;
