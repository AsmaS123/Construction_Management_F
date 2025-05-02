import React, { lazy, Suspense } from 'react';

const LazyOffice = lazy(() => import('./Office'));

const Office = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOffice {...props} />
  </Suspense>
);

export default Office;
