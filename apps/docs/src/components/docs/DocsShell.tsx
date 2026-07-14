import type { Root } from 'fumadocs-core/page-tree';
import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx';

import Navbar from '../landing/Navbar';
import DocsSidebar from './DocsSidebar';

const Container = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'layout.bg-light',
  },
});

const Header = styled('div', {
  base: {
    zIndex: 'sticky',
    position: 'sticky',
    top: '0',
    width: '100%',
  },
});

const Body = styled('div', {
  base: {
    display: 'flex',
    flex: '1',
    marginInline: 'auto',
    width: '100%',
    maxWidth: '144rem',
  },
});

const Main = styled('main', {
  base: {
    flex: '1',
    minWidth: '0',
  },
});

export default function DocsShell({ tree, children }: { tree: Root; children: ReactNode }) {
  return (
    <Container>
      <Header>
        <Navbar />
      </Header>
      <Body>
        <DocsSidebar tree={tree} />
        <Main>{children}</Main>
      </Body>
    </Container>
  );
}
