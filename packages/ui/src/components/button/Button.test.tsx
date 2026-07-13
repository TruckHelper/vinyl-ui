import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from './Button';

const context = describe;

describe('Button', () => {
  it('renders and listens for button click events', () => {
    const handleClick = jest.fn();

    render((
      <Button onClick={handleClick}>
        확인
      </Button>
    ));

    const button = screen.getByRole('button', { name: '확인' });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  context('when disabled', () => {
    it('is disabled', () => {
      render((
        <Button disabled>
          확인
        </Button>
      ));

      expect(screen.getByRole('button', { name: '확인' })).toBeDisabled();
    });
  });

  context('with icons', () => {
    it('renders right side icon', () => {
      render((
        <Button rightIcon="chevron-right">
          다음
        </Button>
      ));

      expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'chevron-right');
    });
  });

  it('renders left side icon', () => {
    render((
      <Button leftIcon="chevron-left">
        다음
      </Button>
    ));

    expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'chevron-left');
  });
});
