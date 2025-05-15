import React, { lazy, Suspense } from "react";

const LazySiteExpensesList = lazy(() => import("./SiteExpensesList"));

const SiteExpensesList = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazySiteExpensesList {...props} />
  </Suspense>
);

export default SiteExpensesList;
