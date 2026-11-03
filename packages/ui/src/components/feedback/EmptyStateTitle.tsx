import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

export const EmptyStateTitle = styled('p', {
  base: {
    textStyle: 'body.large-normal',
    color: 'text.default',
  },
});

export type EmptyStateTitleProps = ComponentProps<typeof EmptyStateTitle>;
