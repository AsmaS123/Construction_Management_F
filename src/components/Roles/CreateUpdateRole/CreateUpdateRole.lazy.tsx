import React, { lazy, Suspense } from 'react';

const LazyCreateUpdateRole = lazy(() => import('./CreateUpdateRole'));

const CreateUpdateRole = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCreateUpdateRole {...props} />
  </Suspense>
);

export default CreateUpdateRole;
