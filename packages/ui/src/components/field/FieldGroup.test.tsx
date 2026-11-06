import { render, screen } from '@testing-library/react';

import { ErrorMessage } from './ErrorMessage';
import { Field } from './Field';
import { FieldGroup } from './FieldGroup';
import { FieldGroupLabel } from './FieldGroupLabel';
import { FieldGroupWrap } from './FieldGroupWrap';
import { Input } from './Input';
import { Label } from './Label';

import { Button } from '../button/Button';

const context = describe;

describe('FieldGroup', () => {
  it('names the group with its label', () => {
    render((
      <FieldGroup>
        <FieldGroupLabel>주소</FieldGroupLabel>
        <FieldGroupWrap>
          <Input
            aria-label="우편번호"
            placeholder="POSTCODE"
          />
          <Button variant="emphasis">검색</Button>
        </FieldGroupWrap>
      </FieldGroup>
    ));

    screen.getByRole('group', { name: '주소' });
    screen.getByPlaceholderText('POSTCODE');
    screen.getByRole('button', { name: '검색' });
  });

  it('does not show the error message without error', () => {
    render((
      <FieldGroup>
        <FieldGroupLabel>주소</FieldGroupLabel>
        <FieldGroupWrap>
          <Input aria-label="우편번호" />
        </FieldGroupWrap>
        <ErrorMessage>ERROR_MESSAGE</ErrorMessage>
      </FieldGroup>
    ));

    expect(screen.queryByText('ERROR_MESSAGE')).not.toBeInTheDocument();
    expect(screen.getByLabelText('우편번호')).not.toHaveAttribute('aria-invalid');
  });

  context('with error', () => {
    it('connects every input in the group to the shared error message', () => {
      render((
        <FieldGroup hasError>
          <FieldGroupLabel>전화번호</FieldGroupLabel>
          <FieldGroupWrap>
            <Input aria-label="앞자리" />
            <Input aria-label="뒷자리" />
          </FieldGroupWrap>
          <ErrorMessage>ERROR_MESSAGE</ErrorMessage>
        </FieldGroup>
      ));

      const message = screen.getByRole('alert');

      expect(message).toHaveTextContent('ERROR_MESSAGE');

      [screen.getByLabelText('앞자리'), screen.getByLabelText('뒷자리')].forEach((input) => {
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAttribute('aria-describedby', message.id);
      });
    });
  });

  context('when required', () => {
    it('marks the label and the inputs as required', () => {
      render((
        <FieldGroup required>
          <FieldGroupLabel>주소</FieldGroupLabel>
          <FieldGroupWrap>
            <Input aria-label="우편번호" />
          </FieldGroupWrap>
        </FieldGroup>
      ));

      expect(screen.getByText('주소')).toHaveAttribute('data-required', 'true');
      expect(screen.getByLabelText('우편번호')).toBeRequired();
    });
  });

  context('when disabled', () => {
    it('disables the inputs but leaves other controls to the consumer', () => {
      render((
        <FieldGroup disabled>
          <FieldGroupLabel>주소</FieldGroupLabel>
          <FieldGroupWrap>
            <Input aria-label="우편번호" />
            <Button variant="emphasis">검색</Button>
          </FieldGroupWrap>
        </FieldGroup>
      ));

      expect(screen.getByLabelText('우편번호')).toBeDisabled();
      expect(screen.getByRole('button', { name: '검색' })).toBeEnabled();
    });
  });

  context('with an input that has its own id', () => {
    it('still points the input to the group error message', () => {
      render((
        <FieldGroup hasError>
          <FieldGroupLabel>주소</FieldGroupLabel>
          <FieldGroupWrap>
            <Input
              id="postcode"
              aria-label="우편번호"
            />
          </FieldGroupWrap>
          <ErrorMessage>ERROR_MESSAGE</ErrorMessage>
        </FieldGroup>
      ));

      const input = screen.getByLabelText('우편번호');

      expect(input).toHaveAttribute('id', 'postcode');
      expect(input).toHaveAttribute('aria-describedby', screen.getByRole('alert').id);
    });
  });

  context('with a Field inside', () => {
    it('does not pass group state to the input inside the Field', () => {
      render((
        <FieldGroup
          hasError
          required
          disabled
        >
          <FieldGroupLabel>주소</FieldGroupLabel>
          <Field>
            <Label>상세 주소</Label>
            <Input />
          </Field>
        </FieldGroup>
      ));

      const input = screen.getByLabelText('상세 주소');

      expect(input).not.toHaveAttribute('aria-invalid');
      expect(input).not.toHaveAttribute('aria-describedby');
      expect(input).not.toBeRequired();
      expect(input).toBeEnabled();
    });

    it('keeps the Field label and error wiring', () => {
      render((
        <FieldGroup hasError>
          <FieldGroupLabel>주소</FieldGroupLabel>
          <Field hasError>
            <Label>상세 주소</Label>
            <Input />
            <ErrorMessage>FIELD_ERROR</ErrorMessage>
          </Field>
        </FieldGroup>
      ));

      const input = screen.getByLabelText('상세 주소');

      expect(input).toHaveAttribute('aria-describedby', screen.getByRole('alert').id);
    });
  });
});
