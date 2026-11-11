import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type NewsCardDateProps = ComponentProps<'time'>;

export const NewsCardDate = styled('time', {
  base: {
    textStyle: 'body.medium-light',
    color: 'text.soft',
  },
}) as unknown as FC<NewsCardDateProps>;
