import { render, screen } from '@testing-library/react';

import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render((
      <Badge>검토 중</Badge>
    ));

    expect(screen.getByText('검토 중')).toBeInTheDocument();
  });
});
