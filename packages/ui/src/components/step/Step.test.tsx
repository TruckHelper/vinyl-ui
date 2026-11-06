import { render, screen } from '@testing-library/react';

import { Step } from './Step';
import { StepItem } from './StepItem';

const context = describe;

describe('Step', () => {
  it('renders a list with an item per step', () => {
    render((
      <Step aria-label="진행 단계">
        <StepItem state="current">하나</StepItem>
        <StepItem>둘</StepItem>
        <StepItem>셋</StepItem>
      </Step>
    ));

    expect(screen.getByRole('list', { name: '진행 단계' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('marks only the current item', () => {
    render((
      <Step>
        <StepItem state="complete">하나</StepItem>
        <StepItem state="current">둘</StepItem>
        <StepItem>셋</StepItem>
      </Step>
    ));

    const [first, second, third] = screen.getAllByRole('listitem');

    expect(first).not.toHaveAttribute('aria-current');
    expect(second).toHaveAttribute('aria-current', 'step');
    expect(third).not.toHaveAttribute('aria-current');
  });

  context('when label is off', () => {
    it('sets data-label off and keeps label text', () => {
      render((
        <Step label={false}>
          <StepItem>하나</StepItem>
        </Step>
      ));

      expect(screen.getByRole('list')).toHaveAttribute('data-label', 'off');
      expect(screen.getByText('하나')).toBeInTheDocument();
    });
  });

  it('merges className', () => {
    render((
      <Step className="CUSTOM">
        <StepItem>하나</StepItem>
      </Step>
    ));

    expect(screen.getByRole('list')).toHaveClass('CUSTOM');
  });
});
