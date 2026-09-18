import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Pagination, type PaginationProps } from './Pagination';
import { PaginationFirst } from './PaginationFirst';
import { PaginationNext } from './PaginationNext';
import { PaginationItemGroup } from './PaginationItemGroup';
import { PaginationPrevious } from './PaginationPrevious';
import { PaginationLast } from './PaginationLast';

const context = describe;

function renderPagination(props: Partial<PaginationProps> = {}) {
  return render((
    <Pagination
      count={250}
      pageSize={10}
      {...props}
    >
      <PaginationPrevious />
      <PaginationItemGroup />
      <PaginationNext />
    </Pagination>
  ));
}

function pageButton(page: number) {
  return screen.getByRole('button', { name: `page ${page}` });
}

describe('Pagination', () => {
  context('without children', () => {
    it('renders no part', () => {
      render((
        <Pagination
          count={250}
          pageSize={10}
        />
      ));

      expect(screen.queryAllByRole('button')).toHaveLength(0);
    });
  });

  context('with children', () => {
    it('renders the composed parts only', () => {
      renderPagination();

      expect(screen.getByRole('button', { name: 'previous page' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'next page' })).toBeInTheDocument();
      expect(pageButton(1)).toBeInTheDocument();
      expect(pageButton(10)).toBeInTheDocument();

      expect(screen.queryByRole('button', { name: 'first page' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'last page' })).not.toBeInTheDocument();
    });
  });

  describe('page group', () => {
    it('renders the group the current page belongs to', () => {
      renderPagination({ defaultPage: 12 });

      expect(pageButton(11)).toBeInTheDocument();
      expect(pageButton(20)).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'page 10' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'page 21' })).not.toBeInTheDocument();
    });

    context('with a group size of 5', () => {
      it('renders five pages', () => {
        renderPagination({ groupSize: 5, defaultPage: 7 });

        expect(pageButton(6)).toBeInTheDocument();
        expect(pageButton(10)).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'page 5' })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'page 11' })).not.toBeInTheDocument();
      });
    });

    it('marks the current page', () => {
      renderPagination({ defaultPage: 3 });

      expect(pageButton(3)).toHaveAttribute('aria-current', 'page');
      expect(pageButton(4)).not.toHaveAttribute('aria-current');
    });
  });

  describe('paging', () => {
    it('moves to the clicked page', async () => {
      renderPagination({ defaultPage: 1 });

      fireEvent.click(pageButton(4));

      await waitFor(() => expect(pageButton(4)).toHaveAttribute('aria-current', 'page'));
    });

    it('moves one page on next', async () => {
      renderPagination({ defaultPage: 3 });

      fireEvent.click(screen.getByRole('button', { name: 'next page' }));

      await waitFor(() => expect(pageButton(4)).toHaveAttribute('aria-current', 'page'));
    });

    context('at the group boundary', () => {
      it('moves to the next group', async () => {
        renderPagination({ defaultPage: 10 });

        fireEvent.click(screen.getByRole('button', { name: 'next page' }));

        await waitFor(() => expect(pageButton(11)).toHaveAttribute('aria-current', 'page'));
        expect(pageButton(20)).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'page 10' })).not.toBeInTheDocument();
      });
    });

    it('calls onChangePage with the next page', async () => {
      const handleChangePage = jest.fn();

      renderPagination({ defaultPage: 1, onChangePage: handleChangePage });

      fireEvent.click(pageButton(5));

      await waitFor(() => expect(handleChangePage).toHaveBeenCalledWith({ page: 5 }));
    });
  });

  describe('first and last', () => {
    function renderComposed(props: Partial<PaginationProps> = {}) {
      return render((
        <Pagination
          count={250}
          pageSize={10}
          {...props}
        >
          <PaginationFirst />
          <PaginationPrevious />
          <PaginationItemGroup />
          <PaginationNext />
          <PaginationLast />
        </Pagination>
      ));
    }

    it('moves to the first page of the first group', async () => {
      renderComposed({ defaultPage: 12 });

      fireEvent.click(screen.getByRole('button', { name: 'first page' }));

      await waitFor(() => expect(pageButton(1)).toHaveAttribute('aria-current', 'page'));
    });

    it('moves to the first page of the last group, not the last page', async () => {
      renderComposed({ defaultPage: 12 });

      fireEvent.click(screen.getByRole('button', { name: 'last page' }));

      await waitFor(() => expect(pageButton(21)).toHaveAttribute('aria-current', 'page'));
      expect(screen.getByRole('button', { name: 'last page, page 25' }))
        .not.toHaveAttribute('aria-current');
    });

    context('with a group size of 5', () => {
      it('moves to the first page of the last group of five', async () => {
        renderComposed({ defaultPage: 1, groupSize: 5 });

        fireEvent.click(screen.getByRole('button', { name: 'last page' }));

        await waitFor(() => expect(pageButton(21)).toHaveAttribute('aria-current', 'page'));
      });
    });

    context('when the current page is in the first group', () => {
      it('disables the first on every page of the group', () => {
        renderComposed({ defaultPage: 1 });

        expect(screen.getByRole('button', { name: 'first page' })).toBeDisabled();
        expect(screen.getByRole('button', { name: 'last page' })).toBeEnabled();
      });

      it('disables the first in the middle of the group too', () => {
        renderComposed({ defaultPage: 7 });

        expect(screen.getByRole('button', { name: 'first page' })).toBeDisabled();
        expect(screen.getByRole('button', { name: 'previous page' })).toBeEnabled();
      });
    });

    context('when the current page is in the last group', () => {
      it('disables the last on the last page', () => {
        renderComposed({ defaultPage: 25 });

        expect(screen.getByRole('button', { name: 'last page' })).toBeDisabled();
        expect(screen.getByRole('button', { name: 'first page' })).toBeEnabled();
      });

      it('disables the last in the middle of the group too', () => {
        renderComposed({ defaultPage: 23 });

        expect(screen.getByRole('button', { name: 'last page' })).toBeDisabled();
        expect(screen.getByRole('button', { name: 'next page' })).toBeEnabled();
      });
    });

    context('when the current page is in a middle group', () => {
      it('enables both', () => {
        renderComposed({ defaultPage: 12 });

        expect(screen.getByRole('button', { name: 'first page' })).toBeEnabled();
        expect(screen.getByRole('button', { name: 'last page' })).toBeEnabled();
      });
    });
  });

  context('when it is controlled', () => {
    it('renders the given page', () => {
      renderPagination({ page: 15 });

      expect(pageButton(15)).toHaveAttribute('aria-current', 'page');
    });
  });
});
