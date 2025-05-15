import React, { lazy, Suspense } from "react";

const LazyLoaderContext = lazy(() => import("./LoaderContext"));

const LoaderContext = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazyLoaderContext {...props} />
  </Suspense>
);

export default LoaderContext;
