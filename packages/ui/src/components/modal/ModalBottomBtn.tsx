import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled('div', {
  base: {
    display: 'flex',
    gap: '8',
    padding: '16',
    backgroundColor: 'layout.bg-light',
    '& > *': {
      flex: '1',
      minWidth: '0',
    },
  },
});

export type ModalBottomBtnProps = {
  type?: 'single' | 'equal';
  className?: string;
  children?: ReactNode;
};

export function ModalBottomBtn({
  type = 'single',
  className,
  children,
}: ModalBottomBtnProps) {
  return (
    <Container
      className={className}
      data-type={type}
    >
      {children}
    </Container>
  );
}
