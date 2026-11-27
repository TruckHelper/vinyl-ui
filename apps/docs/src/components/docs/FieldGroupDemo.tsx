'use client';

import { useState } from 'react';

import { Button } from '@bigmobility/vinyl-ui/button';
import {
  ErrorMessage,
  FieldGroup,
  FieldGroupLabel,
  FieldGroupWrap,
  Input,
} from '@bigmobility/vinyl-ui/field';

import { styled } from 'styled-system/jsx';

const Frame = styled('div', {
  base: {
    width: '100%',
    maxWidth: '34rem',
  },
});

const ActionButton = styled(Button, {
  base: {
    width: '8.8rem',
  },
});

type FieldGroupDemoProps = {
  label?: string;
  placeholder?: string;
  initialValue?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
};

export default function FieldGroupDemo({
  label = '주소',
  placeholder = '우편번호',
  initialValue = '',
  required = false,
  disabled = false,
  errorMessage,
}: FieldGroupDemoProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <Frame>
      <FieldGroup
        required={required}
        disabled={disabled}
        hasError={!!errorMessage}
      >
        <FieldGroupLabel>{label}</FieldGroupLabel>
        <FieldGroupWrap>
          <Input
            name="postcode"
            value={value}
            placeholder={placeholder}
            aria-label={placeholder}
            onChange={(event) => setValue(event.target.value)}
          />
          <ActionButton variant="emphasis">검색</ActionButton>
        </FieldGroupWrap>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </FieldGroup>
    </Frame>
  );
}
