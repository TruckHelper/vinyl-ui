'use client';

import type { ChangeEvent, Ref } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { Field } from './Field';
import { Input } from './Input';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';
import { createErrorId } from './utils';

import { Button } from '../button/Button';

const Row = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    width: '100%',
  },
});

const AddressInputWrapper = styled('div', {
  base: {
    flex: '1 1 0',
    minWidth: 0,
    '& input[readonly]:not([aria-invalid])': {
      backgroundColor: 'layout.bg-disable',
      cursor: 'default',
    },
    '& input[readonly]:not([aria-invalid]):hover': {
      borderColor: 'layout.default-line',
    },
  },
});

const SearchButton = styled(Button, {
  base: {
    flexShrink: 0,
    height: 'input-height',
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
  },
});

export type AddressValue = {
  zipCode: string;
  address: string;
  detail: string;
};

export type AddressFieldProps = {
  name: string;
  value: AddressValue;
  onChangeValue: (payload: { name: string; value: AddressValue }) => void;
  buttonLabel: string;
  onClickButton: () => void;
  buttonDisabled?: boolean;
  label?: string;
  addressPlaceholder?: string;
  detailPlaceholder?: string;
  detailLabel?: string;
  required?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  ref?: Ref<HTMLInputElement>;
};

function formatAddress({ zipCode, address }: AddressValue) {
  if (!zipCode) {
    return address;
  }

  return address ? `(${zipCode}) ${address}` : `(${zipCode})`;
}

export function AddressField({
  name,
  value,
  onChangeValue,
  buttonLabel,
  onClickButton,
  buttonDisabled = false,
  label,
  addressPlaceholder,
  detailPlaceholder,
  detailLabel = '상세 주소',
  required = false,
  hasError = false,
  errorMessage,
  disabled = false,
  className,
  ref,
}: AddressFieldProps) {
  const id = `input-${name}`;
  const detailId = `${id}-detail`;
  const invalid = hasError || !!errorMessage;
  const describedBy = invalid && errorMessage ? createErrorId(id) : undefined;

  const handleChangeDetail = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeValue({
      name,
      value: { ...value, detail: event.target.value },
    });
  };

  return (
    <Field
      className={className}
      id={id}
      required={required}
      hasError={invalid}
      disabled={disabled}
    >
      {label ? (
        <Label>
          {label}
        </Label>
      ) : null}
      <Row>
        <AddressInputWrapper>
          <Input
            value={formatAddress(value)}
            placeholder={addressPlaceholder}
            readOnly
            autoComplete="off"
            aria-describedby={describedBy}
          />
        </AddressInputWrapper>
        <SearchButton
          variant="emphasis"
          disabled={buttonDisabled}
          onClick={onClickButton}
        >
          {buttonLabel}
        </SearchButton>
      </Row>
      <Input
        ref={ref}
        id={detailId}
        value={value.detail}
        placeholder={detailPlaceholder}
        required={false}
        autoComplete="address-line2"
        aria-label={detailLabel}
        aria-describedby={describedBy}
        onChange={handleChangeDetail}
      />
      <ErrorMessage>
        {errorMessage}
      </ErrorMessage>
    </Field>
  );
}
