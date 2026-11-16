import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type FooterTitleProps = ComponentProps<'p'>;

export const FooterTitle = styled('p', {
  base: {
    textStyle: 'heading.small-bold',
    marginBottom: '8',
    color: 'text.heading',
  },
}) as unknown as FC<FooterTitleProps>;
