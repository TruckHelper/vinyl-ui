'use client';

import { useRef, useState } from 'react';

import { AddressField, type AddressValue } from '@bigmobility/vinyl-ui/field';

import { styled } from 'styled-system/jsx';

const Frame = styled('div', {
  base: {
    width: '100%',
    maxWidth: '34rem',
  },
});

const EMPTY_VALUE: AddressValue = { zipCode: '', address: '', detail: '' };

const SAMPLE_VALUE: AddressValue = {
  zipCode: '06236',
  address: '서울 강남구 테헤란로 123',
  detail: '',
};

type AddressFieldDemoProps = {
  label?: string;
  name?: string;
  filled?: boolean;
  required?: boolean;
  disabled?: boolean;
  buttonDisabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
};

export default function AddressFieldDemo({
  label = '주소',
  name = 'address',
  filled = false,
  required = false,
  disabled = false,
  buttonDisabled = false,
  hasError = false,
  errorMessage,
}: AddressFieldDemoProps) {
  const [value, setValue] = useState<AddressValue>(filled ? SAMPLE_VALUE : EMPTY_VALUE);
  const detailRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    setValue({ ...SAMPLE_VALUE, detail: '' });
    detailRef.current?.focus();
  };

  return (
    <Frame>
      <AddressField
        ref={detailRef}
        name={name}
        label={label}
        value={value}
        addressPlaceholder="주소 검색을 눌러 주세요"
        detailPlaceholder="상세 주소"
        buttonLabel="주소 검색"
        required={required}
        disabled={disabled}
        buttonDisabled={buttonDisabled}
        hasError={hasError}
        errorMessage={errorMessage}
        onChangeValue={({ value: nextValue }) => setValue(nextValue)}
        onClickButton={handleSearch}
      />
    </Frame>
  );
}
