import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './FullScreenPreivew.css';

import AssetReader from '../../readers/asset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {STORAGE_PATH} from '../../constants/asset';

class FullScreenPreivew extends PureComponent {
  renderHeader = () => {
    return (
      <div className="FullScreenPreivew__header">
        <FontAwesomeIcon icon="times" className="FullScreenPreivew__closeIcon" size="1x" onClick={this.props.onClosePreview} />
      </div>
    );
  };

  render() {
    const {props} = this;
    return (
      <div className="FullScreenPreivew__container">
        {this.renderHeader()}
        <img src={`${STORAGE_PATH}/${props.assets[props.currentIndex].src}`} className="FullScreenPreivew__asset" />
      </div>
    );
  }
}

FullScreenPreivew.propTypes = {
  assets: PropTypes.array,
  currentIndex: PropTypes.number,
};

FullScreenPreivew.defaultProps = {
  currentIndex: 0,
};

export default FullScreenPreivew;
