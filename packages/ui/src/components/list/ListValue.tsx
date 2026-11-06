import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type ListValueProps = ComponentProps<'div'>;

export const ListValue = styled('div', {
  base: {
    textStyle: 'body.medium-normal',
    flex: '1',
    minWidth: '0',
    color: 'text.default',
    overflowWrap: 'break-word',
  },
}) as unknown as FC<ListValueProps>;
