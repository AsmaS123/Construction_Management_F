import React, { lazy, Suspense } from 'react';

const LazyPasswordInput = lazy(() => import('./PasswordInput'));

const PasswordInput = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPasswordInput {...props} />
  </Suspense>
);

export default PasswordInput;
