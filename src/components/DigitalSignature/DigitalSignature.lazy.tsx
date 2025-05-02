import React, { lazy, Suspense } from 'react';

const LazyDigitalSignature = lazy(() => import('./DigitalSignature'));

const DigitalSignature = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDigitalSignature {...props} />
  </Suspense>
);

export default DigitalSignature;
