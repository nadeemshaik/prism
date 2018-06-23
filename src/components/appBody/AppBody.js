import React, {PureComponent} from 'react';
import './AppBody.css';

import Sidebar from '../appSidebar';
import AssetGrid from '../assetGrid';

class AppBody extends PureComponent {
  render() {
    return (
      <div className='Body__container'>
        <Sidebar />
        <AssetGrid />
      </div>
    );
  }
}

export default AppBody;
