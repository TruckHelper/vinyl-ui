'use client';

import type { MouseEvent, ReactNode } from 'react';

import { ark } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { useHeaderMenu } from './headerMenuContext';

const Container = styled(ark.a, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    textStyle: {
      base: 'body.xlarge-normal',
      tablet: 'body.medium-normal',
    },
    color: 'text.default',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: '0.2s',
    _hover: { color: 'text.accent-primary' },
    _active: { color: 'text.accent-primary' },
    '&[aria-current=page]': { color: 'text.accent-primary' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    '&[aria-disabled=true]': {
      color: 'text.disable',
      pointerEvents: 'none',
    },
    '[data-background=transparent] &': {
      color: {
        base: 'text.default',
        tablet: 'text.default-light',
      },
      _hover: { color: 'text.accent-primary' },
      _active: { color: 'text.accent-primary' },
      '&[aria-current=page]': { color: 'text.accent-primary' },
      '&[aria-disabled=true]': { color: 'text.disable' },
    },
  },
});

const blockClick = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

export type HeaderNavLinkProps = {
  href?: string;
  current?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
};

export function HeaderNavLink({
  href,
  current = false,
  disabled = false,
  asChild = false,
  className,
  children,
}: HeaderNavLinkProps) {
  const { close } = useHeaderMenu();

  const disabledProps = disabled
    ? {
      role: 'link',
      'aria-disabled': true,
      tabIndex: -1,
      onClickCapture: blockClick,
    }
    : {};

  return (
    <Container
      {...disabledProps}
      className={className}
      asChild={asChild}
      href={disabled && !asChild ? undefined : href}
      aria-current={current ? 'page' : undefined}
      onClick={close}
    >
      {children}
    </Container>
  );
}
