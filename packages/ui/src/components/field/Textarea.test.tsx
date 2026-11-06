import { fireEvent, render, screen } from '@testing-library/react';

import { Field } from './Field';
import { Label } from './Label';
import { Textarea } from './Textarea';

const context = describe;

describe('Textarea', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a multiline textbox and listens for change event', () => {
    const handleChange = jest.fn();

    render((
      <Textarea
        placeholder="text"
        onChange={handleChange}
      />
    ));

    const textarea = screen.getByPlaceholderText('text');

    fireEvent.change(textarea, { target: { value: 'first line\nsecond line' } });

    expect(textarea.tagName).toBe('TEXTAREA');
    expect(handleChange).toHaveBeenCalled();
  });

  context('inside Field', () => {
    it('takes id, error and disabled state from the field', () => {
      render((
        <Field
          hasError
          disabled
        >
          <Label>memo</Label>
          <Textarea />
        </Field>
      ));

      const textarea = screen.getByLabelText('memo');

      expect(textarea).toHaveAttribute('aria-invalid', 'true');
      expect(textarea).toBeDisabled();
    });
  });
});
