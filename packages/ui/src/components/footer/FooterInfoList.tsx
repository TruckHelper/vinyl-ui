import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type FooterInfoListProps = ComponentProps<'ul'>;

export const FooterInfoList = styled('ul', {
  base: {
    display: 'flex',
    flexDirection: { base: 'column', tablet: 'row' },
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    rowGap: '8',
    columnGap: { tablet: 'calc(token(spacing.24) + 1px)' },
    margin: '0',
    padding: '0',
    listStyle: 'none',
    clipPath: { tablet: 'inset(0 0 0 0)' },
    textStyle: 'body.small-light',
    color: 'text.default',
  },
}) as unknown as FC<FooterInfoListProps>;
