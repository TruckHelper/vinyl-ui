import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type FooterCopyrightProps = ComponentProps<'div'>;

export const FooterCopyright = styled('div', {
  base: {
    textStyle: 'body.small-light',
    display: 'flex',
    flexDirection: 'column',
    gap: '16',
    color: 'text.soft',
  },
}) as unknown as FC<FooterCopyrightProps>;
