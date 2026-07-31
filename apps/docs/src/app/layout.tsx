import React from 'react';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Vinyl UI',
    template: '%s | Vinyl UI',
  },
  description: 'React + Panda CSS component library',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
    <head>
      <link
        rel="preconnect"
        href="https://spoqa.github.io"
      />
      <link
        rel="stylesheet"
        href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
      />
    </head>
    <body>
    {children}
    </body>
    </html>
  );
}
