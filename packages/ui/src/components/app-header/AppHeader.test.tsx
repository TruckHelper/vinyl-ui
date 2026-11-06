import { fireEvent, render, screen } from '@testing-library/react';

import { AppHeader } from './AppHeader';
import { AppHeaderActions } from './AppHeaderActions';
import { AppHeaderBackButton } from './AppHeaderBackButton';
import { AppHeaderTitle } from './AppHeaderTitle';

const context = describe;

describe('AppHeader', () => {
  it('renders header landmark with title heading', () => {
    render((
      <AppHeader>
        <AppHeaderTitle>주문 내역</AppHeaderTitle>
      </AppHeader>
    ));

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', {
      level: 1,
      name: '주문 내역',
    })).toBeInTheDocument();
  });

  it('renders actions', () => {
    render((
      <AppHeader>
        <AppHeaderTitle>주문 내역</AppHeaderTitle>
        <AppHeaderActions>
          <button type="button">공유</button>
        </AppHeaderActions>
      </AppHeader>
    ));

    expect(screen.getByRole('button', { name: '공유' })).toBeInTheDocument();
  });
});

describe('AppHeaderBackButton', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('listens for click event', () => {
    render((
      <AppHeader>
        <AppHeaderBackButton onClick={handleClick} />
      </AppHeader>
    ));

    fireEvent.click(screen.getByRole('button', { name: '뒤로' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('uses visible text as accessible name with chevron icon', () => {
    render(<AppHeaderBackButton />);

    const button = screen.getByRole('button', { name: '뒤로' });

    expect(button).not.toHaveAttribute('aria-label');
    expect(button).toHaveAttribute('type', 'button');
    expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'chevron-left');
  });

  it('receives keyboard focus', () => {
    render(<AppHeaderBackButton />);

    const button = screen.getByRole('button', { name: '뒤로' });

    button.focus();

    expect(button).toHaveFocus();
  });

  context('with custom text', () => {
    it('uses given text as accessible name', () => {
      render(<AppHeaderBackButton>이전</AppHeaderBackButton>);

      expect(screen.getByRole('button', { name: '이전' })).toBeInTheDocument();
    });
  });

  context('with aria-label', () => {
    it('passes given accessible name', () => {
      render((
        <AppHeaderBackButton aria-label="뒤로 가기">
          뒤로
        </AppHeaderBackButton>
      ));

      expect(screen.getByRole('button', { name: '뒤로 가기' })).toHaveTextContent('뒤로');
    });
  });

  context('when disabled', () => {
    it('does not call click handler', () => {
      render((
        <AppHeaderBackButton
          disabled
          onClick={handleClick}
        />
      ));

      const button = screen.getByRole('button', { name: '뒤로' });

      fireEvent.click(button);

      expect(button).toBeDisabled();
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
