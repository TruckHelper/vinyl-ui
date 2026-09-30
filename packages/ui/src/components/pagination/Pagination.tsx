'use client';

import type { ComponentProps } from 'react';

import { Pagination as ArkPagination } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { DEFAULT_GROUP_SIZE } from './utils';

import { PaginationContextProvider } from './PaginationContext';

const Container = styled('nav', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4',
  },
});

type RootProps = ComponentProps<typeof ArkPagination.Root>;

export type PaginationProps = Omit<
  RootProps,
  'siblingCount' | 'boundaryCount' | 'onPageChange' | 'asChild' | 'type' | 'getPageUrl'
> & {
  groupSize?: number;
  onChangePage?: ({ page }: { page: number }) => void;
};

export function Pagination({
  className,
  children,
  groupSize = DEFAULT_GROUP_SIZE,
  onChangePage,
  ...props
}: PaginationProps) {
  const handleChangePage = ({ page }: { page: number }) => {
    onChangePage?.({ page });
  };

  return (
    <PaginationContextProvider value={{ groupSize }}>
      <ArkPagination.Root
        asChild
        onPageChange={handleChangePage}
        {...props}
      >
        <Container className={className}>
          {children}
        </Container>
      </ArkPagination.Root>
    </PaginationContextProvider>
  );
}
