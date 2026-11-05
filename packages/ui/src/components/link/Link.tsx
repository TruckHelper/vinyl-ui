'use client';

import { ark } from '@ark-ui/react';
import type { ComponentProps, MouseEvent } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled(ark.a, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4',
    textStyle: 'button.medium-normal',
    color: 'text.default',
    textDecoration: 'underline',
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: '0.2s',
    '&:has(svg)': { textDecoration: 'none' },
    '& > :has(> svg)': { flexShrink: 0 },
    _hover: { color: 'text.accent-primary' },
    _active: { color: 'text.accent-primary' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
    },
    _disabled: {
      color: 'text.disable',
      pointerEvents: 'none',
    },
  },
});

export type LinkProps = ComponentProps<'a'> & {
  asChild?: boolean;
  disabled?: boolean;
};

export function Link({
  children, href, asChild = false, disabled = false, ...props
}: LinkProps) {
  const blockClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

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
      {...props}
      {...disabledProps}
      asChild={asChild}
      href={disabled && !asChild ? undefined : href}
    >
      {children}
    </Container>
  );
}
