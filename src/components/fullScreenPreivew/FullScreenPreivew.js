import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './FullScreenPreivew.css';

import AssetReader from '../../readers/asset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {STORAGE_PATH} from '../../constants/asset';

class FullScreenPreivew extends PureComponent {
  renderHeader = () => {
    return (
      <div className="FullScreenPreivew_header">
        <FontAwesomeIcon icon="times" className="FullScreenPreivew_closeIcon" size="1x" onClick={this.props.onClosePreview} />

      </div>
    );
  };

  render() {
    return (
      <div className="FullScreenPreivew_container">
        {this.renderHeader()}
        <img src={`${STORAGE_PATH}/${this.props.asset.src}`} className="FullScreenPreivew_asset" />
      </div>
    );
  }
}

export default FullScreenPreivew;
