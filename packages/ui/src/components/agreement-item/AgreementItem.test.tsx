import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { AgreementItem } from './AgreementItem';
import type { AgreementItemProps } from './AgreementItem';

const context = describe;

describe('AgreementItem', () => {
  const handleChange = jest.fn();
  const handleDetailClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderAgreementItem(props: Partial<AgreementItemProps> = {}) {
    return render((
      <AgreementItem
        name="service"
        checked={false}
        onChangeChecked={handleChange}
        {...props}
      >
        서비스 이용약관 동의
      </AgreementItem>
    ));
  }

  it('renders checkbox and label', () => {
    renderAgreementItem();

    expect(screen.getByRole('checkbox', { name: '서비스 이용약관 동의' })).not.toBeChecked();
  });

  it('listens for click event', async () => {
    renderAgreementItem();

    fireEvent.click(screen.getByText('서비스 이용약관 동의'));

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
      name: 'service',
      value: true,
    }));
  });

  context('with detail handler', () => {
    function renderWithDetailHandler(props: Partial<AgreementItemProps> = {}) {
      return renderAgreementItem({ onDetailClick: handleDetailClick, ...props });
    }

    it('listens for detail button click', async () => {
      renderWithDetailHandler();

      fireEvent.click(screen.getByRole('button', { name: '상세 보기' }));

      expect(handleDetailClick).toHaveBeenCalledTimes(1);

      await waitFor(() => expect(handleChange).not.toHaveBeenCalled());
    });

    context('with detail label', () => {
      it('uses detail label as button name', () => {
        renderWithDetailHandler({ detailLabel: '서비스 이용약관 보기' });

        expect(screen.getByRole('button', { name: '서비스 이용약관 보기' })).toBeInTheDocument();
      });
    });
  });

  context('without detail handler', () => {
    it('does not render detail button', () => {
      renderAgreementItem();

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  context('with error', () => {
    it('marks checkbox as invalid', () => {
      renderAgreementItem({ hasError: true });

      expect(screen.getByRole('checkbox', { name: '서비스 이용약관 동의' })).toHaveAttribute('aria-invalid', 'true');
    });
  });

  context('when disabled', () => {
    it('disables checkbox and detail button', () => {
      renderAgreementItem({
        disabled: true,
        onDetailClick: handleDetailClick,
      });

      expect(screen.getByRole('checkbox')).toBeDisabled();
      expect(screen.getByRole('button', { name: '상세 보기' })).toBeDisabled();
    });
  });
});
