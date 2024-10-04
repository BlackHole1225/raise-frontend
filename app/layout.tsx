import "@/styles/globals.css";
import React from 'react'; // Import React to fix the 'React' must be in scope when using JSX error
import clsx from 'clsx';

import { Providers } from './providers';
import { fontHeading, fontBody } from '@/config/fonts';
import Notification from '@/components/notification';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head className="light" />
      <body
        className={clsx(
          'min-h-screen bg-background font-body',
          fontBody.variable,
          fontHeading.variable
        )}
      >
         <Notification />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
