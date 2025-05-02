import React, { lazy, Suspense } from 'react';

const LazyRoleList = lazy(() => import('./RoleList'));

const RoleList = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRoleList {...props} />
  </Suspense>
);

export default RoleList;
