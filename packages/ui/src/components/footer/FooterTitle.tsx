import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type FooterTitleProps = ComponentProps<'p'>;

export const FooterTitle = styled('p', {
  base: {
    marginBottom: '8',
    textStyle: 'heading.small-bold',
    color: 'text.heading',
  },
}) as unknown as FC<FooterTitleProps>;
