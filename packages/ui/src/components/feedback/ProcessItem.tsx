'use client';

import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { useProcessItemContext } from './ProcessContext';

const Container = styled('li', {
  base: {
    textStyle: 'body.small-light',
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    flex: '1 1 auto',
    color: 'text.default',
    whiteSpace: 'nowrap',
    _before: {
      flex: '1',
      minWidth: '1px',
      height: '1px',
      content: '""',
      backgroundColor: 'layout.default-line',
    },
    _first: {
      flex: '0 0 auto',
      _before: { content: 'none' },
    },
  },
});

const Dot = styled('span', {
  base: {
    flexShrink: 0,
    width: '1.2rem',
    height: '1.2rem',
    border: '2px solid',
    borderColor: 'layout.default-line',
    borderRadius: 'full',
  },
  variants: {
    state: {
      upcoming: { backgroundColor: 'layout.bg-light' },
      current: { backgroundColor: 'layout.primary' },
      complete: { backgroundColor: 'layout.bg-light' },
    },
  },
});

export type ProcessItemProps = {
  className?: string;
  children?: ReactNode;
};

export function ProcessItem({ className, children }: ProcessItemProps) {
  const { state } = useProcessItemContext();

  return (
    <Container
      className={className}
      aria-current={state === 'current' ? 'step' : undefined}
      data-state={state}
    >
      <Dot
        state={state}
        aria-hidden
      />
      {children}
    </Container>
  );
}
