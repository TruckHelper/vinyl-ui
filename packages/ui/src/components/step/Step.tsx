import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled('ol', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    margin: '0',
    padding: '0',
    listStyle: 'none',
    counterReset: 'step',
    '& > li + li::before': {
      content: '""',
      display: 'block',
      flexShrink: 0,
      width: '3.2rem',
      height: '1px',
      backgroundColor: 'layout.default-line',
    },
  },
});

export type StepProps = {
  label?: boolean;
  'aria-label'?: string;
  className?: string;
  children?: ReactNode;
};

export function Step({
  label = true,
  'aria-label': ariaLabel,
  className,
  children,
}: StepProps) {
  return (
    <Container
      className={className}
      aria-label={ariaLabel}
      data-label={label ? 'on' : 'off'}
    >
      {children}
    </Container>
  );
}
