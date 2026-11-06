import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { TableSortButton } from './TableSortButton';

const Container = styled('th', {
  base: {
    textStyle: 'body.small-normal',
    padding: '12',
    color: 'text.heading',
    textAlign: 'left',
  },
});

const Content = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '4',
  },
});

export type TableSort = 'none' | 'asc' | 'desc';

const ariaSortValues = {
  none: 'none',
  asc: 'ascending',
  desc: 'descending',
} as const;

const nextSort: Record<TableSort, TableSort> = {
  none: 'asc',
  asc: 'desc',
  desc: 'none',
};

type BaseProps = {
  colSpan?: number;
  rowSpan?: number;
  className?: string;
  children?: ReactNode;
};

type StaticProps = BaseProps & {
  sort?: undefined;
  name?: never;
  sortLabel?: never;
  onChangeSort?: never;
};

type SortableProps = BaseProps & {
  sort: TableSort;
  name: string;
  sortLabel: string;
  onChangeSort: ({ name, value }: {
    name: string;
    value: TableSort;
  }) => void;
};

export type TableHeaderCellProps = StaticProps | SortableProps;

export function TableHeaderCell(props: TableHeaderCellProps) {
  const {
    colSpan,
    rowSpan,
    className,
    children,
  } = props;

  if (props.sort === undefined) {
    return (
      <Container
        className={className}
        scope="col"
        colSpan={colSpan}
        rowSpan={rowSpan}
      >
        {children}
      </Container>
    );
  }

  const {
    sort,
    name,
    sortLabel,
    onChangeSort,
  } = props;

  const handleClick = () => {
    onChangeSort({
      name,
      value: nextSort[sort],
    });
  };

  return (
    <Container
      className={className}
      scope="col"
      colSpan={colSpan}
      rowSpan={rowSpan}
      aria-sort={ariaSortValues[sort]}
    >
      <Content>
        {children}
        <TableSortButton
          direction={sort}
          label={sortLabel}
          onClick={handleClick}
        />
      </Content>
    </Container>
  );
}
