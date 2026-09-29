'use client';

import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled('span', {
  base: {
    display: 'inline-flex',
    flexShrink: 0,
    alignItems: 'center',
  },
});

export type InputAddonProps = ComponentProps<'span'>;

export function InputAddon({ className, children, ...props }: InputAddonProps) {
  return (
    <Container
      className={className}
      {...props}
    >
      {children}
    </Container>
  );
}
