import React, { lazy, Suspense } from 'react';

const LazyChatBot = lazy(() => import('./ChatBot'));

const ChatBot = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyChatBot {...props} />
  </Suspense>
);

export default ChatBot;
