import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

export const Caption = styled('p', {
  base: {
    textStyle: 'body.small-light',
    position: 'relative',
    paddingInlineStart: '1.1rem',
    color: 'text.soft',
    _before: {
      content: '"*" / ""',
      position: 'absolute',
      insetInlineStart: 0,
      color: 'text.accent-primary',
    },
  },
});

export type CaptionProps = ComponentProps<typeof Caption>;
