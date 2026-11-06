import { render, screen } from '@testing-library/react';

import { Step } from './Step';
import { StepItem } from './StepItem';

const context = describe;

describe('StepItem', () => {
  it('renders label text as a list item', () => {
    render((
      <ul>
        <StepItem>정보 입력</StepItem>
      </ul>
    ));

    expect(screen.getByRole('listitem')).toHaveTextContent('정보 입력');
  });

  it('defaults to part state without aria-current', () => {
    render((
      <ul>
        <StepItem>정보 입력</StepItem>
      </ul>
    ));

    const item = screen.getByRole('listitem');

    expect(item).toHaveAttribute('data-state', 'part');
    expect(item).not.toHaveAttribute('aria-current');
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  context('when step is given', () => {
    it('shows the step number as text', () => {
      render((
        <ul>
          <StepItem
            state="current"
            step={3}
          >
            정보 입력
          </StepItem>
        </ul>
      ));

      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  context('when current', () => {
    it('marks aria-current as step', () => {
      render((
        <ul>
          <StepItem state="current">정보 입력</StepItem>
        </ul>
      ));

      expect(screen.getByRole('listitem')).toHaveAttribute('aria-current', 'step');
    });
  });

  context('when complete', () => {
    it('announces completion to screen readers', () => {
      render((
        <ul>
          <StepItem state="complete">정보 입력</StepItem>
        </ul>
      ));

      expect(screen.getByText('완료')).toBeInTheDocument();
    });

    it('shows a check icon', () => {
      render((
        <ul>
          <StepItem state="complete">정보 입력</StepItem>
        </ul>
      ));

      expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'check');
    });

    it('does not mark aria-current', () => {
      render((
        <ul>
          <StepItem state="complete">정보 입력</StepItem>
        </ul>
      ));

      expect(screen.getByRole('listitem')).not.toHaveAttribute('aria-current');
    });
  });

  context('when label is off', () => {
    it('keeps label text in the DOM', () => {
      render((
        <ul>
          <StepItem label={false}>정보 입력</StepItem>
        </ul>
      ));

      expect(screen.getByRole('listitem')).toHaveAttribute('data-label', 'off');
      expect(screen.getByText('정보 입력')).toBeInTheDocument();
    });
  });

  context('when item label overrides step label off', () => {
    it('marks the item label on inside a label-off step', () => {
      render((
        <Step label={false}>
          <StepItem label>정보 입력</StepItem>
          <StepItem>결제</StepItem>
        </Step>
      ));

      const [first, second] = screen.getAllByRole('listitem');

      expect(screen.getByRole('list')).toHaveAttribute('data-label', 'off');
      expect(first).toHaveAttribute('data-label', 'on');
      expect(second).not.toHaveAttribute('data-label');
    });
  });

  it('merges className', () => {
    render((
      <ul>
        <StepItem className="CUSTOM">정보 입력</StepItem>
      </ul>
    ));

    expect(screen.getByRole('listitem')).toHaveClass('CUSTOM');
  });
});
