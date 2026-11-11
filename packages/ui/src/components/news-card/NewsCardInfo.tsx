import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type NewsCardInfoProps = ComponentProps<'div'>;

export const NewsCardInfo = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16',
  },
}) as unknown as FC<NewsCardInfoProps>;
