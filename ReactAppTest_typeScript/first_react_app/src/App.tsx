import * as React from 'react';
import './App.css';

import Counter from './component/Counter';
import ProfileF from './component/ProfileF';


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <ProfileF name ='tnrms' job='student'/>
        <Counter/>
      </div>
    );
  }
}

export default App;
