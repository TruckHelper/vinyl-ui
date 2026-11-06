import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type ListItemProps = ComponentProps<'li'>;

export const ListItem = styled('li', {
  base: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16',
    paddingBlock: '12',
    borderBottomWidth: '1px',
    borderBottomStyle: 'dashed',
    borderBottomColor: 'layout.default-line',
    _last: { borderBottomStyle: 'none' },
    '&:has(> * > [data-list-action])': { alignItems: 'center' },
  },
}) as unknown as FC<ListItemProps>;
