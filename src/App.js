import React, {PureComponent} from 'react';
import './icons';

import './App.css';

import Body from './components/appBody';

class App extends PureComponent {
  render() {
    return (
      <div className='App__container'>
        <Body />
      </div>
    );
  }
}

export default App;
