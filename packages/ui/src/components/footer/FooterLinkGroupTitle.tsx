import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type FooterLinkGroupTitleProps = ComponentProps<'p'>;

export const FooterLinkGroupTitle = styled('p', {
  base: {
    textStyle: 'body.small-normal',
    color: 'text.heading',
  },
}) as unknown as FC<FooterLinkGroupTitleProps>;
