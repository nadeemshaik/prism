import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite';

import _map from 'lodash/map';

class InfiniteScroller extends PureComponent {

  renderInfinityRows() {
    const {props} = this;
    let itemsRendered = 0;
    return _map(props.itemRows, (itemRow, rowIndex) => {
      const rowNode = props.rowRenderer(itemRow, itemsRendered);
      itemsRendered += itemRow.assets.length;
      return rowNode;
    });
  }

  render() {
    const {props} = this;
    return (
      <div className="InfiniteScroll_container">
        <InfiniteScroll
          elementHeight={props.elementHeight}
          containerHeight={props.containerHeight}
          onInfiniteLoad={props.loadMoreItems}
          isInfiniteLoading={props.isLoading}
          infiniteLoadBeginEdgeOffset={props.loadingOffset}
          loadingSpinnerDelegate={props.loadingSpinner}
          className={props.containerClassName}
          >
            {this.renderInfinityRows()}
          </InfiniteScroll>
      </div>
    );
  }
}

InfiniteScroller.propTypes = {
  containerHeight: PropTypes.number.isRequired,
  elementHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]).isRequired,
  loadMoreItems: PropTypes.func,
  isLoading: PropTypes.bool,
  loadingOffset: PropTypes.number,
  loadingSpinner: PropTypes.node,
  rowRenderer: PropTypes.func.isRequired,
  containerClassName: PropTypes.string,
};

InfiniteScroller.defaultProps = {
  loadingOffset: 250,
  isLoading: false,
  containerClassName: '',
};

export default InfiniteScroller;
