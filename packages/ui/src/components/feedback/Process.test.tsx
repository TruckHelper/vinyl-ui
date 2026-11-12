import { render, screen } from '@testing-library/react';

import { Process } from './Process';
import { ProcessItem } from './ProcessItem';

const context = describe;

describe('Process', () => {
  it('renders steps', () => {
    render((
      <Process aria-label="신청 단계">
        <ProcessItem>입력</ProcessItem>
        <ProcessItem>확인</ProcessItem>
        <ProcessItem>완료</ProcessItem>
      </Process>
    ));

    expect(screen.getByRole('list', { name: '신청 단계' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('sets step to state', () => {
    render((
      <Process current={2}>
        <ProcessItem>입력</ProcessItem>
        <ProcessItem>확인</ProcessItem>
        <ProcessItem>완료</ProcessItem>
      </Process>
    ));

    const [first, second, third] = screen.getAllByRole('listitem');

    expect(first).toHaveAttribute('data-state', 'complete');
    expect(second).toHaveAttribute('data-state', 'current');
    expect(third).toHaveAttribute('data-state', 'upcoming');
  });

  it('marks current step with aria-current', () => {
    render((
      <Process current={2}>
        <ProcessItem>입력</ProcessItem>
        <ProcessItem>확인</ProcessItem>
        <ProcessItem>완료</ProcessItem>
      </Process>
    ));

    const [first, second, third] = screen.getAllByRole('listitem');

    expect(first).not.toHaveAttribute('aria-current');
    expect(second).toHaveAttribute('aria-current', 'step');
    expect(third).not.toHaveAttribute('aria-current');
  });

  context('without current', () => {
    it('sets first step to current state', () => {
      render((
        <Process>
          <ProcessItem>입력</ProcessItem>
          <ProcessItem>확인</ProcessItem>
        </Process>
      ));

      const [first, second] = screen.getAllByRole('listitem');

      expect(first).toHaveAttribute('data-state', 'current');
      expect(second).toHaveAttribute('data-state', 'upcoming');
    });
  });

  context('when current is past the last step', () => {
    it('sets every step to complete state', () => {
      render((
        <Process current={3}>
          <ProcessItem>입력</ProcessItem>
          <ProcessItem>확인</ProcessItem>
        </Process>
      ));

      screen.getAllByRole('listitem')
        .forEach((item) => expect(item).toHaveAttribute('data-state', 'complete'));
    });
  });

  context('when current changes', () => {
    it('moves current state', () => {
      const { rerender } = render((
        <Process current={1}>
          <ProcessItem>입력</ProcessItem>
          <ProcessItem>확인</ProcessItem>
        </Process>
      ));

      rerender((
        <Process current={2}>
          <ProcessItem>입력</ProcessItem>
          <ProcessItem>확인</ProcessItem>
        </Process>
      ));

      const [first, second] = screen.getAllByRole('listitem');

      expect(first).toHaveAttribute('data-state', 'complete');
      expect(second).toHaveAttribute('data-state', 'current');
    });
  });
});
