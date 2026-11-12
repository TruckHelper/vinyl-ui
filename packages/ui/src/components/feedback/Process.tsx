'use client';

import {
  Children, isValidElement, type ReactNode,
} from 'react';

import { styled } from 'styled-system/jsx/factory';

import { ProcessItemContextProvider, type ProcessItemState } from './ProcessContext';

const Container = styled('ol', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    margin: '0',
    padding: '0',
    width: '100%',
    listStyle: 'none',
  },
});

function processState(number: number, current: number): ProcessItemState {
  if (number < current) {
    return 'complete';
  }

  return number === current ? 'current' : 'upcoming';
}

export type ProcessProps = {
  current?: number;
  'aria-label'?: string;
  className?: string;
  children?: ReactNode;
};

export function Process({
  current = 1,
  'aria-label': ariaLabel,
  className,
  children,
}: ProcessProps) {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <Container
      className={className}
      aria-label={ariaLabel}
    >
      {items.map((item, index) => (
        <ProcessItemContextProvider
          key={item.key}
          value={{ state: processState(index + 1, current) }}
        >
          {item}
        </ProcessItemContextProvider>
      ))}
    </Container>
  );
}
