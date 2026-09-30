'use client';

import { usePaginationContext } from '@ark-ui/react';

import { usePaginationGroupSize } from './PaginationContext';

import { firstPageNumberInGroup } from './utils';

type GroupJumpEdge = 'first' | 'last';

export function useGroupJump(edge: GroupJumpEdge) {
  const api = usePaginationContext();
  const groupSize = usePaginationGroupSize();

  const { onClick: arkOnClick, ...arkTriggerProps } = edge === 'first'
    ? api.getFirstTriggerProps()
    : api.getLastTriggerProps();

  const edgePage = edge === 'first' ? 1 : api.totalPages;
  const targetFirstPageNumber = firstPageNumberInGroup({ page: edgePage, groupSize });
  const currentFirstPageNumber = firstPageNumberInGroup({ page: api.page, groupSize });

  const disabled = currentFirstPageNumber === targetFirstPageNumber;

  const handleClick = () => {
    api.setPage(targetFirstPageNumber);
  };

  return {
    ...arkTriggerProps,
    disabled,
    'data-disabled': disabled ? '' : undefined,
    onClick: handleClick,
  };
}
