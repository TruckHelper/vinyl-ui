import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type FooterNavProps = ComponentProps<'nav'>;

export const FooterNav = styled('nav', {
  base: {
    display: 'flex',
    flexDirection: { base: 'column', tablet: 'row' },
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    rowGap: '16',
    columnGap: { tablet: 'calc(token(spacing.12) + token(spacing.16) + 1px)' },
    paddingTop: '16',
    paddingBottom: { base: '16', tablet: '0' },
    borderTopWidth: '1px',
    borderBottomWidth: { base: '1px', tablet: '0' },
    borderStyle: 'solid',
    borderInlineWidth: '0',
    borderColor: 'layout.default-line',
    clipPath: { tablet: 'inset(-0.4rem -0.4rem -0.4rem 0)' },
  },
}) as unknown as FC<FooterNavProps>;
