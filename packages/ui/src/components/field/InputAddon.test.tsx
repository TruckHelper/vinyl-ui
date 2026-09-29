import { render, screen } from '@testing-library/react';

import { InputAddon } from './InputAddon';

describe('InputAddon', () => {
  it('renders children', () => {
    render((
      <InputAddon>
        <span>kg</span>
      </InputAddon>
    ));

    screen.getByText('kg');
  });

  it('passes native attributes', () => {
    render(<InputAddon data-testid="addon" />);

    screen.getByTestId('addon');
  });
});
