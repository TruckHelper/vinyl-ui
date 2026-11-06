import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type FooterCopyrightProps = ComponentProps<'div'>;

export const FooterCopyright = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16',
    textStyle: 'body.small-light',
    color: 'text.soft',
  },
}) as unknown as FC<FooterCopyrightProps>;
