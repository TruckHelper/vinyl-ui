import { fireEvent, render, screen } from '@testing-library/react';

import { IconButton } from './IconButton';

const context = describe;

describe('IconButton', () => {
  it('renders a button named by aria-label', () => {
    render((
      <IconButton
        icon="x"
        aria-label="닫기"
      />
    ));

    expect(screen.getByRole('button', { name: '닫기' })).toHaveAttribute('type', 'button');
  });

  it('renders the given icon', () => {
    render((
      <IconButton
        icon="x"
        aria-label="닫기"
      />
    ));

    expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'x');
  });

  it('listens for click events', () => {
    const handleClick = jest.fn();

    render((
      <IconButton
        icon="x"
        aria-label="닫기"
        onClick={handleClick}
      />
    ));

    fireEvent.click(screen.getByRole('button', { name: '닫기' }));

    expect(handleClick).toHaveBeenCalled();
  });

  it('receives keyboard focus', () => {
    render((
      <IconButton
        icon="x"
        aria-label="닫기"
      />
    ));

    const button = screen.getByRole('button', { name: '닫기' });

    button.focus();

    expect(button).toHaveFocus();
  });

  context('when disabled', () => {
    it('is disabled and ignores clicks', () => {
      const handleClick = jest.fn();

      render((
        <IconButton
          icon="x"
          aria-label="닫기"
          disabled
          onClick={handleClick}
        />
      ));

      const button = screen.getByRole('button', { name: '닫기' });

      fireEvent.click(button);

      expect(button).toBeDisabled();
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
