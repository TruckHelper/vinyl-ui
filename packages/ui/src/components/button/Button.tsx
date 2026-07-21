import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx';

import { Icon, type IconName } from '../icon/Icon';

const Container = styled('button', {
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8',
    border: '1px solid transparent',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.2s',
    _disabled: {
      backgroundColor: 'layout.bg-disable',
      color: 'text.disable',
      borderColor: 'transparent',
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: 'layout.primary',
        color: 'text.default-light',
        _hover: { backgroundColor: 'layout.primary-dark' },
        _active: { backgroundColor: 'layout.primary-dark' },
      },
      emphasis: {
        backgroundColor: 'layout.emphasis',
        color: 'text.default-light',
        _hover: { backgroundColor: 'layout.emphasis-dark' },
        _active: { backgroundColor: 'layout.emphasis-dark' },
      },
      neutral: {
        backgroundColor: 'layout.primary-subtle',
        color: 'text.accent-primary',
        _hover: { borderColor: 'layout.highlight-line' },
        _active: { borderColor: 'layout.highlight-line' },
      },
      outline: {
        backgroundColor: 'layout.bg-light',
        color: 'text.default',
        borderColor: 'layout.default-line',
        _hover: { borderColor: 'layout.strong-line' },
        _active: { borderColor: 'layout.strong-line' },
      },
    },
    fit: {
      block: {
        width: '100%',
        minHeight: 'button-height',
        textStyle: 'button.large-normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      auto: {
        width: 'auto',
        paddingInline: '16',
        paddingBlock: '12',
        gap: '4',
        textStyle: 'button.medium-normal',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    fit: 'auto',
  },
});

const IconWrapper = styled('span', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  variants: {
    fit: {
      block: { position: 'absolute', top: '50%', transform: 'translateY(-50%)' },
      auto: {},
    },
    placement: {
      left: {},
      right: {},
    },
  },
  compoundVariants: [
    { fit: 'block', placement: 'left', css: { left: '16' } },
    { fit: 'block', placement: 'right', css: { right: '16' } },
  ],
});

export type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'emphasis' | 'neutral' | 'outline';
  fit?: 'block' | 'auto';
  leftIcon?: IconName;
  rightIcon?: IconName;
};

export function Button({
  className, children, type = 'button',
  variant = 'primary', fit = 'auto', leftIcon, rightIcon, ...props
}: ButtonProps) {
  return (
    <Container
      className={className}
      type={type}
      variant={variant}
      fit={fit}
      {...props}
    >
      {leftIcon && (
        <IconWrapper
          fit={fit}
          placement="left"
        >
          <Icon name={leftIcon} />
        </IconWrapper>
      )}
      {children}
      {rightIcon && (
        <IconWrapper
          fit={fit}
          placement="right"
        >
          <Icon name={rightIcon} />
        </IconWrapper>
      )}
    </Container>
  );
}
