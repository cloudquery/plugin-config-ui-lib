import React from 'react';

export * from './controls';
export * from './display';
export * from './fields';

/**
 * This component is used in the development mode of the custom plugin config UI
 * and is used to mock the Cloud App.
 *
 * @public
 */
const CloudAppMock = React.lazy(() =>
  import('./cloudAppMock').then(({ CloudAppMock }) => ({ default: CloudAppMock })),
);

export { CloudAppMock };
