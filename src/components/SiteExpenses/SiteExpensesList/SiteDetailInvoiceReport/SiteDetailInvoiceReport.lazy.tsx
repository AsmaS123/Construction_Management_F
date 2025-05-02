import React, { lazy, Suspense } from 'react';

const LazySiteDetailInvoiceReport = lazy(() => import('./SiteDetailInvoiceReport'));

const SiteDetailInvoiceReport = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySiteDetailInvoiceReport {...props} />
  </Suspense>
);

export default SiteDetailInvoiceReport;
