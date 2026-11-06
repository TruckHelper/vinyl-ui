import { render, screen } from '@testing-library/react';

import { ProcessItem } from './ProcessItem';

const context = describe;

describe('ProcessItem', () => {
  it('renders the label with a decorative dot', () => {
    render(<ProcessItem type="pending">정보 입력</ProcessItem>);

    expect(screen.getByRole('listitem')).toHaveTextContent('정보 입력');
    expect(screen.getByTestId('process-item-dot')).toHaveAttribute('aria-hidden', 'true');
  });

  it('passes className to the item', () => {
    render((
      <ProcessItem
        type="pending"
        className="custom"
      >
        정보 입력
      </ProcessItem>
    ));

    expect(screen.getByRole('listitem')).toHaveClass('custom');
  });

  context('when type is pending', () => {
    it('is not the current step', () => {
      render(<ProcessItem type="pending">정보 입력</ProcessItem>);

      expect(screen.getByRole('listitem')).not.toHaveAttribute('aria-current');
    });
  });

  context('when type is active', () => {
    it('is the current step', () => {
      render(<ProcessItem type="active">정보 입력</ProcessItem>);

      expect(screen.getByRole('listitem')).toHaveAttribute('aria-current', 'step');
    });
  });

  context('when type is pending at the current index', () => {
    it('uses the type over the index', () => {
      render((
        <ProcessItem
          index={0}
          type="pending"
        >
          정보 입력
        </ProcessItem>
      ));

      expect(screen.getByRole('listitem')).not.toHaveAttribute('aria-current');
    });
  });
});
