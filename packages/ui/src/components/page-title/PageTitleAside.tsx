import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type PageTitleAsideProps = ComponentProps<'div'>;

export const PageTitleAside = styled('div', {
  base: {
    display: { base: 'none', tablet: 'flex' },
    alignItems: 'center',
    gap: '4',
    flexShrink: 0,
  },
}) as unknown as FC<PageTitleAsideProps>;
