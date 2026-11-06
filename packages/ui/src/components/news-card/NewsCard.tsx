import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type NewsCardProps = ComponentProps<'article'>;

export const NewsCard = styled('article', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12',
    width: '100%',
  },
}) as unknown as FC<NewsCardProps>;
