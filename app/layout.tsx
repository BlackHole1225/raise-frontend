import React from 'react'; // Import React to fix the 'React' must be in scope when using JSX error
import clsx from 'clsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Providers } from './providers';
import { fontHeading, fontBody } from '@/config/fonts';
import Notification from '@/components/notification';
import { GOOGLE_CLIENT_ID } from '@/utils/constants';
import '@/styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head className="light" />
      <body
        className={clsx(
          'min-h-screen bg-background font-body',
          fontBody.variable,
          fontHeading.variable
        )}>
        <Notification />
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Providers>{children}</Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
