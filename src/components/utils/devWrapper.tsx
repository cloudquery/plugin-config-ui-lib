import React, { Fragment, Suspense } from 'react';

import { CloudAppMockProps } from './cloudAppMock';

const CloudAppMock: React.FC<any> = React.lazy(() =>
  import('./cloudAppMock').then(({ CloudAppMock }) => ({
    default: CloudAppMock,
  })),
);

const CloudAppMockWrapper = (props: any) => (
  <Suspense>
    <CloudAppMock {...props} />
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
