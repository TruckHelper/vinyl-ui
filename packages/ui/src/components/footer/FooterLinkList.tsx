import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type FooterLinkListProps = ComponentProps<'div'>;

export const FooterLinkList = styled('div', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: '4',
    columnGap: '12',
    alignItems: 'center',
    '& a': {
      textStyle: 'body.small-light',
      color: 'text.soft',
      textDecoration: 'none',
    },
  },
}) as unknown as FC<FooterLinkListProps>;
