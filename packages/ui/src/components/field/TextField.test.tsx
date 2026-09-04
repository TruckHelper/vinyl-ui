import { render, screen } from '@testing-library/react';

import { TextField } from './TextField';

const context = describe;

describe('TextField', () => {
  it('renders default label and input linked together', () => {
    render((
      <TextField
        label="이름"
        placeholder="텍스트"
      />
    ));

    expect(screen.getByLabelText('이름')).toBe(screen.getByPlaceholderText('텍스트'));
  });

  context('when required', () => {
    it('marks the input as required', () => {
      render((
        <TextField
          label="이름"
          required
        />
      ));

      expect(screen.getByLabelText('이름')).toBeRequired();
    });
  });

  context('when hasError with an error message', () => {
    it('shows the message and links it to the input', () => {
      render((
        <TextField
          label="이름"
          hasError
          errorText="에러 메세지"
        />
      ));

      const input = screen.getByLabelText('이름');
      const message = screen.getByText('에러 메세지');

      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', message.getAttribute('id'));
    });
  });
});
