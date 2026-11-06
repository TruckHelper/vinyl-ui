import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

const List = styled('ol', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '4',
    margin: '0',
    padding: '0',
    listStyle: 'none',
  },
});

export type BreadcrumbProps = {
  'aria-label'?: string;
  className?: string;
  children?: ReactNode;
};

export function Breadcrumb({
  'aria-label': ariaLabel = '현재 위치',
  className,
  children,
}: BreadcrumbProps) {
  return (
    <nav
      className={className}
      aria-label={ariaLabel}
    >
      <List>{children}</List>
    </nav>
  );
}
