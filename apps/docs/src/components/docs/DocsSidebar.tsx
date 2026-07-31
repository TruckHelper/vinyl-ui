'use client';

import type { Root } from 'fumadocs-core/page-tree';
import { usePathname } from 'next/navigation';

import { styled } from 'styled-system/jsx';

import SidebarNode from './SidebarNode';

const Container = styled('aside', {
  base: {
    display: 'none',
    flexShrink: 0,
    width: '26rem',
    borderRight: '1px solid',
    borderColor: 'layout.default-line',
    tablet: { display: 'block' },
  },
});

const Sticky = styled('nav', {
  base: {
    position: 'sticky',
    top: '5.6rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
    paddingBlock: '24',
    paddingInline: '16',
    maxHeight: 'calc(100vh - 5.6rem)',
    overflowY: 'auto',
  },
});

export default function DocsSidebar({ tree }: { tree: Root }) {
  const pathname = usePathname();

  return (
    <Container>
      <Sticky aria-label="문서 목록">
        {tree.children.map((node, i) => (
          <SidebarNode
            key={i}
            node={node}
            pathname={pathname}
          />
        ))}
      </Sticky>
    </Container>
  );
}
