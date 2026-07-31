import type { Item } from 'fumadocs-core/page-tree';
import Link from 'next/link';

import { styled } from 'styled-system/jsx';

const NavLink = styled(Link, {
  base: {
    textStyle: 'body.small-normal',
    display: 'block',
    paddingBlock: '6',
    paddingInline: '8',
    borderRadius: '0.6rem',
    color: 'text.default',
    textDecoration: 'none',
    transitionProperty: 'color, background-color',
    transitionDuration: '0.2s',
    _hover: { color: 'text.heading', backgroundColor: 'layout.bg-light-gray' },
  },
  variants: {
    active: {
      true: {
        fontWeight: 'bold',
        color: 'text.accent-primary',
        backgroundColor: 'layout.bg-light-blue',
      },
    },
  },
});

export default function PageLink({ item, pathname }: { item: Item; pathname: string }) {
  return (
    <NavLink
      href={item.url}
      active={pathname === item.url}
    >
      {item.name}
    </NavLink>
  );
}
