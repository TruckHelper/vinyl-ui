import type { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';

import { TableCell } from './TableCell';

const context = describe;

function renderCell(ui: ReactNode) {
  return render((
    <table>
      <tbody>
        <tr>{ui}</tr>
      </tbody>
    </table>
  ));
}

describe('TableCell', () => {
  it('renders text in a cell', () => {
    renderCell(<TableCell>홍길동</TableCell>);

    expect(screen.getByRole('cell', { name: '홍길동' })).toBeInTheDocument();
  });

  it('spans multiple columns', () => {
    renderCell(<TableCell colSpan={2}>합계</TableCell>);

    expect(screen.getByRole('cell', { name: '합계' })).toHaveAttribute('colspan', '2');
  });

  context('when type is link', () => {
    it('renders the link passed as children', () => {
      renderCell((
        <TableCell type="link">
          <a href="/detail">상세보기</a>
        </TableCell>
      ));

      expect(screen.getByRole('link', { name: '상세보기' })).toHaveAttribute('href', '/detail');
    });
  });
});
