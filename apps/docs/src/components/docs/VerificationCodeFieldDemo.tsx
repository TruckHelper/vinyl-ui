'use client';

import { useEffect, useState } from 'react';

import { VerificationCodeField } from '@bigmobility/vinyl-ui/field';

import { styled } from 'styled-system/jsx';

const Frame = styled('div', {
  base: {
    width: '100%',
    maxWidth: '34rem',
  },
});

const LIMIT_SECONDS = 180;

function formatTime(seconds: number) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const rest = String(seconds % 60).padStart(2, '0');

  return `${minutes}:${rest}`;
}

type VerificationCodeFieldDemoProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  buttonLabel?: string;
  withTimer?: boolean;
  required?: boolean;
  disabled?: boolean;
  buttonDisabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
};

export default function VerificationCodeFieldDemo({
  label = '인증번호',
  name = 'code',
  placeholder = '인증번호 6자리',
  buttonLabel = '재전송',
  withTimer = true,
  required = false,
  disabled = false,
  buttonDisabled = false,
  hasError = false,
  errorMessage,
}: VerificationCodeFieldDemoProps) {
  const [value, setValue] = useState('');
  const [seconds, setSeconds] = useState(LIMIT_SECONDS);

  useEffect(() => {
    if (!withTimer || disabled || seconds <= 0) {
      return undefined;
    }

    const timer = setTimeout(() => setSeconds(seconds - 1), 1000);

    return () => clearTimeout(timer);
  }, [withTimer, disabled, seconds]);

  return (
    <Frame>
      <VerificationCodeField
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        maxLength={6}
        buttonLabel={buttonLabel}
        remainingTime={withTimer ? formatTime(seconds) : undefined}
        required={required}
        disabled={disabled}
        buttonDisabled={buttonDisabled}
        hasError={hasError}
        errorMessage={errorMessage}
        onChangeValue={({ value: nextValue }) => setValue(nextValue)}
        onClickButton={() => setSeconds(LIMIT_SECONDS)}
      />
    </Frame>
  );
}
