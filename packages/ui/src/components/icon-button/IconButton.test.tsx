import { fireEvent, render, screen } from '@testing-library/react';

import { IconButton } from './IconButton';

const context = describe;

describe('IconButton', () => {
  it('renders icon', () => {
    render((
      <IconButton
        icon="x"
        aria-label="닫기"
      />
    ));

    expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'x');
  });

  it('listens for button click events', () => {
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

  context('when disabled', () => {
    it('disables button click event', () => {
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
