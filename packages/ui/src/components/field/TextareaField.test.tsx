import { createRef } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { TextareaField } from './TextareaField';

const context = describe;

describe('TextareaField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const handleChangeValue = jest.fn();

  it('renders label and placeholder', () => {
    const placeholder = 'Write a memo';

    render((
      <TextareaField
        label="memo"
        name="memo"
        value=""
        placeholder={placeholder}
        onChangeValue={handleChangeValue}
      />
    ));

    expect(screen.getByRole('textbox', { name: 'memo' })).toHaveAttribute('placeholder', placeholder);
  });

  context('when required', () => {
    it('marks the label and the textarea as required', () => {
      render((
        <TextareaField
          label="memo"
          name="memo"
          value=""
          required
          onChangeValue={handleChangeValue}
        />
      ));

      expect(screen.getByText('memo')).toHaveAttribute('data-required', 'true');
      expect(screen.getByLabelText('memo')).toBeRequired();
    });
  });

  context('when disabled', () => {
    it('disables the textarea', () => {
      render((
        <TextareaField
          label="memo"
          name="memo"
          value=""
          disabled
          onChangeValue={handleChangeValue}
        />
      ));

      expect(screen.getByLabelText('memo')).toBeDisabled();
    });
  });

  context('when the value changes', () => {
    it('calls onChangeValue with name and multiline value', () => {
      render((
        <TextareaField
          label="memo"
          name="memo"
          value=""
          onChangeValue={handleChangeValue}
        />
      ));

      fireEvent.change(screen.getByLabelText('memo'), {
        target: { value: 'first line\nsecond line' },
      });

      expect(handleChangeValue).toHaveBeenCalledWith({
        name: 'memo',
        value: 'first line\nsecond line',
      });
    });
  });

  context('with error message', () => {
    it('renders error message and marks the textarea invalid', () => {
      const errorMessage = 'ERROR';

      render((
        <TextareaField
          label="memo"
          name="memo"
          value=""
          errorMessage={errorMessage}
          onChangeValue={handleChangeValue}
        />
      ));

      screen.getByText(errorMessage);

      const textarea = screen.getByLabelText('memo');

      expect(textarea).toHaveAttribute('aria-invalid', 'true');
      expect(textarea).toHaveAttribute('aria-describedby', screen.getByRole('alert').id);
    });
  });

  context('with ref', () => {
    it('forwards the ref to the textarea element', () => {
      const ref = createRef<HTMLTextAreaElement>();

      render((
        <TextareaField
          ref={ref}
          label="memo"
          name="memo"
          value=""
          onChangeValue={handleChangeValue}
        />
      ));

      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
      expect(ref.current).toBe(screen.getByLabelText('memo'));
    });
  });

  context('with hasError only', () => {
    it('marks the textarea invalid without a message', () => {
      render((
        <TextareaField
          label="memo"
          name="memo"
          value=""
          hasError
          onChangeValue={handleChangeValue}
        />
      ));

      expect(screen.getByLabelText('memo')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
