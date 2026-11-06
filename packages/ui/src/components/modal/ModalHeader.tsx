import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled('header', {
  base: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4',
    paddingTop: '40',
    paddingInline: '16',
    backgroundColor: 'layout.bg-light',
    textAlign: 'center',
  },
});

export type ModalHeaderProps = {
  className?: string;
  children?: ReactNode;
};

export function ModalHeader({ className, children }: ModalHeaderProps) {
  return (
    <Container className={className}>
      {children}
    </Container>
  );
}
