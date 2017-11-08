import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

// React Hot Module Replacement Configuration
const app = document.createElement('div');
document.body.appendChild(app);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    app,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => { render(App); });
}
