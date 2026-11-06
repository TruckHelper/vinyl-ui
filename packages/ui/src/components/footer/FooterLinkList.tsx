import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type FooterLinkListProps = ComponentProps<'div'>;

export const FooterLinkList = styled('div', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: '12',
    rowGap: '4',
    '& a': {
      textStyle: 'body.small-light',
      color: 'text.soft',
      textDecoration: 'none',
    },
  },
}) as unknown as FC<FooterLinkListProps>;
