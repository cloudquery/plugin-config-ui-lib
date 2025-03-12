import React from 'react';

import { getAppRootElements } from '@cloudquery/plugin-config-ui-lib';
import ReactDOM from 'react-dom/client';

import App from './App';

const { rootElement, shadowRootContainer } = getAppRootElements();

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App container={shadowRootContainer} />
  </React.StrictMode>,
);
