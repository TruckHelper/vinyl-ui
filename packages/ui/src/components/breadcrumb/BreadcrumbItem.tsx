import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { Icon } from '../icon/Icon';

const Container = styled('li', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4',
    '&:first-child > [data-part="separator"]': { display: 'none' },
  },
});

const Separator = styled('span', {
  base: {
    fontSize: '2rem',
    display: 'inline-flex',
    flexShrink: 0,
    color: 'text.soft',
  },
});

export type BreadcrumbItemProps = {
  className?: string;
  children?: ReactNode;
};

export function BreadcrumbItem({ className, children }: BreadcrumbItemProps) {
  return (
    <Container className={className}>
      <Separator
        data-part="separator"
        aria-hidden
      >
        <Icon name="chevron-right" />
      </Separator>
      {children}
    </Container>
  );
}
