import React from 'react';
import SanFranMap from './SanFranMap'

class App extends React.Component {
  constructor() {
    super();
    this.state = { build: [], activeBuild: 0 };
  }

  render() {
    return (
      <div>
         <h1>Hello World</h1>
        <SanFranMap />
      </div>
    );
  }
}

export default App;
