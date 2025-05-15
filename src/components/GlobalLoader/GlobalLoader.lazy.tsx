import React, { lazy, Suspense } from "react";

const LazyGlobalLoader = lazy(() => import("./GlobalLoader"));

const GlobalLoader = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazyGlobalLoader {...props} />
  </Suspense>
);

export default GlobalLoader;
