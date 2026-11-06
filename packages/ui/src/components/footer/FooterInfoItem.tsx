import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type FooterInfoItemProps = ComponentProps<'li'>;

export const FooterInfoItem = styled('li', {
  base: {
    tablet: {
      position: 'relative',
      _before: {
        content: '""',
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: 'calc(-1 * (token(spacing.12) + 1px))',
        width: '1px',
        backgroundColor: 'layout.default-line',
      },
    },
  },
}) as unknown as FC<FooterInfoItemProps>;
