import React, { lazy, Suspense } from 'react';

const LazyUnAuthorised = lazy(() => import('./UnAuthorised'));

const UnAuthorised = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyUnAuthorised {...props} />
  </Suspense>
);

export default UnAuthorised;
