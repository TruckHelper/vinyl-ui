'use client';

import type { ComponentProps } from 'react';

import { Collapsible as ArkCollapsible } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled(ArkCollapsible.Content, {
  base: {
    gridArea: 'nav',
    display: 'flex',
    flexDirection: {
      base: 'column',
      tablet: 'row',
    },
    alignItems: {
      base: 'stretch',
      tablet: 'center',
    },
    gap: {
      base: '16',
      tablet: '48',
    },
    position: {
      base: 'absolute',
      tablet: 'static',
    },
    top: '100%',
    insetInline: '0',
    zIndex: 'dropdown',
    padding: {
      base: '16',
      tablet: '0',
    },
    backgroundColor: {
      base: 'layout.bg-light',
      tablet: 'transparent',
    },
    '&[data-state=closed]': {
      display: {
        base: 'none',
        tablet: 'flex',
      },
    },
  },
});

export type HeaderNavProps = Omit<ComponentProps<'nav'>, 'id' | 'hidden'>;

export function HeaderNav({ children, ...props }: HeaderNavProps) {
  return (
    <Container
      asChild
      hidden={false}
    >
      <nav {...props}>{children}</nav>
    </Container>
  );
}
