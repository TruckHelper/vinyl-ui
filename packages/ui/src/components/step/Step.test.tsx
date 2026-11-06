import { render, screen } from '@testing-library/react';

import { Step } from './Step';
import { StepItem } from './StepItem';

const context = describe;

describe('Step', () => {
  it('renders steps', () => {
    render((
      <Step aria-label="진행 단계">
        <StepItem>하나</StepItem>
        <StepItem>둘</StepItem>
        <StepItem>셋</StepItem>
      </Step>
    ));

    expect(screen.getByRole('list', { name: '진행 단계' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('numbers steps in order', () => {
    render((
      <Step current={3}>
        <StepItem>하나</StepItem>
        <StepItem>둘</StepItem>
        <StepItem>셋</StepItem>
        <StepItem>넷</StepItem>
      </Step>
    ));

    const [, , third, fourth] = screen.getAllByRole('listitem');

    expect(third).toHaveTextContent('3셋');
    expect(fourth).toHaveTextContent('4넷');
  });

  it('sets step to state', () => {
    render((
      <Step current={2}>
        <StepItem>하나</StepItem>
        <StepItem>둘</StepItem>
        <StepItem>셋</StepItem>
      </Step>
    ));

    const [first, second, third] = screen.getAllByRole('listitem');

    expect(first).toHaveAttribute('data-state', 'complete');
    expect(second).toHaveAttribute('data-state', 'current');
    expect(third).toHaveAttribute('data-state', 'upcoming');
  });

  context('without current', () => {
    it('sets first step to current state', () => {
      render((
        <Step>
          <StepItem>하나</StepItem>
          <StepItem>둘</StepItem>
        </Step>
      ));

      const [first, second] = screen.getAllByRole('listitem');

      expect(first).toHaveAttribute('data-state', 'current');
      expect(second).toHaveAttribute('data-state', 'upcoming');
    });
  });

  context('when current is past the last step', () => {
    it('sets every step to complete state', () => {
      render((
        <Step current={3}>
          <StepItem>하나</StepItem>
          <StepItem>둘</StepItem>
        </Step>
      ));

      const items = screen.getAllByRole('listitem');

      items.forEach((item) => expect(item).toHaveAttribute('data-state', 'complete'));
      expect(screen.getAllByRole('img', { name: '완료' })).toHaveLength(2);
    });
  });

  context('when label is off', () => {
    it('hides labels visually', () => {
      render((
        <Step label={false}>
          <StepItem>하나</StepItem>
          <StepItem>둘</StepItem>
        </Step>
      ));

      screen.getAllByRole('listitem')
            .forEach((item) => expect(item).toHaveAttribute('data-label', 'off'));
      expect(screen.getByText('하나')).toBeInTheDocument();
    });

    it('shows first step label', () => {
      render((
        <Step label={false}>
          <StepItem label>하나</StepItem>
          <StepItem>둘</StepItem>
        </Step>
      ));

      const [first, second] = screen.getAllByRole('listitem');

      expect(first).toHaveAttribute('data-label', 'on');
      expect(second).toHaveAttribute('data-label', 'off');
    });
  });

  it('hides first step', () => {
    render((
      <Step>
        <StepItem label={false}>하나</StepItem>
        <StepItem>둘</StepItem>
      </Step>
    ));

    const [first, second] = screen.getAllByRole('listitem');

    expect(first).toHaveAttribute('data-label', 'off');
    expect(second).toHaveAttribute('data-label', 'on');
  });
});
