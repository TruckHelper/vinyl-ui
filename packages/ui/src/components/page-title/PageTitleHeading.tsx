import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type PageTitleHeadingProps = ComponentProps<'h1'>;

export const PageTitleHeading = styled('h1', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    textStyle: { base: 'heading.large-bold', tablet: 'heading.small-bold' },
    color: 'text.heading',
    _before: {
      content: '""',
      flexShrink: 0,
      boxSizing: 'border-box',
      width: '1.2rem',
      height: '1.2rem',
      border: '3px solid',
      borderColor: 'layout.highlight-line',
      borderRadius: 'full',
    },
  },
}) as unknown as FC<PageTitleHeadingProps>;
