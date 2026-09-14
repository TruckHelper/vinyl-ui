'use client';

import { usePaginationContext } from '@ark-ui/react';

import { usePaginationGroupSize } from './PaginationContext';
import { getGroupStartPage } from './utils';

type GroupJumpEdge = 'first' | 'last';

export function useGroupJumpTrigger(edge: GroupJumpEdge) {
  const api = usePaginationContext();
  const groupSize = usePaginationGroupSize();

  const { onClick: arkOnClick, ...arkTriggerProps } = edge === 'first'
    ? api.getFirstTriggerProps()
    : api.getLastTriggerProps();

  const edgePage = edge === 'first' ? 1 : api.totalPages;
  const targetPage = getGroupStartPage({ page: edgePage, groupSize });
  const currentGroupStartPage = getGroupStartPage({ page: api.page, groupSize });

  const disabled = currentGroupStartPage === targetPage;

  const handleClick = () => {
    api.setPage(targetPage);
  };

  return {
    ...arkTriggerProps,
    disabled,
    'data-disabled': disabled ? '' : undefined,
    onClick: handleClick,
  };
}
