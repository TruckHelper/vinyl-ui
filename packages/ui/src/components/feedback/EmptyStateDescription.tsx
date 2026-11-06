import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type EmptyStateDescriptionProps = ComponentProps<'p'>;

export const EmptyStateDescription = styled('p', {
  base: {
    textStyle: 'body.medium-light',
    color: 'text.soft',
  },
}) as unknown as FC<EmptyStateDescriptionProps>;
