import React, { lazy, Suspense } from "react";

const LazyDialogComponent = lazy(() => import("./DialogComponent"));

const DialogComponent = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazyDialogComponent {...props} />
  </Suspense>
);

export default DialogComponent;
