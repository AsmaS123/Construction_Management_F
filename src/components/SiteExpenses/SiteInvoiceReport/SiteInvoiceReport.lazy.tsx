import React, { lazy, Suspense } from "react";

const LazySiteInvoiceReport = lazy(() => import("./SiteInvoiceReport"));

const SiteInvoiceReport = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazySiteInvoiceReport {...props} />
  </Suspense>
);

export default SiteInvoiceReport;
