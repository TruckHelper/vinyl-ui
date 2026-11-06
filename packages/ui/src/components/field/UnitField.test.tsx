import { createRef } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { UnitField } from './UnitField';

const context = describe;

describe('UnitField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const handleChangeValue = jest.fn();

  it('renders label, placeholder and unit text', () => {
    render((
      <UnitField
        label="무게"
        name="weight"
        value=""
        unit="kg"
        placeholder="무게를 입력하세요"
        onChangeValue={handleChangeValue}
      />
    ));

    expect(screen.getByLabelText('무게')).toHaveAttribute('placeholder', '무게를 입력하세요');
    expect(screen.getByText('kg')).toBeInTheDocument();
  });

  it('describes the input with the unit text', () => {
    render((
      <UnitField
        label="금액"
        name="price"
        value="1000"
        unit="원"
        onChangeValue={handleChangeValue}
      />
    ));

    expect(screen.getByLabelText('금액')).toHaveAccessibleDescription('원');
  });

  it('applies the input mode', () => {
    render((
      <UnitField
        label="무게"
        name="weight"
        value=""
        unit="kg"
        inputMode="decimal"
        onChangeValue={handleChangeValue}
      />
    ));

    expect(screen.getByLabelText('무게')).toHaveAttribute('inputmode', 'decimal');
  });

  it('forwards the ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();

    render((
      <UnitField
        ref={ref}
        label="무게"
        name="weight"
        value=""
        unit="kg"
        onChangeValue={handleChangeValue}
      />
    ));

    expect(ref.current).toBe(screen.getByLabelText('무게'));
  });

  context('when the unit is pressed', () => {
    it('focuses the input', () => {
      render((
        <UnitField
          label="무게"
          name="weight"
          value=""
          unit="kg"
          onChangeValue={handleChangeValue}
        />
      ));

      fireEvent.pointerDown(screen.getByText('kg'));

      expect(screen.getByLabelText('무게')).toHaveFocus();
    });
  });

  context('when the value changes', () => {
    it('calls onChangeValue with name and value', () => {
      render((
        <UnitField
          label="무게"
          name="weight"
          value=""
          unit="kg"
          onChangeValue={handleChangeValue}
        />
      ));

      fireEvent.change(screen.getByLabelText('무게'), {
        target: { value: '12' },
      });

      expect(handleChangeValue).toHaveBeenCalledWith({
        name: 'weight',
        value: '12',
      });
    });
  });

  context('when required', () => {
    it('marks the label and the input as required', () => {
      render((
        <UnitField
          label="무게"
          name="weight"
          value=""
          unit="kg"
          required
          onChangeValue={handleChangeValue}
        />
      ));

      expect(screen.getByText('무게')).toHaveAttribute('data-required', 'true');
      expect(screen.getByLabelText('무게')).toBeRequired();
    });
  });

  context('when disabled', () => {
    it('disables the input', () => {
      render((
        <UnitField
          label="무게"
          name="weight"
          value=""
          unit="kg"
          disabled
          onChangeValue={handleChangeValue}
        />
      ));

      expect(screen.getByLabelText('무게')).toBeDisabled();
    });
  });

  context('with error', () => {
    it('renders error message and describes the input with unit and error', () => {
      render((
        <UnitField
          label="무게"
          name="weight"
          value="0"
          unit="kg"
          errorMessage="0보다 큰 값을 입력하세요"
          onChangeValue={handleChangeValue}
        />
      ));

      const input = screen.getByLabelText('무게');

      expect(screen.getByRole('alert')).toHaveTextContent('0보다 큰 값을 입력하세요');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAccessibleDescription('kg 0보다 큰 값을 입력하세요');
    });
  });

  context('with hasError only', () => {
    it('marks the input as invalid without an error message', () => {
      render((
        <UnitField
          label="무게"
          name="weight"
          value="0"
          unit="kg"
          hasError
          onChangeValue={handleChangeValue}
        />
      ));

      expect(screen.getByLabelText('무게')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
