import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type HeaderLogoProps = ComponentProps<'div'>;

export const HeaderLogo = styled('div', {
  base: {
    gridArea: 'logo',
    display: 'flex',
    alignItems: 'center',
    justifySelf: 'start',
  },
}) as unknown as FC<HeaderLogoProps>;
