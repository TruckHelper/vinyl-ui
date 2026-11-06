import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type PageTitleProps = ComponentProps<'header'>;

export const PageTitle = styled('header', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
}) as unknown as FC<PageTitleProps>;
