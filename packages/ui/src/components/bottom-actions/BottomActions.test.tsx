import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../button/Button';

import { BottomActions } from './BottomActions';

const context = describe;

describe('BottomActions', () => {
  it('renders the buttons passed as children', () => {
    render((
      <BottomActions>
        <Button fit="block">확인</Button>
      </BottomActions>
    ));

    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
  });

  context('when the variant is weighted', () => {
    it('keeps the order of the buttons', () => {
      render((
        <BottomActions variant="weighted">
          <Button
            variant="neutral"
            fit="block"
          >
            이전
          </Button>
          <Button fit="block">다음</Button>
        </BottomActions>
      ));

      const [first, second] = screen.getAllByRole('button');

      expect(first).toHaveTextContent('이전');
      expect(second).toHaveTextContent('다음');
    });
  });

  it('passes clicks through to each button', () => {
    const handleCancel = jest.fn();
    const handleConfirm = jest.fn();

    render((
      <BottomActions variant="equal">
        <Button
          variant="neutral"
          fit="block"
          onClick={handleCancel}
        >
          취소
        </Button>
        <Button
          fit="block"
          onClick={handleConfirm}
        >
          확인
        </Button>
      </BottomActions>
    ));

    fireEvent.click(screen.getByRole('button', { name: '확인' }));

    expect(handleConfirm).toHaveBeenCalledTimes(1);
    expect(handleCancel).not.toHaveBeenCalled();
  });

  it('forwards className to the root element', () => {
    render((
      <BottomActions
        className="custom"
        data-testid="bottom-actions"
      >
        <Button fit="block">확인</Button>
      </BottomActions>
    ));

    expect(screen.getByTestId('bottom-actions')).toHaveClass('custom');
  });
});
