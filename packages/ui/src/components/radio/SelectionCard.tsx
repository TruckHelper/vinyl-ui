'use client';

import { useId } from 'react';

import { RadioGroup as ArkRadioGroup } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { Icon, type IconName } from '../icon/Icon';

const Container = styled(ArkRadioGroup.Item, {
  base: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'layout.default-line',
    borderRadius: '16',
    backgroundColor: 'layout.bg-light',
    cursor: 'pointer',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.2s',
    _hover: { borderColor: 'layout.strong-line' },
    _checked: { borderColor: 'layout.strong-line' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      borderColor: 'layout.default-line',
      backgroundColor: 'layout.bg-disable',
      cursor: 'not-allowed',
      _hover: { borderColor: 'layout.default-line' },
      _checked: { borderColor: 'layout.default-line' },
    },
  },
  variants: {
    variant: {
      center: {
        flexDirection: 'column',
        gap: '16',
        paddingBlock: '40',
        paddingInline: '24',
        textAlign: 'center',
      },
      left: {
        flexDirection: 'row',
        gap: '12',
        paddingBlock: '32',
        paddingInline: '16',
        textAlign: 'left',
      },
    },
  },
});

const IconCircle = styled('span', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: 'full',
    backgroundColor: 'layout.primary-subtle',
    color: 'text.default',
  },
  variants: {
    variant: {
      center: {
        width: '8rem',
        height: '8rem',
        fontSize: '4rem',
      },
      left: {
        width: '6.8rem',
        height: '6.8rem',
        fontSize: '3.4rem',
      },
    },
  },
});

const Texts = styled('span', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    minWidth: 0,
  },
});

const Title = styled(ArkRadioGroup.ItemText, {
  base: {
    textStyle: 'body.large-normal',
    color: 'text.heading',
  },
});

const Description = styled('span', {
  base: {
    textStyle: 'body.medium-light',
    color: 'text.soft',
  },
});

export type SelectionCardProps = {
  value: string;
  variant?: 'center' | 'left';
  title: string;
  description?: string;
  icon?: IconName;
  disabled?: boolean;
  className?: string;
};

export function SelectionCard({
  value,
  variant = 'center',
  title,
  description,
  icon = 'user-round',
  disabled = false,
  className,
}: SelectionCardProps) {
  const descriptionId = useId();

  return (
    <Container
      className={className}
      variant={variant}
      value={value}
      disabled={disabled}
    >
      <IconCircle variant={variant}>
        <Icon name={icon} />
      </IconCircle>
      <Texts>
        <Title>{title}</Title>
        {description ? <Description id={descriptionId}>{description}</Description> : null}
      </Texts>
      <ArkRadioGroup.ItemHiddenInput aria-describedby={description ? descriptionId : undefined} />
    </Container>
  );
}
