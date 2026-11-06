'use client';

import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { ProcessIndicatorContext } from './ProcessIndicatorContext';

const Container = styled('ol', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    width: '100%',
    margin: '0',
    padding: '0',
    listStyle: 'none',
  },
});

export type ProcessIndicatorProps = {
  current?: number;
  'aria-label'?: string;
  className?: string;
  children?: ReactNode;
};

export function ProcessIndicator({
  current = 0,
  'aria-label': ariaLabel,
  className,
  children,
}: ProcessIndicatorProps) {
  return (
    <ProcessIndicatorContext.Provider value={{ current }}>
      <Container
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </Container>
    </ProcessIndicatorContext.Provider>
  );
}
