import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type FooterInfoProps = ComponentProps<'div'>;

export const FooterInfo = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
    alignItems: 'flex-start',
  },
}) as unknown as FC<FooterInfoProps>;
