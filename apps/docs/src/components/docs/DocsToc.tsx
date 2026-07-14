import type { TableOfContents } from 'fumadocs-core/toc';

import { styled } from 'styled-system/jsx';

const Aside = styled('aside', {
  base: {
    display: 'none',
    flexShrink: 0,
    paddingTop: '8',
    paddingInline: '16',
    width: '24rem',
    desktop: { display: 'block' },
  },
});

const Sticky = styled('nav', {
  base: {
    position: 'sticky',
    top: 'calc(5.6rem + 2.4rem)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
  },
});

const Title = styled('p', {
  base: {
    textStyle: 'body.small-bold',
    color: 'text.heading',
    marginBottom: '4',
  },
});

const List = styled('ul', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    margin: '0',
    padding: '0',
    listStyle: 'none',
  },
});

const Anchor = styled('a', {
  base: {
    textStyle: 'body.small-normal',
    display: 'block',
    color: 'text.default',
    textDecoration: 'none',
    lineHeight: '1.5',
    transitionProperty: 'color',
    transitionDuration: '0.2s',
    _hover: { color: 'text.heading' },
  },
});

function indentFor(depth: number) {
  return `${Math.max(0, depth - 2) * 1.2}rem`;
}

export default function DocsToc({ toc }: { toc: TableOfContents }) {
  if (!toc || toc.length === 0) {
    return null;
  }

  return (
    <Aside>
      <Sticky>
        <Title>On this page</Title>
        <List>
          {toc.map((item) => (
            <li key={item.url}>
              <Anchor
                href={item.url}
                style={{ paddingLeft: indentFor(item.depth) }}
              >
                {item.title}
              </Anchor>
            </li>
          ))}
        </List>
      </Sticky>
    </Aside>
  );
}
