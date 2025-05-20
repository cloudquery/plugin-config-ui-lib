import React, { Fragment, Suspense } from 'react';

import { VirtuosoMockContext } from 'react-virtuoso';

import { CloudAppMockProps } from './cloudAppMock';

const CloudAppMock: React.FC<any> = React.lazy(() =>
  import('./cloudAppMock').then(({ CloudAppMock }) => ({
    default: CloudAppMock,
  })),
);

// eslint-disable-next-line no-console
console.log('env', process.env.NODE_ENV);

const CloudAppMockWrapper = (props: any) => (
  <Suspense>
    {process.env.NODE_ENV === 'test' ? (
      <VirtuosoMockContext.Provider value={{ viewportHeight: 300, itemHeight: 100 }}>
        <CloudAppMock {...props} />
      </VirtuosoMockContext.Provider>
    ) : (
      <CloudAppMock {...props} />
    )}
  </Suspense>
);

const useCloudAppMock =
  (process.env.REACT_APP_USE_CLOUD_APP_MOCK === 'true' || process.env.NODE_ENV !== 'production') &&
  window.self === window.top;
const Wrapper = useCloudAppMock ? CloudAppMockWrapper : Fragment;

export function DevWrapper({
  children,
  ...props
}: { children: React.ReactNode } & Partial<CloudAppMockProps>) {
  const wrapperProps = useCloudAppMock ? props : {};

  return <Wrapper {...wrapperProps}>{children}</Wrapper>;
}
