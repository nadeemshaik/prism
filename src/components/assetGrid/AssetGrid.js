import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import _forEach from 'lodash/forEach';
import _reduce from 'lodash/reduce';

class AssetGrid extends PureComponent {
  render() {
    const {props} = this;
    return (
      <div style={{position: 'relative', height: props.containerHeight}}>
        {
          _reduce(props.assetRows, (assets, assetRow) => {
            _forEach(assetRow.assets, assetDetails => {
              assets.push(props.assetRenderer(assetDetails));
            });
            return assets;
          }, [])
        }
      </div>
    );
  }
}

AssetGrid.propTypes = {
  assetRows: PropTypes.array.isRequired,
  assetRenderer: PropTypes.func.isRequired,
  containerHeight: PropTypes.number,
};

export default AssetGrid;
