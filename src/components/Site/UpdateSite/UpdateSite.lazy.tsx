import React, { lazy, Suspense } from "react";

const LazyUpdateSite = lazy(() => import("./UpdateSite"));

const UpdateSite = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazyUpdateSite {...props} />
  </Suspense>
);

export default UpdateSite;
