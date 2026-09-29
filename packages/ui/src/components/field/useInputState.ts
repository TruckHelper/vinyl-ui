'use client';

import { createErrorId } from './utils';

import { useFieldContext } from './FieldContext';
import type { InputGroupContextValue } from './InputGroupContext';

export function useInputState({
  id,
  hasError,
  disabled,
  required,
  group = null,
}: {
  id?: string;
  hasError?: boolean;
  disabled?: boolean;
  required?: boolean;
  group?: InputGroupContextValue | null;
}) {
  const field = useFieldContext();

  const resolvedId = id ?? field?.inputId;
  const resolvedHasError = hasError ?? group?.hasError ?? field?.hasError ?? false;
  const resolvedDisabled = disabled ?? group?.disabled ?? field?.disabled ?? false;
  const resolvedRequired = required ?? field?.required ?? false;
  const describedBy = resolvedHasError && resolvedId ? createErrorId(resolvedId) : undefined;

  return {
    id: resolvedId,
    hasError: resolvedHasError,
    disabled: resolvedDisabled,
    required: resolvedRequired,
    describedBy,
  };
}
