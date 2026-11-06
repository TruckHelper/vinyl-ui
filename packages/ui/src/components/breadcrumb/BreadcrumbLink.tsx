import { ark } from '@ark-ui/react';
import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type BreadcrumbLinkProps = ComponentProps<'a'> & {
  asChild?: boolean;
};

export const BreadcrumbLink = styled(ark.a, {
  base: {
    textStyle: 'body.medium-light',
    color: 'text.soft',
    textDecoration: 'none',
    cursor: 'pointer',
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
  },
}) as unknown as FC<BreadcrumbLinkProps>;
