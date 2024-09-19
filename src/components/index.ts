import React from 'react';

export * from './controls';
export * from './display';
export * from './fields';

const CloudAppMock = React.lazy(() =>
  import('./cloudAppMock').then(({ CloudAppMock }) => ({ default: CloudAppMock })),
);

export { CloudAppMock };
