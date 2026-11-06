import { render, screen } from '@testing-library/react';

import { ProcessIndicator } from './ProcessIndicator';
import { ProcessItem } from './ProcessItem';

const context = describe;

describe('ProcessIndicator', () => {
  it('renders an ordered list with an item per child', () => {
    render((
      <ProcessIndicator aria-label="신청 단계">
        <ProcessItem index={0}>입력</ProcessItem>
        <ProcessItem index={1}>확인</ProcessItem>
        <ProcessItem index={2}>완료</ProcessItem>
      </ProcessIndicator>
    ));

    expect(screen.getByRole('list', { name: '신청 단계' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('passes className to the list', () => {
    render((
      <ProcessIndicator className="custom">
        <ProcessItem index={0}>입력</ProcessItem>
      </ProcessIndicator>
    ));

    expect(screen.getByRole('list')).toHaveClass('custom');
  });

  it('marks the first item as current by default', () => {
    render((
      <ProcessIndicator>
        <ProcessItem index={0}>입력</ProcessItem>
        <ProcessItem index={1}>확인</ProcessItem>
      </ProcessIndicator>
    ));

    expect(screen.getByRole('listitem', { current: 'step' })).toHaveTextContent('입력');
    expect(screen.getByText('확인')).not.toHaveAttribute('aria-current');
  });

  context('with current', () => {
    it('marks only the item at that index as current', () => {
      render((
        <ProcessIndicator current={1}>
          <ProcessItem index={0}>입력</ProcessItem>
          <ProcessItem index={1}>확인</ProcessItem>
          <ProcessItem index={2}>완료</ProcessItem>
        </ProcessIndicator>
      ));

      expect(screen.getAllByRole('listitem', { current: 'step' })).toHaveLength(1);
      expect(screen.getByText('확인')).toHaveAttribute('aria-current', 'step');
    });
  });

  context('when current changes', () => {
    it('moves the current item', () => {
      const { rerender } = render((
        <ProcessIndicator current={0}>
          <ProcessItem index={0}>입력</ProcessItem>
          <ProcessItem index={1}>확인</ProcessItem>
        </ProcessIndicator>
      ));

      rerender((
        <ProcessIndicator current={1}>
          <ProcessItem index={0}>입력</ProcessItem>
          <ProcessItem index={1}>확인</ProcessItem>
        </ProcessIndicator>
      ));

      expect(screen.getByText('입력')).not.toHaveAttribute('aria-current');
      expect(screen.getByText('확인')).toHaveAttribute('aria-current', 'step');
    });
  });

  context('when items are wrapped in a fragment', () => {
    it('still marks the current item', () => {
      render((
        <ProcessIndicator current={1}>
          <>
            <ProcessItem index={0}>입력</ProcessItem>
            <ProcessItem index={1}>확인</ProcessItem>
          </>
        </ProcessIndicator>
      ));

      expect(screen.getByText('확인')).toHaveAttribute('aria-current', 'step');
    });
  });

  context('when an item type is given explicitly', () => {
    it('uses the type over the index', () => {
      render((
        <ProcessIndicator>
          <ProcessItem
            index={0}
            type="pending"
          >
            입력
          </ProcessItem>
          <ProcessItem
            index={1}
            type="active"
          >
            확인
          </ProcessItem>
        </ProcessIndicator>
      ));

      expect(screen.getByText('입력')).not.toHaveAttribute('aria-current');
      expect(screen.getByText('확인')).toHaveAttribute('aria-current', 'step');
    });
  });
});
