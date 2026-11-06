import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Checkbox } from './Checkbox';
import { CheckboxControl } from './CheckboxControl';
import { CheckboxLabel } from './CheckboxLabel';

const context = describe;

describe('Checkbox', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders checkbox label', () => {
    render((
      <Checkbox
        name="terms"
        checked={false}
        onChangeChecked={handleChange}
      >
        <CheckboxControl />
        <CheckboxLabel>약관 동의</CheckboxLabel>
      </Checkbox>
    ));

    expect(screen.getByRole('checkbox', { name: '약관 동의' })).not.toBeChecked();
  });

  it('reflects checked value', () => {
    render((
      <Checkbox
        name="terms"
        checked
        onChangeChecked={handleChange}
      >
        <CheckboxControl />
        <CheckboxLabel>약관 동의</CheckboxLabel>
      </Checkbox>
    ));

    expect(screen.getByRole('checkbox', { name: '약관 동의' })).toBeChecked();
  });

  it('listens for click event', async () => {
    render((
      <Checkbox
        name="terms"
        checked={false}
        onChangeChecked={handleChange}
      >
        <CheckboxControl />
        <CheckboxLabel>약관 동의</CheckboxLabel>
      </Checkbox>
    ));

    fireEvent.click(screen.getByText('약관 동의'));

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
      name: 'terms',
      value: true,
    }));
  });

  it('uses aria-label as accessible name without label', () => {
    render((
      <Checkbox
        name="terms"
        checked={false}
        aria-label="약관 동의"
        onChangeChecked={handleChange}
      >
        <CheckboxControl />
      </Checkbox>
    ));

    expect(screen.getByRole('checkbox', { name: '약관 동의' })).toBeInTheDocument();
  });

  context('with error', () => {
    it('marks checkbox as invalid', () => {
      render((
        <Checkbox
          name="terms"
          checked={false}
          hasError
          onChangeChecked={handleChange}
        >
          <CheckboxControl />
          <CheckboxLabel>약관 동의</CheckboxLabel>
        </Checkbox>
      ));

      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  context('when disabled', () => {
    it('does not listen for click event', () => {
      render((
        <Checkbox
          name="terms"
          checked={false}
          disabled
          onChangeChecked={handleChange}
        >
          <CheckboxControl />
          <CheckboxLabel>약관 동의</CheckboxLabel>
        </Checkbox>
      ));

      fireEvent.click(screen.getByText('약관 동의'));

      expect(screen.getByRole('checkbox')).toBeDisabled();

      expect(handleChange).not.toHaveBeenCalled();
    });
  });
});
