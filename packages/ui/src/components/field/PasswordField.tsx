'use client';

import type { ChangeEvent, KeyboardEvent, Ref } from 'react';
import { useState } from 'react';

import { PasswordInput as ArkPasswordInput } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { createErrorId } from './utils';

import { Field } from './Field';
import { Input } from './Input';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

import { Icon } from '../icon/Icon';

const Control = styled(ArkPasswordInput.Root, {
  base: {
    position: 'relative',
    width: '100%',
    '& input': { paddingInlineEnd: '40' },
  },
});

const ToggleButton = styled('button', {
  base: {
    position: 'absolute',
    top: '50%',
    insetInlineEnd: '12',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2rem',
    height: '2rem',
    padding: '0',
    border: 'none',
    borderRadius: '4',
    backgroundColor: 'transparent',
    color: 'text.input-soft',
    fontSize: '2rem',
    cursor: 'pointer',
    transform: 'translateY(-50%)',
    '& > span': { display: 'inline-flex' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: { cursor: 'not-allowed' },
  },
});

export type PasswordFieldProps = {
  label?: string;
  name: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  placeholder?: string;
  autoComplete?: 'current-password' | 'new-password';
  toggleLabel?: string;
  className?: string;
  onChangeValue: ({ name, value }: {
    name: string;
    value: string;
  }) => void;
  ref?: Ref<HTMLInputElement>;
};

export function PasswordField({
  label,
  name,
  value,
  required = false,
  disabled = false,
  hasError = false,
  errorMessage,
  placeholder,
  autoComplete = 'current-password',
  toggleLabel = '비밀번호 보기',
  className,
  onChangeValue,
  ref,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  const id = `input-${name}`;
  const invalid = hasError || !!errorMessage;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeValue({
      name,
      value: event.target.value,
    });
  };

  const handleChangeVisibility = (details: ArkPasswordInput.VisibilityChangeDetails) => {
    setVisible(details.visible);
  };

  const handleClickToggle = () => {
    setVisible((prev) => !prev);
  };

  const handleKeyDownToggle = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    setVisible((prev) => !prev);
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
          </Label>)
        : null}
      <Control
        ids={{ input: id }}
        name={name}
        visible={visible}
        required={required}
        disabled={disabled}
        invalid={invalid}
        autoComplete={autoComplete}
        onVisibilityChange={handleChangeVisibility}
      >
        <ArkPasswordInput.Input
          asChild
          aria-describedby={invalid ? createErrorId(id) : undefined}
        >
          <Input
            ref={ref}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
          />
        </ArkPasswordInput.Input>
        <ToggleButton
          type="button"
          aria-label={toggleLabel}
          aria-pressed={visible}
          aria-controls={id}
          disabled={disabled}
          onClick={handleClickToggle}
          onKeyDown={handleKeyDownToggle}
        >
          <ArkPasswordInput.Indicator fallback={<Icon name="eye-off" />}>
            <Icon name="eye" />
          </ArkPasswordInput.Indicator>
        </ToggleButton>
      </Control>
      <ErrorMessage>
        {errorMessage}
      </ErrorMessage>
    </Field>
  );
}
