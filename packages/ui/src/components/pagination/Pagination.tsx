'use client';

import type { ComponentProps } from 'react';

import { Pagination as ArkPagination } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { DEFAULT_GROUP_SIZE } from './utils';

import { PaginationContextProvider } from './PaginationContext';

// `page` 는 Panda 의 CSS 속성이라 styled(ArkPagination.Root) 로 감싸면
// 스타일 prop 으로 가로채여 Ark 에 전달되지 않는다. asChild 로 분리한다.
const Container = styled('nav', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4',
  },
});

type RootProps = ComponentProps<typeof ArkPagination.Root>;

// TODO: `type: 'link'` 은 Ark 가 href 값만 만들고 앵커 렌더는 asChild 로 맡긴다.
// 파트가 asChild 를 열지 않는 지금 구조에서는 <button href> 라는 잘못된 HTML이 나오므로 막는다.
// 링크 페이지네이션을 지원할 때 함께 걷어낸다.
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
