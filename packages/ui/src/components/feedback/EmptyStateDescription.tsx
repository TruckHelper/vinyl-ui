import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

export const EmptyStateDescription = styled('p', {
  base: {
    textStyle: 'body.medium-light',
    color: 'text.soft',
  },
});

export type EmptyStateDescriptionProps = ComponentProps<typeof EmptyStateDescription>;
