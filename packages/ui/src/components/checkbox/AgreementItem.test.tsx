import { useState } from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { AgreementItem } from './AgreementItem';

const context = describe;

function AgreementForm() {
  const [agreed, setAgreed] = useState({
    service: false,
    privacy: false,
  });

  const allChecked = agreed.service && agreed.privacy;

  const handleChangeAll = ({ value }: { name: string; value: boolean }) => {
    setAgreed({
      service: value,
      privacy: value,
    });
  };

  const handleChange = ({ name, value }: { name: string; value: boolean }) => {
    setAgreed((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <AgreementItem
        variant="all"
        name="all"
        checked={allChecked}
        onChangeChecked={handleChangeAll}
      >
        전체 동의
      </AgreementItem>
      <AgreementItem
        name="service"
        checked={agreed.service}
        onChangeChecked={handleChange}
      >
        서비스 이용약관 동의
      </AgreementItem>
      <AgreementItem
        name="privacy"
        checked={agreed.privacy}
        onChangeChecked={handleChange}
      >
        개인정보 수집 동의
      </AgreementItem>
    </>
  );
}

describe('AgreementItem', () => {
  const handleChange = jest.fn();
  const handleDetailClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders checkbox with its text', () => {
    render((
      <AgreementItem
        name="service"
        checked={false}
        onChangeChecked={handleChange}
      >
        서비스 이용약관 동의
      </AgreementItem>
    ));

    expect(screen.getByRole('checkbox', { name: '서비스 이용약관 동의' })).not.toBeChecked();
  });

  it('listens for click event', async () => {
    render((
      <AgreementItem
        name="service"
        checked={false}
        onChangeChecked={handleChange}
      >
        서비스 이용약관 동의
      </AgreementItem>
    ));

    fireEvent.click(screen.getByText('서비스 이용약관 동의'));

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
      name: 'service',
      value: true,
    }));
  });

  context('with detail handler', () => {
    it('listens for detail button click without changing checked value', async () => {
      render((
        <AgreementItem
          name="service"
          checked={false}
          onChangeChecked={handleChange}
          onDetailClick={handleDetailClick}
        >
          서비스 이용약관 동의
        </AgreementItem>
      ));

      fireEvent.click(screen.getByRole('button', { name: '상세 보기' }));

      expect(handleDetailClick).toHaveBeenCalledTimes(1);

      await waitFor(() => expect(handleChange).not.toHaveBeenCalled());
    });

    it('uses detail label as button name', () => {
      render((
        <AgreementItem
          name="service"
          checked={false}
          detailLabel="서비스 이용약관 보기"
          onChangeChecked={handleChange}
          onDetailClick={handleDetailClick}
        >
          서비스 이용약관 동의
        </AgreementItem>
      ));

      expect(screen.getByRole('button', { name: '서비스 이용약관 보기' })).toBeInTheDocument();
    });
  });

  context('without detail handler', () => {
    it('does not render detail button', () => {
      render((
        <AgreementItem
          name="service"
          checked={false}
          onChangeChecked={handleChange}
        >
          서비스 이용약관 동의
        </AgreementItem>
      ));

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  context('with variant all', () => {
    it('does not render detail button', () => {
      render((
        <AgreementItem
          variant="all"
          name="all"
          checked={false}
          onChangeChecked={handleChange}
          onDetailClick={handleDetailClick}
        >
          전체 동의
        </AgreementItem>
      ));

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('checks every item when all is checked', async () => {
      render(<AgreementForm />);

      fireEvent.click(screen.getByText('전체 동의'));

      await waitFor(() => {
        expect(screen.getByRole('checkbox', { name: '서비스 이용약관 동의' })).toBeChecked();
      });

      expect(screen.getByRole('checkbox', { name: '개인정보 수집 동의' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: '전체 동의' })).toBeChecked();
    });

    it('unchecks every item when all is unchecked', async () => {
      render(<AgreementForm />);

      fireEvent.click(screen.getByText('전체 동의'));

      await waitFor(() => {
        expect(screen.getByRole('checkbox', { name: '전체 동의' })).toBeChecked();
      });

      fireEvent.click(screen.getByText('전체 동의'));

      await waitFor(() => {
        expect(screen.getByRole('checkbox', { name: '서비스 이용약관 동의' })).not.toBeChecked();
      });

      expect(screen.getByRole('checkbox', { name: '개인정보 수집 동의' })).not.toBeChecked();
    });

    it('checks all when every item is checked', async () => {
      render(<AgreementForm />);

      fireEvent.click(screen.getByText('서비스 이용약관 동의'));

      await waitFor(() => {
        expect(screen.getByRole('checkbox', { name: '서비스 이용약관 동의' })).toBeChecked();
      });

      expect(screen.getByRole('checkbox', { name: '전체 동의' })).not.toBeChecked();

      fireEvent.click(screen.getByText('개인정보 수집 동의'));

      await waitFor(() => {
        expect(screen.getByRole('checkbox', { name: '전체 동의' })).toBeChecked();
      });
    });
  });

  context('with error', () => {
    it('marks checkbox as invalid', () => {
      render((
        <AgreementItem
          name="service"
          checked={false}
          hasError
          onChangeChecked={handleChange}
        >
          서비스 이용약관 동의
        </AgreementItem>
      ));

      expect(screen.getByRole('checkbox', { name: '서비스 이용약관 동의' })).toHaveAttribute('aria-invalid', 'true');
    });
  });

  context('when disabled', () => {
    it('disables checkbox and detail button', () => {
      render((
        <AgreementItem
          name="service"
          checked={false}
          disabled
          onChangeChecked={handleChange}
          onDetailClick={handleDetailClick}
        >
          서비스 이용약관 동의
        </AgreementItem>
      ));

      expect(screen.getByRole('checkbox')).toBeDisabled();
      expect(screen.getByRole('button', { name: '상세 보기' })).toBeDisabled();
    });
  });
});
