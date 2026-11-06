import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type FooterInfoListProps = ComponentProps<'ul'>;

export const FooterInfoList = styled('ul', {
  base: {
    textStyle: 'body.small-light',
    display: 'flex',
    flexDirection: { base: 'column', tablet: 'row' },
    flexWrap: 'wrap',
    rowGap: '8',
    columnGap: { tablet: 'calc(token(spacing.24) + 1px)' },
    alignItems: 'flex-start',
    margin: '0',
    padding: '0',
    listStyle: 'none',
    clipPath: { tablet: 'inset(0 0 0 0)' },
    color: 'text.default',
  },
}) as unknown as FC<FooterInfoListProps>;
