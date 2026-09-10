'use client';

import { type ComponentProps } from 'react';

import { ark } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled(ark.a, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4',
    textStyle: 'body.medium-normal',
    color: 'text.default',
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: '0.2s',
    _hover: {
      color: 'text.accent-primary',
    },
    _active: {
      color: 'text.accent-primary',
    },
    _disabled: {
      color: 'text.disable',
      cursor: 'default',
      pointerEvents: 'none',
    },
  },
  variants: {
    underline: {
      true: {
        textDecoration: 'underline',
        textUnderlineOffset: '0.2rem',
      },
      false: {
        textDecoration: 'none',
      },
    },
  },
  defaultVariants: {
    underline: true,
  },
});

export type LinkProps = ComponentProps<typeof Container> & {
  asChild?: boolean;
  disabled?: boolean;
};

export function Link({
  disabled,
  asChild,
  children,
  ...props
}: LinkProps) {
  return (
    <Container
      asChild={asChild}
      aria-disabled={disabled}
      data-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      {...props}
    >
      {children}
    </Container>
  );
}
