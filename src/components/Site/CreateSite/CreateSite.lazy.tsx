import React, { lazy, Suspense } from 'react';

const LazyCreateSite = lazy(() => import('./CreateSite'));

const CreateSite = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCreateSite {...props} />
  </Suspense>
);

export default CreateSite;
