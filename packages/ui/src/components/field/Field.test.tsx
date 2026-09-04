import { render, screen } from '@testing-library/react';

import { ErrorText } from './ErrorText';
import { Field } from './Field';
import { Input } from './Input';
import { Label } from './Label';

const context = describe;

describe('Field', () => {
  it('renders label and placeholder text', () => {
    render((
      <Field>
        <Label>이름</Label>
        <Input placeholder="텍스트" />
      </Field>
    ));

    screen.getByLabelText('이름');
    screen.getByPlaceholderText('텍스트');
  });

  context('with error', () => {
    it('renders error message and validates area-invalid attribute', () => {
      const error = 'ERROR MESSAGE';

      render((
        <Field hasError={!!error}>
          <Label>이름</Label>
          <Input placeholder="텍스트" />
          <ErrorText>{error}</ErrorText>
        </Field>
      ));

      screen.getByText('에러 메세지');

      expect(screen.getByLabelText('이름')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
