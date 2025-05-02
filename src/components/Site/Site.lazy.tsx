import React, { lazy, Suspense } from 'react';

const LazySite = lazy(() => import('./Site'));

const Site = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySite {...props} />
  </Suspense>
);

export default Site;
