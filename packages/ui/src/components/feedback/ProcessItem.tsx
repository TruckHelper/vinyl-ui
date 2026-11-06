'use client';

import { useContext, type ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { ProcessIndicatorContext } from './ProcessIndicatorContext';

const Container = styled('li', {
  base: {
    textStyle: 'body.small-light',
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    color: 'text.default',
    whiteSpace: 'nowrap',
    flex: '1 1 auto',
    _before: {
      content: '""',
      flex: '1',
      minWidth: '1px',
      height: '1px',
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
    type: {
      pending: { backgroundColor: 'layout.bg-light' },
      active: { backgroundColor: 'layout.primary' },
    },
  },
});

export type ProcessItemProps = (
  | {
    index: number;
    type?: 'pending' | 'active';
  }
  | {
    index?: number;
    type: 'pending' | 'active';
  }
) & {
  className?: string;
  children?: ReactNode;
};

export function ProcessItem({
  index,
  type,
  className,
  children,
}: ProcessItemProps) {
  const { current } = useContext(ProcessIndicatorContext);
  const resolvedType = type ?? (index === current ? 'active' : 'pending');

  return (
    <Container
      className={className}
      aria-current={resolvedType === 'active' ? 'step' : undefined}
    >
      <Dot
        type={resolvedType}
        aria-hidden
        data-testid="process-item-dot"
      />
      {children}
    </Container>
  );
}
