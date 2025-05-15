import React, { lazy, Suspense } from "react";

const LazyContractor = lazy(() => import("./Contractor"));

const Contractor = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazyContractor {...props} />
  </Suspense>
);

export default Contractor;
