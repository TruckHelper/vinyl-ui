import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Pagination } from './Pagination';
import { PaginationFirst } from './PaginationFirst';
import { PaginationPrevious } from './PaginationPrevious';
import { PaginationItemGroup } from './PaginationItemGroup';
import { PaginationNext } from './PaginationNext';
import { PaginationLast } from './PaginationLast';

const context = describe;

function pageButton(page: number) {
  return screen.getByRole('button', { name: `page ${page}` });
}

describe('Pagination', () => {
  it('renders number items and listens for click events', async () => {
    render((
      <Pagination
        count={250}
        pageSize={10}
      >
        <PaginationPrevious />
        <PaginationItemGroup />
        <PaginationNext />
      </Pagination>
    ));

    expect(pageButton(1)).toBeInTheDocument();
    expect(pageButton(10)).toBeInTheDocument();

    fireEvent.click(pageButton(4));

    await waitFor(() => expect(pageButton(4)).toHaveAttribute('aria-current', 'page'));
  });

  it('renders previous and next buttons and listens for click events', async () => {
    render((
      <Pagination
        count={250}
        pageSize={10}
      >
        <PaginationPrevious />
        <PaginationItemGroup />
        <PaginationNext />
      </Pagination>
    ));

    const nextButton = screen.getByRole('button', { name: 'next page' });
    const previousButton = screen.getByRole('button', { name: 'previous page' });

    fireEvent.click(nextButton);
    await waitFor(() => expect(pageButton(2)).toHaveAttribute('aria-current', 'page'));

    fireEvent.click(previousButton);
    await waitFor(() => expect(pageButton(1)).toHaveAttribute('aria-current', 'page'));
  });

  context('with defaultPage prop', () => {
    it('renders given page as current', () => {
      render((
        <Pagination
          count={250}
          pageSize={10}
          defaultPage={15}
        >
          <PaginationPrevious />
          <PaginationItemGroup />
          <PaginationNext />
        </Pagination>
      ));

      expect(pageButton(15)).toHaveAttribute('aria-current', 'page');
    });
  });

  context('with page prop', () => {
    it('renders given page as current', () => {
      render((
        <Pagination
          count={250}
          pageSize={10}
          page={15}
        >
          <PaginationPrevious />
          <PaginationItemGroup />
          <PaginationNext />
        </Pagination>
      ));

      expect(pageButton(15)).toHaveAttribute('aria-current', 'page');
    });

    it('listens for click events with clicked page', async () => {
      const handleChangePage = jest.fn();

      render((
        <Pagination
          count={250}
          pageSize={10}
          page={15}
          onChangePage={handleChangePage}
        >
          <PaginationPrevious />
          <PaginationItemGroup />
          <PaginationNext />
        </Pagination>
      ));

      fireEvent.click(pageButton(17));

      await waitFor(() => expect(handleChangePage).toHaveBeenCalledWith({ page: 17 }));
    });
  });

  context('outside root component', () => {
    it('throws error', () => {
      expect(() => render((
        <>
          <Pagination count={250} pageSize={10} />
          <PaginationPrevious />
          <PaginationItemGroup />
          <PaginationNext />
        </>
      ))).toThrow();
    });
  });

  describe('first and last buttons', () => {
    it('renders first and last buttons in pagination', async () => {
      render((
        <Pagination
          count={250}
          pageSize={10}
          defaultPage={12}
        >
          <PaginationFirst />
          <PaginationPrevious />
          <PaginationItemGroup />
          <PaginationNext />
          <PaginationLast />
        </Pagination>
      ));

      screen.getByRole('button', { name: 'first page' });
      screen.getByRole('button', { name: 'last page' });
    });

    context('when first button is clicked', () => {
      it('moves to first page of first group and disables first button', async () => {
        render((
          <Pagination
            count={250}
            pageSize={10}
            defaultPage={12}
          >
            <PaginationFirst />
            <PaginationPrevious />
            <PaginationItemGroup />
            <PaginationNext />
            <PaginationLast />
          </Pagination>
        ));

        const firstButton = screen.getByRole('button', { name: 'first page' });

        fireEvent.click(firstButton);

        await waitFor(() => expect(pageButton(1)).toHaveAttribute('aria-current', 'page'));

        expect(firstButton).toBeDisabled();
      });
    });

    context('when last button is clicked', () => {
      it('moves to first page of last group and disables last button', async () => {
        render((
          <Pagination
            count={250}
            pageSize={10}
            defaultPage={12}
          >
            <PaginationFirst />
            <PaginationPrevious />
            <PaginationItemGroup />
            <PaginationNext />
            <PaginationLast />
          </Pagination>
        ));

        const lastButton = screen.getByRole('button', { name: 'last page' });

        fireEvent.click(lastButton);

        await waitFor(() => expect(pageButton(21)).toHaveAttribute('aria-current', 'page'));
        
        expect(lastButton).toBeDisabled();
      });
    });
  });
});
