import { render, screen } from '@testing-library/react';

import { Table } from './Table';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableHeader } from './TableHeader';
import { TableHeaderCell } from './TableHeaderCell';
import { TableRow } from './TableRow';

describe('Table', () => {
  it('renders header and body rows in a semantic table', () => {
    render((
      <Table aria-label="회원 목록">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>이름</TableHeaderCell>
            <TableHeaderCell>상태</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>홍길동</TableCell>
            <TableCell>진행중</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>김철수</TableCell>
            <TableCell>완료</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ));

    expect(screen.getByRole('table', { name: '회원 목록' })).toBeInTheDocument();
    expect(screen.getAllByRole('rowgroup')).toHaveLength(2);
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getByRole('cell', { name: '김철수' })).toBeInTheDocument();
  });

  it('is named by the element referenced with aria-labelledby', () => {
    render((
      <>
        <h2 id="table-title">정산 내역</h2>
        <Table aria-labelledby="table-title">
          <TableBody>
            <TableRow>
              <TableCell>홍길동</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    ));

    expect(screen.getByRole('table', { name: '정산 내역' })).toBeInTheDocument();
  });

  it('applies className to the outer wrapper', () => {
    render((
      <Table className="custom">
        <TableBody>
          <TableRow>
            <TableCell>홍길동</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ));

    expect(screen.getByRole('table').parentElement).toHaveClass('custom');
  });
});
