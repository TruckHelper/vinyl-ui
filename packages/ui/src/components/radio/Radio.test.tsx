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
  }: {
    value?: string;
    disabled?: boolean;
    hasError?: boolean;
    disabledValue?: string;
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
          >
            <RadioControl />
            <RadioLabel>{['가', '나', '다'][index]}</RadioLabel>
          </Radio>
        ))}
      </RadioGroup>
    ));
  }

  it('renders radios with labels', () => {
    renderRadioGroup({ value: 'a' });

    expect(screen.getByRole('radiogroup', { name: '크기' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '가' })).toBeChecked();
    expect(screen.getByRole('radio', { name: '나' })).not.toBeChecked();
  });

  it('shares the group name with every radio', () => {
    renderRadioGroup();

    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).toHaveAttribute('name', 'size');
    });
  });

  it('listens for click event', async () => {
    renderRadioGroup({ value: 'a' });

    fireEvent.click(screen.getByText('나'));

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
      name: 'size',
      value: 'b',
    }));
  });

  context('with arrow keys', () => {
    it('selects the radio that the browser focuses and clicks after the arrow key', async () => {
      renderRadioGroup({ value: 'a' });

      const first = screen.getByRole('radio', { name: '가' });
      const second = screen.getByRole('radio', { name: '나' });

      first.focus();
      fireEvent.keyDown(first, { key: 'ArrowDown' });
      second.focus();
      fireEvent.click(second);

      await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
        name: 'size',
        value: 'b',
      }));
    });

    it('marks the radio focused after the arrow key as focus visible', async () => {
      renderRadioGroup({ value: 'a' });

      const first = screen.getByRole('radio', { name: '가' });
      const second = screen.getByRole('radio', { name: '나' });

      first.focus();
      fireEvent.keyDown(first, { key: 'ArrowDown' });
      second.focus();

      await waitFor(() => {
        expect(screen.getByText('나').closest('label')).toHaveAttribute('data-focus-visible');
      });
    });
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
    it('disables only that radio', async () => {
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
    it('marks the group and radios as invalid', () => {
      renderRadioGroup({ hasError: true });

      expect(screen.getByRole('radiogroup', { name: '크기' })).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByRole('radio', { name: '가' })).toHaveAttribute('aria-invalid', 'true');
    });

    context('when group is disabled', () => {
      it('marks radios as both invalid and disabled', () => {
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
    it('uses aria-label as the accessible name', () => {
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
