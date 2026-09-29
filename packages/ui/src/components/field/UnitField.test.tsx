import { fireEvent, render, screen } from '@testing-library/react';

import { UnitField } from './UnitField';

const context = describe;

describe('UnitField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const handleChangeField = jest.fn();

  it('renders label and placeholder', () => {
    const placeholder = 'Write weight';

    render((
      <UnitField
        label="weight"
        name="weight"
        value=""
        placeholder={placeholder}
        onChangeField={handleChangeField}
      />
    ));

    expect(screen.getByLabelText('weight')).toHaveAttribute('placeholder', placeholder);
  });

  context('with unit', () => {
    it('renders unit text', () => {
      render((
        <UnitField
          label="weight"
          name="weight"
          value=""
          unit="kg"
          onChangeField={handleChangeField}
        />
      ));

      screen.getByText('kg');
    });
  });

  context('with icon', () => {
    it('renders icon', () => {
      render((
        <UnitField
          label="weight"
          name="weight"
          value=""
          icon="chevron-down"
          onChangeField={handleChangeField}
        />
      ));

      expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'chevron-down');
    });
  });

  context('when disabled', () => {
    it('disables input', () => {
      render((
        <UnitField
          label="weight"
          name="weight"
          value=""
          disabled
          onChangeField={handleChangeField}
        />
      ));

      expect(screen.getByLabelText('weight')).toBeDisabled();
    });
  });

  context('when value changes', () => {
    it('listens for value change event', () => {
      render((
        <UnitField
          label="weight"
          name="weight"
          value=""
          onChangeField={handleChangeField}
        />
      ));

      fireEvent.change(screen.getByLabelText('weight'), {
        target: { value: '100' },
      });

      expect(handleChangeField).toHaveBeenCalledWith({
        name: 'weight',
        value: '100',
      });
    });
  });

  context('with error', () => {
    it('renders error message', () => {
      const errorMessage = 'ERROR';

      render((
        <UnitField
          label="weight"
          name="weight"
          value=""
          errorMessage={errorMessage}
          onChangeField={handleChangeField}
        />
      ));

      screen.getByText(errorMessage);

      expect(screen.getByLabelText('weight')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
