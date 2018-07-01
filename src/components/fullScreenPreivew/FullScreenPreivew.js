import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './FullScreenPreivew.css';

import AssetReader from '../../readers/asset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {STORAGE_PATH} from '../../constants/asset';
import {CONTROL_TYPES, CONTROL_SECTION_CLASSES, CONTROL_CLASSES, CONTROL_ICONS} from './constants/controls';

class FullScreenPreivew extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: props.currentIndex,
    };
    this.controlToIndexer = {
      [CONTROL_TYPES.LEFT]: this.decreaseIndex,
      [CONTROL_TYPES.RIGHT]: this.increaseIndex,
    };
  }

  increaseIndex = () => {
    this.setState({currentIndex: this.state.currentIndex + 1});
  };

  decreaseIndex = () => {
    this.setState({currentIndex: this.state.currentIndex - 1});
  };

  renderHeader = () => {
    return (
      <div className="FullScreenPreivew__header">
        <FontAwesomeIcon icon="arrow-left" className="FullScreenPreivew__navIcon" size="1x" onClick={this.props.onClosePreview} />
      </div>
    );
  };

  renderNavControls = (controlType) => {
    return (
      <div className={`FullScreenPreivew__control-section ${CONTROL_SECTION_CLASSES[controlType]}`}>
        <div className={`FullScreenPreivew__control ${CONTROL_CLASSES[controlType]} `} onClick={this.controlToIndexer[controlType]} >
          <FontAwesomeIcon icon={CONTROL_ICONS[controlType]} className={`FullScreenPreivew__navIcon FullScreenPreivew__controlIcon`}/>
        </div>
      </div>
    );
  };

  renderBody() {
    const {assets} = this.props,
      {currentIndex} = this.state;
    return (
      <div className="FullScreenPreivew__body">
        <img src={`${STORAGE_PATH}/${assets[currentIndex].src}`} className="FullScreenPreivew__asset" />
        {currentIndex !== 0 ? this.renderNavControls(CONTROL_TYPES.LEFT) : null}
        {currentIndex !== assets.length - 1 ? this.renderNavControls(CONTROL_TYPES.RIGHT) : null}
      </div>
    );
  }

  render() {
    return (
      <div className="FullScreenPreivew__container">
        {this.renderHeader()}
        {this.renderBody()}
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
