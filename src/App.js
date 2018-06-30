import React, {PureComponent} from 'react';
import './icons';

import './App.css';

import Header from './components/appHeader';
import Body from './components/appBody';

class App extends PureComponent {
  render() {
    return (
      <div className='App__container'>
        <Header />
        <Body />
      </div>
    );
  }
}

export default App;
