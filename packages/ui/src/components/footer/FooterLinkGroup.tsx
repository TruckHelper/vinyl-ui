import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type FooterLinkGroupProps = ComponentProps<'div'>;

export const FooterLinkGroup = styled('div', {
  base: {
    display: 'flex',
    flexDirection: { base: 'column', tablet: 'row' },
    alignItems: { base: 'flex-start', tablet: 'center' },
    gap: { base: '4', tablet: '12' },
    tablet: {
      position: 'relative',
      _before: {
        content: '""',
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: 'calc(-1 * (token(spacing.16) + 1px))',
        width: '1px',
        backgroundColor: 'layout.default-line',
      },
    },
  },
}) as unknown as FC<FooterLinkGroupProps>;
