import React, { lazy, Suspense } from "react";

const LazySiteDetailExpensesList = lazy(
  () => import("./SiteDetailExpensesList"),
);

const SiteDetailExpensesList = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazySiteDetailExpensesList {...props} />
  </Suspense>
);

export default SiteDetailExpensesList;
