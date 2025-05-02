import React, { lazy, Suspense } from 'react';

const LazySiteExpenses = lazy(() => import('./SiteExpenses'));

const SiteExpenses = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySiteExpenses {...props} />
  </Suspense>
);

export default SiteExpenses;
