import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type BadgeProps = ComponentProps<'span'>;

export const Badge = styled('span', {
  base: {
    textStyle: 'body.small-normal',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBlock: '4',
    paddingInline: '12',
    borderRadius: 'full',
    whiteSpace: 'nowrap',
    backgroundColor: 'layout.bg-light-blue',
    color: 'text.processing',
  },
}) as unknown as FC<BadgeProps>;
