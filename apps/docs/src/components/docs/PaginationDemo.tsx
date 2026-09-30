'use client';

import { useState } from 'react';

import {
  Pagination,
  PaginationFirst,
  PaginationItemGroup,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from '@bigmobility/vinyl-ui/pagination';

import { styled } from 'styled-system/jsx';

const TOTAL_COUNT = 250;
const PAGE_SIZE = 10;

const Frame = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16',
    width: '100%',
  },
});

const Status = styled('p', {
  base: {
    textStyle: 'body.small-normal',
    color: 'text.soft',
  },
});

const Highlight = styled('strong', {
  base: {
    textStyle: 'body.small-bold',
    color: 'text.accent-primary',
  },
});

type PaginationDemoProps = {
  groupSize?: number;
  hasEdgeTriggers?: boolean;
};

export default function PaginationDemo({
  groupSize = 10,
  hasEdgeTriggers = false,
}: PaginationDemoProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(TOTAL_COUNT / PAGE_SIZE);
  const offset = (page - 1) * PAGE_SIZE;

  return (
    <Frame>
      <Pagination
        count={TOTAL_COUNT}
        pageSize={PAGE_SIZE}
        page={page}
        groupSize={groupSize}
        onChangePage={({ page }) => setPage(page)}
      >
        {hasEdgeTriggers && <PaginationFirst />}
        <PaginationPrevious />
        <PaginationItemGroup />
        <PaginationNext />
        {hasEdgeTriggers && <PaginationLast />}
      </Pagination>
      <Status>
        전체
        {' '}
        {TOTAL_COUNT}
        건 ·
        {' '}
        <Highlight>
          {page}
          {' / '}
          {totalPages}
          페이지
        </Highlight>
        {' · '}
        {offset + 1}
        ~
        {Math.min(offset + PAGE_SIZE, TOTAL_COUNT)}
        번째 항목
      </Status>
    </Frame>
  );
}
