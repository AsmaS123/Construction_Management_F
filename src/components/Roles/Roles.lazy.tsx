import React, { lazy, Suspense } from "react";

const LazyRoles = lazy(() => import("./Roles"));

const Roles = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazyRoles {...props} />
  </Suspense>
);

export default Roles;
