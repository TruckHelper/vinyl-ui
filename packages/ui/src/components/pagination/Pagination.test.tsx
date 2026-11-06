import type { ComponentProps } from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Pagination } from './Pagination';

const context = describe;

type Group = 'desktop' | 'mobile';

describe('Pagination', () => {
  const handleChangePage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderPagination(props: Partial<ComponentProps<typeof Pagination>> = {}) {
    return render((
      <Pagination
        count={250}
        pageSize={10}
        page={1}
        onChangePage={handleChangePage}
        {...props}
      />
    ));
  }

  function pageButtons(group: Group) {
    return screen.getAllByRole('button')
      .filter((button) => button.getAttribute('data-group') === group);
  }

  function pageNumbers(group: Group) {
    return pageButtons(group).map((button) => button.textContent);
  }

  function pageButton(name: string, group: Group = 'desktop') {
    const button = pageButtons(group).find((item) => item.getAttribute('aria-label') === name);

    if (!button) {
      throw new Error(`No ${group} page button named ${name}`);
    }

    return button;
  }

  function triggers() {
    return ['첫 페이지', '이전 페이지', '다음 페이지', '마지막 페이지']
      .map((name) => screen.getByRole('button', { name }));
  }

  it('renders navigation with the current page', () => {
    renderPagination({ page: 3 });

    expect(screen.getByRole('navigation', { name: '페이지네이션' })).toBeInTheDocument();
    expect(pageButton('3 페이지')).toHaveAttribute('aria-current', 'page');
    expect(pageButton('3 페이지', 'mobile')).toHaveAttribute('aria-current', 'page');
    expect(pageButton('2 페이지')).not.toHaveAttribute('aria-current');
  });

  it('renders ten desktop page numbers of the current group', () => {
    renderPagination({ page: 12 });

    expect(pageNumbers('desktop')).toEqual(['11', '12', '13', '14', '15', '16', '17', '18', '19', '20']);
  });

  it('renders five mobile page numbers of the current group', () => {
    renderPagination({ page: 12 });

    expect(pageNumbers('mobile')).toEqual(['11', '12', '13', '14', '15']);
  });

  it('labels the last page item', () => {
    renderPagination({ page: 25 });

    expect(pageButton('마지막 페이지, 25 페이지')).toBeInTheDocument();
  });

  context('on a group boundary', () => {
    it('keeps the last page of a group in that group', () => {
      renderPagination({ page: 10 });

      expect(pageNumbers('desktop')).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
      expect(pageNumbers('mobile')).toEqual(['6', '7', '8', '9', '10']);
    });

    it('starts the next group from its first page', () => {
      renderPagination({ page: 11 });

      expect(pageNumbers('desktop')).toEqual(['11', '12', '13', '14', '15', '16', '17', '18', '19', '20']);
      expect(pageNumbers('mobile')).toEqual(['11', '12', '13', '14', '15']);
    });

    it('moves to the next group with the next trigger', async () => {
      const { rerender } = renderPagination({ page: 10 });

      fireEvent.click(screen.getByRole('button', { name: '다음 페이지' }));

      await waitFor(() => expect(handleChangePage).toHaveBeenCalledWith({ page: 11 }));

      rerender((
        <Pagination
          count={250}
          pageSize={10}
          page={11}
          onChangePage={handleChangePage}
        />
      ));

      expect(pageNumbers('desktop')).toEqual(['11', '12', '13', '14', '15', '16', '17', '18', '19', '20']);
      expect(pageButton('11 페이지')).toHaveAttribute('aria-current', 'page');
    });
  });

  context('when the last group is not full', () => {
    it('renders only the remaining desktop pages', () => {
      renderPagination({ page: 23 });

      expect(pageNumbers('desktop')).toEqual(['21', '22', '23', '24', '25']);
    });

    it('renders only the remaining mobile pages', () => {
      renderPagination({ count: 230, page: 23 });

      expect(pageNumbers('mobile')).toEqual(['21', '22', '23']);
    });
  });

  context('when the page is beyond the last page', () => {
    it('shows the last page as current', () => {
      renderPagination({ page: 30 });

      expect(pageNumbers('desktop')).toEqual(['21', '22', '23', '24', '25']);
      expect(pageButton('마지막 페이지, 25 페이지')).toHaveAttribute('aria-current', 'page');
    });
  });

  context('without items', () => {
    it('renders no page numbers', () => {
      renderPagination({ count: 0 });

      expect(pageNumbers('desktop')).toEqual([]);
      expect(pageNumbers('mobile')).toEqual([]);
    });
  });

  context('with a single page', () => {
    it('disables every trigger', () => {
      renderPagination({ count: 10 });

      triggers().forEach((trigger) => {
        expect(trigger).toBeDisabled();
      });
    });
  });

  it('listens for page change event when a page number is clicked', async () => {
    renderPagination();

    fireEvent.click(pageButton('2 페이지'));

    await waitFor(() => expect(handleChangePage).toHaveBeenCalledWith({ page: 2 }));
  });

  it('listens for page change event from the mobile group', async () => {
    renderPagination();

    fireEvent.click(pageButton('4 페이지', 'mobile'));

    await waitFor(() => expect(handleChangePage).toHaveBeenCalledWith({ page: 4 }));
  });

  it('keeps the given page until the page prop changes', async () => {
    const { rerender } = renderPagination();

    fireEvent.click(pageButton('2 페이지'));

    await waitFor(() => expect(handleChangePage).toHaveBeenCalledWith({ page: 2 }));
    expect(pageButton('1 페이지')).toHaveAttribute('aria-current', 'page');

    rerender((
      <Pagination
        count={250}
        pageSize={10}
        page={2}
        onChangePage={handleChangePage}
      />
    ));

    expect(pageButton('2 페이지')).toHaveAttribute('aria-current', 'page');
  });

  it('moves to the previous and next pages', async () => {
    renderPagination({ page: 5 });

    fireEvent.click(screen.getByRole('button', { name: '이전 페이지' }));
    await waitFor(() => expect(handleChangePage).toHaveBeenLastCalledWith({ page: 4 }));

    fireEvent.click(screen.getByRole('button', { name: '다음 페이지' }));
    await waitFor(() => expect(handleChangePage).toHaveBeenLastCalledWith({ page: 6 }));
  });

  it('moves to the first and last pages', async () => {
    renderPagination({ page: 5 });

    fireEvent.click(screen.getByRole('button', { name: '첫 페이지' }));
    await waitFor(() => expect(handleChangePage).toHaveBeenLastCalledWith({ page: 1 }));

    fireEvent.click(screen.getByRole('button', { name: '마지막 페이지' }));
    await waitFor(() => expect(handleChangePage).toHaveBeenLastCalledWith({ page: 25 }));
  });

  it('lets keyboard users focus enabled buttons only', () => {
    renderPagination({ page: 1 });

    const firstTrigger = screen.getByRole('button', { name: '첫 페이지' });
    const button = pageButton('2 페이지');

    firstTrigger.focus();
    expect(firstTrigger).not.toHaveFocus();

    button.focus();
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute('type', 'button');
  });

  context('on the first page', () => {
    it('disables first and previous triggers', () => {
      renderPagination({ page: 1 });

      expect(screen.getByRole('button', { name: '첫 페이지' })).toBeDisabled();
      expect(screen.getByRole('button', { name: '이전 페이지' })).toBeDisabled();
      expect(screen.getByRole('button', { name: '다음 페이지' })).toBeEnabled();
    });
  });

  context('on the last page', () => {
    it('disables next and last triggers', () => {
      renderPagination({ page: 25 });

      expect(screen.getByRole('button', { name: '다음 페이지' })).toBeDisabled();
      expect(screen.getByRole('button', { name: '마지막 페이지' })).toBeDisabled();
      expect(screen.getByRole('button', { name: '이전 페이지' })).toBeEnabled();
    });
  });

  context('when disabled', () => {
    it('disables every button', () => {
      renderPagination({ page: 5, disabled: true });

      screen.getAllByRole('button').forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it('does not listen for page change event', async () => {
      const { rerender } = renderPagination({ page: 5 });

      fireEvent.click(pageButton('6 페이지'));
      await waitFor(() => expect(handleChangePage).toHaveBeenCalledTimes(1));

      rerender((
        <Pagination
          count={250}
          pageSize={10}
          page={5}
          disabled
          onChangePage={handleChangePage}
        />
      ));

      fireEvent.click(pageButton('7 페이지'));
      fireEvent.click(screen.getByRole('button', { name: '다음 페이지' }));
      await new Promise((resolve) => {
        setTimeout(resolve, 50);
      });

      expect(handleChangePage).toHaveBeenCalledTimes(1);
    });
  });
});
