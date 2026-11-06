import type { ComponentProps } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { AddressField } from './AddressField';

const context = describe;

describe('AddressField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const handleChangeValue = jest.fn();
  const handleClickButton = jest.fn();

  const emptyValue = { zipCode: '', address: '', detail: '' };

  const filledValue = {
    zipCode: '06236',
    address: '서울 강남구 테헤란로 123',
    detail: '',
  };

  function renderAddressField(props: Partial<ComponentProps<typeof AddressField>> = {}) {
    return render((
      <AddressField
        name="address"
        label="주소"
        value={emptyValue}
        buttonLabel="주소 검색"
        onChangeValue={handleChangeValue}
        onClickButton={handleClickButton}
        {...props}
      />
    ));
  }

  it('renders label, address input, button and detail input', () => {
    renderAddressField({
      addressPlaceholder: '주소를 검색해 주세요',
      detailPlaceholder: '상세 주소를 입력해 주세요',
    });

    expect(screen.getByLabelText('주소')).toHaveAttribute('placeholder', '주소를 검색해 주세요');
    expect(screen.getByRole('button', { name: '주소 검색' })).toBeInTheDocument();
    expect(screen.getByLabelText('상세 주소')).toHaveAttribute('placeholder', '상세 주소를 입력해 주세요');
  });

  it('makes the address input read-only', () => {
    renderAddressField();

    expect(screen.getByLabelText('주소')).toHaveAttribute('readonly');
    expect(screen.getByLabelText('상세 주소')).not.toHaveAttribute('readonly');
  });

  it('shows zip code and address from value', () => {
    renderAddressField({ value: { ...filledValue, detail: '101동 1001호' } });

    expect(screen.getByLabelText('주소')).toHaveValue('(06236) 서울 강남구 테헤란로 123');
    expect(screen.getByLabelText('상세 주소')).toHaveValue('101동 1001호');
  });

  context('without zip code', () => {
    it('shows only the address', () => {
      renderAddressField({ value: { ...filledValue, zipCode: '' } });

      expect(screen.getByLabelText('주소')).toHaveValue('서울 강남구 테헤란로 123');
    });
  });

  it('listens for detail change event with the whole value', () => {
    renderAddressField({ value: filledValue });

    fireEvent.change(screen.getByLabelText('상세 주소'), { target: { value: '101동' } });

    expect(handleChangeValue).toHaveBeenCalledWith({
      name: 'address',
      value: { ...filledValue, detail: '101동' },
    });
  });

  it('listens for button click event', () => {
    renderAddressField();

    fireEvent.click(screen.getByRole('button', { name: '주소 검색' }));

    expect(handleClickButton).toHaveBeenCalledTimes(1);
  });

  it('does not submit the form when clicking the button', () => {
    const handleSubmit = jest.fn((event) => event.preventDefault());

    render((
      <form onSubmit={handleSubmit}>
        <AddressField
          name="address"
          value={emptyValue}
          buttonLabel="주소 검색"
          onChangeValue={handleChangeValue}
          onClickButton={handleClickButton}
        />
      </form>
    ));

    fireEvent.click(screen.getByRole('button', { name: '주소 검색' }));

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('places the button between the address input and the detail input in tab order', () => {
    renderAddressField();

    const address = screen.getByLabelText('주소');
    const button = screen.getByRole('button', { name: '주소 검색' });
    const detail = screen.getByLabelText('상세 주소');

    button.focus();

    expect(button).toHaveFocus();
    expect(address.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(button.compareDocumentPosition(detail) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('forwards ref to the detail input', () => {
    const ref = { current: null as HTMLInputElement | null };

    renderAddressField({ ref });

    expect(ref.current).toBe(screen.getByLabelText('상세 주소'));
  });

  context('with custom detail label', () => {
    it('labels the detail input with it', () => {
      renderAddressField({ detailLabel: '나머지 주소' });

      expect(screen.getByLabelText('나머지 주소')).toBeInTheDocument();
    });
  });

  context('when required', () => {
    it('marks the label as required', () => {
      renderAddressField({ required: true });

      expect(screen.getByText('주소')).toHaveAttribute('data-required', 'true');
    });

    it('does not require the detail input', () => {
      renderAddressField({ required: true });

      expect(screen.getByLabelText('상세 주소')).not.toBeRequired();
    });
  });

  context('with only zip code', () => {
    it('shows only the zip code', () => {
      renderAddressField({ value: { ...emptyValue, zipCode: '06236' } });

      expect(screen.getByLabelText('주소')).toHaveValue('(06236)');
    });
  });

  context('with only hasError', () => {
    it('marks both inputs invalid without describing them', () => {
      renderAddressField({ hasError: true });

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByLabelText('주소')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText('주소')).not.toHaveAttribute('aria-describedby');
      expect(screen.getByLabelText('상세 주소')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText('상세 주소')).not.toHaveAttribute('aria-describedby');
    });
  });

  context('with error', () => {
    it('renders error message and marks both inputs invalid', () => {
      renderAddressField({
        hasError: true,
        errorMessage: '주소를 입력해 주세요',
      });

      expect(screen.getByRole('alert')).toHaveTextContent('주소를 입력해 주세요');
      expect(screen.getByLabelText('주소')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText('주소')).toHaveAttribute('aria-describedby', 'input-address-error');
      expect(screen.getByLabelText('상세 주소')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText('상세 주소')).toHaveAttribute('aria-describedby', 'input-address-error');
    });
  });

  context('with only errorMessage', () => {
    it('renders error message and marks both inputs invalid', () => {
      renderAddressField({ errorMessage: '주소를 입력해 주세요' });

      expect(screen.getByRole('alert')).toHaveTextContent('주소를 입력해 주세요');
      expect(screen.getByLabelText('주소')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText('상세 주소')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  context('without error', () => {
    it('renders no error message', () => {
      renderAddressField();

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByLabelText('상세 주소')).not.toHaveAttribute('aria-invalid');
    });
  });

  context('when disabled', () => {
    it('disables both inputs only', () => {
      renderAddressField({ disabled: true });

      expect(screen.getByLabelText('주소')).toBeDisabled();
      expect(screen.getByLabelText('상세 주소')).toBeDisabled();
      expect(screen.getByRole('button', { name: '주소 검색' })).toBeEnabled();
    });
  });

  context('when button is disabled', () => {
    it('disables the button', () => {
      renderAddressField({ buttonDisabled: true });

      expect(screen.getByRole('button', { name: '주소 검색' })).toBeDisabled();
    });
  });
});
