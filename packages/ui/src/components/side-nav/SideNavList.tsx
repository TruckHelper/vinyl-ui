import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type SideNavListProps = ComponentProps<'ul'>;

export const SideNavList = styled('ul', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
    margin: '0',
    padding: '0',
    listStyle: 'none',
  },
}) as unknown as FC<SideNavListProps>;
