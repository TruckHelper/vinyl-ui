import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type FooterInfoProps = ComponentProps<'div'>;

export const FooterInfo = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8',
  },
}) as unknown as FC<FooterInfoProps>;
