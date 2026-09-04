import { render, screen } from '@testing-library/react';

import { Label } from './Label';

const context = describe;

describe('Label', () => {
  it('renders its text', () => {
    render((
      <Label>이름</Label>
    ));

    expect(screen.getByText('이름')).toBeInTheDocument();
  });

  context('when required', () => {
    it('marks the label as required', () => {
      render((
        <Label required>이름</Label>
      ));

      expect(screen.getByText('이름')).toHaveAttribute('data-required', 'true');
    });
  });

  context('when not required', () => {
    it('is not marked as required', () => {
      render((
        <Label>이름</Label>
      ));

      expect(screen.getByText('이름')).not.toHaveAttribute('data-required');
    });
  });
});
