import { render, screen } from '@testing-library/react';

import { Caption } from './Caption';

describe('Caption', () => {
  it('renders text with a decorative marker', () => {
    render((
      <Caption>Caption</Caption>
    ));

    expect(screen.getByText('Caption')).toBeInTheDocument();
    expect(screen.getByTestId('caption-marker')).toHaveAttribute('aria-hidden', 'true');
  });
});
