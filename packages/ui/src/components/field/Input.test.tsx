import { fireEvent, render, screen } from '@testing-library/react';

import { Field } from './Field';
import { Input } from './Input';
import { InputGroup } from './InputGroup';

const context = describe;

describe('Input', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a textbox and listens for change event', () => {
    const handleChange = jest.fn();

    render((
      <Input
        placeholder="text"
        onChange={handleChange}
      />
    ));

    const input = screen.getByPlaceholderText('text');

    fireEvent.change(input, { target: { value: 'Hello, world!' } });

    expect(handleChange).toHaveBeenCalled();
  });

  context('inside InputGroup', () => {
    it('reads state from InputGroup without Field', () => {
      render((
        <InputGroup
          hasError
          disabled
        >
          <Input placeholder="text" />
        </InputGroup>
      ));

      const input = screen.getByPlaceholderText('text');

      expect(input).toBeDisabled();
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('prefers own props over InputGroup', () => {
      render((
        <InputGroup
          hasError
          disabled
        >
          <Input
            placeholder="text"
            hasError={false}
            disabled={false}
          />
        </InputGroup>
      ));

      const input = screen.getByPlaceholderText('text');

      expect(input).toBeEnabled();
      expect(input).not.toHaveAttribute('aria-invalid');
    });

    it('prefers InputGroup over Field', () => {
      render((
        <Field
          hasError
          disabled
        >
          <InputGroup
            hasError={false}
            disabled={false}
          >
            <Input placeholder="text" />
          </InputGroup>
        </Field>
      ));

      const input = screen.getByPlaceholderText('text');

      expect(input).toBeEnabled();
      expect(input).not.toHaveAttribute('aria-invalid');
    });

    it('keeps id and error description from Field', () => {
      render((
        <Field
          id="weight"
          hasError
        >
          <InputGroup>
            <Input placeholder="text" />
          </InputGroup>
        </Field>
      ));

      const input = screen.getByPlaceholderText('text');

      expect(input).toHaveAttribute('id', 'weight');
      expect(input).toHaveAttribute('aria-describedby', 'weight-error');
    });
  });
});
