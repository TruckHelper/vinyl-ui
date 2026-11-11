import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type NewsCardTitleProps = ComponentProps<'h3'>;

export const NewsCardTitle = styled('h3', {
  base: {
    textStyle: 'heading.medium-bold',
    color: 'text.heading',
  },
}) as unknown as FC<NewsCardTitleProps>;
