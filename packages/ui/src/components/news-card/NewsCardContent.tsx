import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type NewsCardContentProps = ComponentProps<'div'>;

export const NewsCardContent = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
  },
}) as unknown as FC<NewsCardContentProps>;
