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

const themeScript = `(function(){try{var raw=localStorage.getItem('vinyl-ui-theme');var v=raw?JSON.parse(raw):'system';var dark=v==='dark'||(v==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(dark)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
    >
    <body>
    <script dangerouslySetInnerHTML={{ __html: themeScript }} />
    {children}
    </body>
    </html>
  );
}
