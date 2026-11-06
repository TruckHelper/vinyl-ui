import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type EmptyStateTitleProps = ComponentProps<'p'>;

export const EmptyStateTitle = styled('p', {
  base: {
    textStyle: 'body.large-normal',
    color: 'text.default',
  },
}) as unknown as FC<EmptyStateTitleProps>;
