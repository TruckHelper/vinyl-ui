'use client';

import type { ReactNode } from 'react';

import { ark } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { navLinkProps } from './navLinkProps';

const Container = styled(ark.a, {
  base: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingInline: '16',
    paddingBlock: '12',
    borderRadius: '8',
    textStyle: 'body.medium-normal',
    color: 'layout.highlight-line',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transitionProperty: 'background-color, color',
    transitionDuration: '0.2s',
    _hover: { textDecoration: 'underline' },
    '&[aria-current=page]': {
      backgroundColor: 'layout.primary',
      color: 'text.default-light',
      textDecoration: 'none',
    },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      color: 'text.disable',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    '[data-side-nav-variant=light] &': {
      color: 'text.soft',
      _hover: { textDecoration: 'none' },
      _disabled: { color: 'text.disable' },
    },
  },
});

export type SideNavSubItemProps = {
  href?: string;
  current?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
};

export function SideNavSubItem({
  href,
  current = false,
  disabled = false,
  asChild = false,
  className,
  children,
}: SideNavSubItemProps) {
  return (
    <li>
      <Container
        {...navLinkProps({
          href,
          current,
          disabled,
          asChild,
        })}
        className={className}
        asChild={asChild}
      >
        {children}
      </Container>
    </li>
  );
}
