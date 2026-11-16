import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled('span', {
  base: {
    textStyle: 'body.medium-light',
    color: 'text.soft',
  },
});

export type BreadcrumbCurrentProps = {
  className?: string;
  children?: ReactNode;
};

export function BreadcrumbCurrent({ className, children }: BreadcrumbCurrentProps) {
  return (
    <Container
      className={className}
      aria-current="page"
    >
      {children}
    </Container>
  );
}
