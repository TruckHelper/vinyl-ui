import { render, screen } from '@testing-library/react';

import { Icon, type IconName } from './Icon';

const context = describe;

describe('Icon', () => {
  it('renders without crash', () => {
    const name = 'chevron-right';

    render(<Icon name={name} />);

    expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'chevron-right');
  });

  context('when icon name does not exits', () => {
    it('renders file-x icon', () => {
      const name = 'unknown-name' as unknown as IconName;

      render(<Icon name={name} />);

      expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'file-x');
    });
  });
});
