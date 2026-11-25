import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Radio } from './Radio';
import { RadioControl } from './RadioControl';
import { RadioGroup } from './RadioGroup';
import { RadioLabel } from './RadioLabel';

const context = describe;

describe('Radio', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderRadioGroup({
    value = '',
    disabled = false,
    hasError = false,
    disabledValue,
    errorValue,
  }: {
    value?: string;
    disabled?: boolean;
    hasError?: boolean;
    disabledValue?: string;
    errorValue?: string;
  } = {}) {
    render((
      <RadioGroup
        name="size"
        value={value}
        disabled={disabled}
        hasError={hasError}
        aria-label="크기"
        onChangeValue={handleChange}
      >
        {['a', 'b', 'c'].map((item, index) => (
          <Radio
            key={item}
            value={item}
            disabled={item === disabledValue}
            hasError={item === errorValue}
          >
            <RadioControl />
            <RadioLabel>{['가', '나', '다'][index]}</RadioLabel>
          </Radio>
        ))}
      </RadioGroup>
    ));
  }

  it('renders radios and labels', () => {
    renderRadioGroup({ value: 'a' });

    expect(screen.getByRole('radiogroup', { name: '크기' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '가' })).toBeChecked();
    expect(screen.getByRole('radio', { name: '나' })).not.toBeChecked();
  });

  it('listens for click event', async () => {
    renderRadioGroup({ value: 'a' });

    fireEvent.click(screen.getByText('나'));

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
      name: 'size',
      value: 'b',
    }));
  });

  context('when group is disabled', () => {
    it('disables every radio', () => {
      renderRadioGroup({ disabled: true });

      screen.getAllByRole('radio').forEach((radio) => {
        expect(radio).toBeDisabled();
      });

      fireEvent.click(screen.getByText('나'));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  context('when radio is disabled', () => {
    it('disables radio', async () => {
      renderRadioGroup({ disabledValue: 'b' });

      expect(screen.getByRole('radio', { name: '나' })).toBeDisabled();
      expect(screen.getByRole('radio', { name: '다' })).not.toBeDisabled();

      fireEvent.click(screen.getByText('나'));

      expect(handleChange).not.toHaveBeenCalled();

      fireEvent.click(screen.getByText('다'));

      await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
        name: 'size',
        value: 'c',
      }));
    });
  });

  context('with error', () => {
    it('includes invalid attribute', () => {
      renderRadioGroup({ errorValue: 'b' });

      expect(screen.getByRole('radiogroup')).not.toHaveAttribute('aria-invalid');
      expect(screen.getByRole('radio', { name: '나' })).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByRole('radio', { name: '가' })).not.toHaveAttribute('aria-invalid');
      expect(screen.getByRole('radio', { name: '다' })).not.toHaveAttribute('aria-invalid');
    });

    context('when group is disabled', () => {
      it('includes invalid and disabled attributes', () => {
        renderRadioGroup({
          hasError: true,
          disabled: true,
        });

        const item = screen.getByText('가').closest('label');

        expect(item).toHaveAttribute('data-invalid');
        expect(item).toHaveAttribute('data-disabled');
        expect(screen.getByRole('radio', { name: '가' })).toBeDisabled();
      });
    });
  });

  context('without label', () => {
    it('renders radio control only', () => {
      render((
        <RadioGroup
          name="size"
          value=""
          onChangeValue={handleChange}
        >
          <Radio
            value="a"
            aria-label="가"
          >
            <RadioControl />
          </Radio>
        </RadioGroup>
      ));

      expect(screen.getByRole('radio', { name: '가' })).toBeInTheDocument();
    });
  });
});
