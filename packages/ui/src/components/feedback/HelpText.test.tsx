import { render, screen } from '@testing-library/react';

import { HelpText } from './HelpText';

describe('HelpText', () => {
  it('renders text', () => {
    render(<HelpText>도움말</HelpText>);

    expect(screen.getByText('도움말')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'info');
  });
});
