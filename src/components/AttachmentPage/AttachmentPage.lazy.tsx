import React, { lazy, Suspense } from "react";

const LazyAttachmentPage = lazy(() => import("./AttachmentPage"));

const AttachmentPage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazyAttachmentPage {...props} />
  </Suspense>
);

export default AttachmentPage;
