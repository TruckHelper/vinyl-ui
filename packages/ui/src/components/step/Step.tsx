'use client';

import {
  Children, isValidElement, type ReactNode,
} from 'react';

import { styled } from 'styled-system/jsx/factory';

import { StepItemContextProvider, type StepItemState } from './StepContext';

const Container = styled('ol', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    margin: '0',
    padding: '0',
    listStyle: 'none',
  },
});

function stepState(number: number, current: number): StepItemState {
  if (number < current) {
    return 'complete';
  }

  return number === current ? 'current' : 'upcoming';
}

export type StepProps = {
  current?: number;
  label?: boolean;
  'aria-label'?: string;
  className?: string;
  children?: ReactNode;
};

export function Step({
  current = 1,
  label = true,
  'aria-label': ariaLabel,
  className,
  children,
}: StepProps) {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <Container
      className={className}
      aria-label={ariaLabel}
    >
      {items.map((item, index) => (
        <StepItemContextProvider
          key={item.key}
          value={{ number: index + 1, state: stepState(index + 1, current), label }}
        >
          {item}
        </StepItemContextProvider>
      ))}
    </Container>
  );
}
