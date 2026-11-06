import { fireEvent, render, screen } from '@testing-library/react';

import type { TableHeaderCellProps, TableSort } from './TableHeaderCell';
import { TableHeaderCell } from './TableHeaderCell';

const context = describe;

function renderHeaderCell(props: TableHeaderCellProps) {
  return render((
    <table>
      <thead>
        <tr>
          <TableHeaderCell {...props} />
        </tr>
      </thead>
    </table>
  ));
}

describe('TableHeaderCell', () => {
  context('without sort', () => {
    it('renders a column header without a sort button', () => {
      renderHeaderCell({ children: '이름' });

      const header = screen.getByRole('columnheader', { name: '이름' });

      expect(header).toHaveAttribute('scope', 'col');
      expect(header).not.toHaveAttribute('aria-sort');
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  context('with sort', () => {
    const handleChangeSort = jest.fn();

    const renderSortable = (sort: TableSort) => renderHeaderCell({
      children: '이름',
      name: 'name',
      sort,
      sortLabel: '이름 정렬',
      onChangeSort: handleChangeSort,
    });

    beforeEach(() => {
      handleChangeSort.mockClear();
    });

    it.each([
      ['none', 'asc'],
      ['asc', 'desc'],
      ['desc', 'none'],
    ] as const)('requests %s to %s when the sort button is clicked', (sort, next) => {
      renderSortable(sort);

      fireEvent.click(screen.getByRole('button', { name: '이름 정렬' }));

      expect(handleChangeSort).toHaveBeenCalledWith({
        name: 'name',
        value: next,
      });
    });

    it.each([
      ['none', 'none'],
      ['asc', 'ascending'],
      ['desc', 'descending'],
    ] as const)('sets aria-sort for %s', (sort, ariaSort) => {
      renderSortable(sort);

      expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', ariaSort);
    });

    it('renders up and down icons', () => {
      renderSortable('asc');

      expect(screen.getAllByTestId('icon')).toHaveLength(2);
    });

    it('keeps the sort button in the tab order as a non-submit button', () => {
      renderSortable('none');

      const button = screen.getByRole('button', { name: '이름 정렬' });

      expect(button).toHaveAttribute('type', 'button');
      expect(button.tabIndex).toBeGreaterThanOrEqual(0);
      expect(button).toBeEnabled();
    });
  });
});
