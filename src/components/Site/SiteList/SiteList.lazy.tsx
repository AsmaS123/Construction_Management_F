import React, { lazy, Suspense } from "react";

const LazySiteList = lazy(() => import("./SiteList"));

const SiteList = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazySiteList {...props} />
  </Suspense>
);

export default SiteList;
