import { fireEvent, render, screen } from '@testing-library/react';

import { Field } from './Field';
import { InputGroup } from './InputGroup';
import { InputGroupInput } from './InputGroupInput';

describe('InputGroupInput', () => {
  it('renders textbox and listens for change event', () => {
    const handleChange = jest.fn();

    render((
      <InputGroup>
        <InputGroupInput
          placeholder="text"
          onChange={handleChange}
        />
      </InputGroup>
    ));

    fireEvent.change(screen.getByPlaceholderText('text'), { target: { value: '100' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('reads state from InputGroup without Field', () => {
    render((
      <InputGroup
        hasError
        disabled
      >
        <InputGroupInput placeholder="text" />
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
        <InputGroupInput
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
          <InputGroupInput placeholder="text" />
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
          <InputGroupInput placeholder="text" />
        </InputGroup>
      </Field>
    ));

    const input = screen.getByPlaceholderText('text');

    expect(input).toHaveAttribute('id', 'weight');
    expect(input).toHaveAttribute('aria-describedby', 'weight-error');
  });
});
