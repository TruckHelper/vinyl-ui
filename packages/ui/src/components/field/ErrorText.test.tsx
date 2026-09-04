import { render, screen } from '@testing-library/react';

import { ErrorText } from './ErrorText';
import { Field } from './Field';

const context = describe;

describe('ErrorText', () => {
  context('when used standalone', () => {
    it('renders its children', () => {
      render((
        <ErrorText>에러 메세지</ErrorText>
      ));

      expect(screen.getByText('에러 메세지')).toBeInTheDocument();
    });
  });

  context('inside a Field with hasError', () => {
    it('renders the message', () => {
      render((
        <Field hasError>
          <ErrorText>에러 메세지</ErrorText>
        </Field>
      ));

      expect(screen.getByText('에러 메세지')).toBeInTheDocument();
    });
  });

  context('inside a Field without hasError', () => {
    it('renders nothing', () => {
      render((
        <Field>
          <ErrorText>에러 메세지</ErrorText>
        </Field>
      ));

      expect(screen.queryByText('에러 메세지')).not.toBeInTheDocument();
    });
  });
});
