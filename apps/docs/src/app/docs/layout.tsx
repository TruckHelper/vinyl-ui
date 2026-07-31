import type { ReactNode } from 'react';

import { source } from '@/lib/source';

import DocsShell from '@/components/docs/DocsShell';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsShell tree={source.getPageTree()}>
      {children}
    </DocsShell>
  );
}
