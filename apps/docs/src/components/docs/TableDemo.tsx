'use client';

import { useState } from 'react';

import { Badge } from '@bigmobility/vinyl-ui/badge';
import { Link } from '@bigmobility/vinyl-ui/link';
import type { TableSort } from '@bigmobility/vinyl-ui/table';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@bigmobility/vinyl-ui/table';

import { styled } from 'styled-system/jsx';

const NoHeaderCell = styled(TableHeaderCell, {
  base: { width: 'table-col-sm' },
});

const StatusHeaderCell = styled(TableHeaderCell, {
  base: { width: 'table-col-md' },
});

const rows = [
  {
    id: 1,
    name: '홍길동',
    date: '2026-11-03',
    status: '처리 중',
  },
  {
    id: 2,
    name: '김철수',
    date: '2026-11-01',
    status: '접수',
  },
  {
    id: 3,
    name: '이영희',
    date: '2026-11-05',
    status: '재검토중',
  },
];

type Row = (typeof rows)[number];

type SortState = {
  name: keyof Row;
  value: TableSort;
};

function sortRows(sort: SortState) {
  if (sort.value === 'none') {
    return rows;
  }

  const direction = sort.value === 'asc' ? 1 : -1;

  return [...rows].sort((a, b) => (
    String(a[sort.name]).localeCompare(String(b[sort.name])) * direction
  ));
}

function BasicTable() {
  return (
    <Table aria-label="신청 목록">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>이름</TableHeaderCell>
          <TableHeaderCell>신청일</TableHeaderCell>
          <TableHeaderCell>상태</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function SortTable() {
  const [sort, setSort] = useState<SortState>({
    name: 'date',
    value: 'desc',
  });

  const handleChangeSort = ({ name, value }: { name: string; value: TableSort }) => {
    setSort({
      name: name as keyof Row,
      value,
    });
  };

  const sortOf = (name: keyof Row) => (sort.name === name ? sort.value : 'none');

  return (
    <Table aria-label="신청 목록">
      <TableHeader>
        <TableRow>
          <TableHeaderCell
            name="name"
            sort={sortOf('name')}
            sortLabel="이름 정렬"
            onChangeSort={handleChangeSort}
          >
            이름
          </TableHeaderCell>
          <TableHeaderCell
            name="date"
            sort={sortOf('date')}
            sortLabel="신청일 정렬"
            onChangeSort={handleChangeSort}
          >
            신청일
          </TableHeaderCell>
          <TableHeaderCell>상태</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortRows(sort).map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function CellTypeTable() {
  return (
    <Table aria-label="신청 목록">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>이름</TableHeaderCell>
          <TableHeaderCell>상태</TableHeaderCell>
          <TableHeaderCell>상세</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>
              <Badge>{row.status}</Badge>
            </TableCell>
            <TableCell variant="link">
              <Link href="#셀-종류">보기</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ColumnWidthTable() {
  return (
    <Table aria-label="신청 목록">
      <TableHeader>
        <TableRow>
          <NoHeaderCell>번호</NoHeaderCell>
          <TableHeaderCell>이름</TableHeaderCell>
          <StatusHeaderCell>상태</StatusHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

type TableDemoProps = {
  variant?: 'basic' | 'sort' | 'cell-type' | 'column-width';
};

export default function TableDemo({ variant = 'basic' }: TableDemoProps) {
  if (variant === 'sort') {
    return <SortTable />;
  }

  if (variant === 'cell-type') {
    return <CellTypeTable />;
  }

  if (variant === 'column-width') {
    return <ColumnWidthTable />;
  }

  return <BasicTable />;
}
