import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled('nav', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24',
  },
  variants: {
    variant: {
      dark: {
        paddingBlock: '16',
        borderRadius: '16',
        backgroundColor: 'layout.bg-dark',
      },
      light: {
        backgroundColor: 'transparent',
      },
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
});

export type SideNavProps = {
  'aria-label': string;
  variant?: 'dark' | 'light';
  className?: string;
  children?: ReactNode;
};

export function SideNav({
  'aria-label': ariaLabel,
  variant = 'dark',
  className,
  children,
}: SideNavProps) {
  return (
    <Container
      className={className}
      variant={variant}
      data-side-nav-variant={variant}
      aria-label={ariaLabel}
    >
      {children}
    </Container>
  );
}
