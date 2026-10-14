import { render, screen } from '@testing-library/react';

import { HelpText } from './HelpText';

const context = describe;

describe('HelpText', () => {
  it('renders text and info icon', () => {
    render(<HelpText>도움말</HelpText>);

    expect(screen.getByText('도움말')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'info');
  });

  context('without role', () => {
    it('does not render as alert even for notice-error', () => {
      render(<HelpText state="notice-error">오류</HelpText>);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  context('with role given by the consumer', () => {
    it('applies it', () => {
      render((
        <HelpText
          state="notice-error"
          role="alert"
        >
          오류
        </HelpText>
      ));

      expect(screen.getByRole('alert')).toHaveTextContent('오류');
    });
  });
});
