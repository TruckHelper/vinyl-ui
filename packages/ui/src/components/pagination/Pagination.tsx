'use client';

import { useId } from 'react';

import { Pagination as ArkPagination } from '@ark-ui/react';

import { Icon } from '../icon/Icon';

import { styled } from 'styled-system/jsx/factory';

const Container = styled('nav', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: { base: '8', tablet: '4' },
  },
});

const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  minWidth: '2.4rem',
  height: '2.4rem',
  borderRadius: '8',
  backgroundColor: 'transparent',
  color: 'text.soft',
  cursor: 'pointer',
  transitionProperty: 'background-color, color',
  transitionDuration: '0.2s',
  _hover: { backgroundColor: 'layout.bg-light-gray' },
  _active: {
    backgroundColor: 'layout.primary-subtle',
    color: 'text.accent-primary',
  },
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'layout.highlight-line',
    outlineOffset: '2px',
  },
  _disabled: {
    backgroundColor: 'layout.bg-disable',
    color: 'text.disable',
    cursor: 'not-allowed',
    _hover: { backgroundColor: 'layout.bg-disable' },
  },
} as const;

const PageButton = styled(ArkPagination.Item, {
  base: {
    ...buttonStyle,
    textStyle: 'button.small-normal',
    _selected: {
      backgroundColor: 'layout.primary-subtle',
      color: 'text.accent-primary',
      _disabled: {
        backgroundColor: 'layout.bg-disable',
        color: 'text.disable',
      },
    },
  },
  variants: {
    group: {
      desktop: { display: { base: 'none', tablet: 'inline-flex' } },
      mobile: { display: { base: 'inline-flex', tablet: 'none' } },
    },
  },
});

const TriggerButton = styled('button', {
  base: {
    ...buttonStyle,
    fontSize: '2rem',
  },
});

const GROUPS = [
  { name: 'desktop', size: 10 },
  { name: 'mobile', size: 5 },
] as const;

const TRANSLATIONS = {
  rootLabel: '페이지네이션',
  firstTriggerLabel: '첫 페이지',
  prevTriggerLabel: '이전 페이지',
  nextTriggerLabel: '다음 페이지',
  lastTriggerLabel: '마지막 페이지',
  itemLabel: ({ page, totalPages }: { page: number; totalPages: number }) => (
    totalPages > 1 && page === totalPages ? `마지막 페이지, ${page} 페이지` : `${page} 페이지`
  ),
};

function getGroupPages({ page, totalPages, groupSize }: {
  page: number;
  totalPages: number;
  groupSize: number;
}) {
  if (totalPages < 1) {
    return [];
  }

  const start = Math.floor((page - 1) / groupSize) * groupSize + 1;
  const length = Math.min(groupSize, totalPages - start + 1);

  return Array.from({ length }, (_, index) => start + index);
}

export type PaginationProps = {
  count: number;
  pageSize?: number;
  page: number;
  disabled?: boolean;
  className?: string;
  onChangePage: ({ page }: { page: number }) => void;
};

export function Pagination({
  count,
  pageSize = 10,
  page,
  disabled = false,
  className,
  onChangePage,
}: PaginationProps) {
  const id = useId();
  const totalPages = Math.ceil(count / pageSize);
  const currentPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const disabledProp = disabled || undefined;

  const handleChangePage = (details: { page: number }) => {
    onChangePage({ page: details.page });
  };

  return (
    <ArkPagination.Root
      count={count}
      pageSize={pageSize}
      page={currentPage}
      translations={TRANSLATIONS}
      onPageChange={handleChangePage}
      asChild
    >
      <Container className={className}>
        <ArkPagination.FirstTrigger
          disabled={disabledProp}
          asChild
        >
          <TriggerButton>
            <Icon name="chevrons-left" />
          </TriggerButton>
        </ArkPagination.FirstTrigger>
        <ArkPagination.PrevTrigger
          disabled={disabledProp}
          asChild
        >
          <TriggerButton>
            <Icon name="chevron-left" />
          </TriggerButton>
        </ArkPagination.PrevTrigger>
        {GROUPS.map((group) => getGroupPages({
          page: currentPage,
          totalPages,
          groupSize: group.size,
        }).map((value) => (
          <PageButton
            key={`${group.name}-${value}`}
            id={`${id}-${group.name}-${value}`}
            type="page"
            value={value}
            group={group.name}
            data-group={group.name}
            disabled={disabledProp}
          >
            {value}
          </PageButton>
        )))}
        <ArkPagination.NextTrigger
          disabled={disabledProp}
          asChild
        >
          <TriggerButton>
            <Icon name="chevron-right" />
          </TriggerButton>
        </ArkPagination.NextTrigger>
        <ArkPagination.LastTrigger
          disabled={disabledProp}
          asChild
        >
          <TriggerButton>
            <Icon name="chevrons-right" />
          </TriggerButton>
        </ArkPagination.LastTrigger>
      </Container>
    </ArkPagination.Root>
  );
}
