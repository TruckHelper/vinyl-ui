import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type ListActionProps = ComponentProps<'div'>;

export const ListAction = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16',
    '& > :last-child:not(:first-child)': { flexShrink: 0 },
  },
}, { defaultProps: { 'data-list-action': '' } }) as unknown as FC<ListActionProps>;
