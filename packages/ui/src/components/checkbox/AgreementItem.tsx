'use client';

import type { ReactNode } from 'react';

import { Checkbox as ArkCheckbox } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { Icon } from '../icon/Icon';

import { Checkbox } from './Checkbox';
import { CheckboxControl } from './CheckboxControl';

const Container = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8',
    width: '100%',
  },
  variants: {
    variant: {
      all: {
        padding: '12',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'layout.default-line',
        borderRadius: '8',
      },
      item: {},
    },
  },
});

const ItemCheckbox = styled(Checkbox, {
  base: {
    flex: '1',
    minWidth: '0',
  },
});

const Label = styled(ArkCheckbox.Label, {
  base: {
    color: 'text.input',
    _disabled: { color: 'text.disable' },
  },
  variants: {
    variant: {
      all: { textStyle: 'body.medium-bold' },
      item: { textStyle: 'input.small-light' },
    },
  },
});

const DetailButton = styled('button', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '2.4rem',
    height: '2.4rem',
    padding: '0',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '2rem',
    color: 'text.soft',
    cursor: 'pointer',
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
});

export type AgreementItemProps = {
  name: string;
  checked: boolean;
  variant?: 'all' | 'item';
  disabled?: boolean;
  hasError?: boolean;
  detailLabel?: string;
  className?: string;
  children?: ReactNode;
  onChangeChecked: ({ name, value }: {
    name: string;
    value: boolean;
  }) => void;
  onDetailClick?: () => void;
};

export function AgreementItem({
  name,
  checked,
  variant = 'item',
  disabled = false,
  hasError = false,
  detailLabel = '상세 보기',
  className,
  children,
  onChangeChecked,
  onDetailClick,
}: AgreementItemProps) {
  return (
    <Container
      className={className}
      variant={variant}
    >
      <ItemCheckbox
        name={name}
        checked={checked}
        disabled={disabled}
        hasError={hasError}
        onChangeChecked={onChangeChecked}
      >
        <CheckboxControl />
        <Label variant={variant}>{children}</Label>
      </ItemCheckbox>
      {variant === 'item' && onDetailClick ? (
        <DetailButton
          type="button"
          aria-label={detailLabel}
          disabled={disabled}
          onClick={onDetailClick}
        >
          <Icon name="chevron-right" />
        </DetailButton>
      ) : null}
    </Container>
  );
}
