import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Wrapper = styled('div', {
  base: {
    width: '100%',
    overflowX: 'auto',
    border: '1px solid',
    borderColor: 'layout.default-line',
    borderRadius: '8',
    backgroundColor: 'layout.bg-light',
  },
});

const Container = styled('table', {
  base: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
  },
});

export type TableProps = {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
  children?: ReactNode;
};

export function Table({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  children,
}: TableProps) {
  return (
    <Wrapper className={className}>
      <Container
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {children}
      </Container>
    </Wrapper>
  );
}
