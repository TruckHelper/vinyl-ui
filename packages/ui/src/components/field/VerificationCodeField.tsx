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
    alignItems: 'flex-start',
    gap: '4',
    width: '100%',
  },
});

const InputWrapper = styled('div', {
  base: {
    position: 'relative',
    flex: '1 1 0',
    minWidth: 0,
  },
  variants: {
    hasTime: {
      true: {
        '& input': { paddingInlineEnd: '7.2rem' },
      },
    },
  },
});

const RemainingTime = styled('span', {
  base: {
    textStyle: 'input.medium-light',
    position: 'absolute',
    top: '50%',
    insetInlineEnd: '12',
    transform: 'translateY(-50%)',
    color: 'text.accent-primary',
    fontVariantNumeric: 'tabular-nums',
    pointerEvents: 'none',
  },
  variants: {
    disabled: {
      true: { color: 'text.disable' },
    },
  },
});

const VisuallyHidden = styled('span', {
  base: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  },
});

const ActionButton = styled(Button, {
  base: {
    flexShrink: 0,
    minWidth: '8.8rem',
    height: 'input-height',
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
  },
});

export type VerificationCodeFieldProps = {
  name: string;
  value: string;
  onChangeValue: (payload: { name: string; value: string }) => void;
  buttonLabel: string;
  onClickButton: () => void;
  buttonDisabled?: boolean;
  remainingTime?: string;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  ref?: Ref<HTMLInputElement>;
};

export function VerificationCodeField({
  name,
  value,
  onChangeValue,
  buttonLabel,
  onClickButton,
  buttonDisabled = false,
  remainingTime,
  label,
  placeholder,
  maxLength,
  required = false,
  hasError = false,
  errorMessage,
  disabled = false,
  className,
  ref,
}: VerificationCodeFieldProps) {
  const id = `input-${name}`;
  const timeId = `${id}-time`;

  const resolvedHasError = hasError || !!errorMessage;

  const describedBy = [
    resolvedHasError && errorMessage ? createErrorId(id) : undefined,
    remainingTime ? timeId : undefined,
  ].filter(Boolean).join(' ') || undefined;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeValue({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <Field
      className={className}
      id={id}
      required={required}
      hasError={resolvedHasError}
      disabled={disabled}
    >
      {label ? (
        <Label>
          {label}
        </Label>
      ) : null}
      <Row>
        <InputWrapper hasTime={!!remainingTime}>
          <Input
            ref={ref}
            name={name}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            inputMode="numeric"
            autoComplete="one-time-code"
            aria-describedby={describedBy}
            onChange={handleChange}
          />
          {remainingTime ? (
            <RemainingTime
              id={timeId}
              role="timer"
              disabled={disabled}
            >
              <VisuallyHidden>남은 시간 </VisuallyHidden>
              {remainingTime}
            </RemainingTime>
          ) : null}
        </InputWrapper>
        <ActionButton
          variant="emphasis"
          disabled={buttonDisabled}
          onClick={onClickButton}
        >
          {buttonLabel}
        </ActionButton>
      </Row>
      <ErrorMessage>
        {errorMessage}
      </ErrorMessage>
    </Field>
  );
}
