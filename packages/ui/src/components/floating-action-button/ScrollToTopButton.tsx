'use client';

import {
  useEffect, useRef, useState, type ComponentProps, type MouseEvent,
} from 'react';

import { styled } from 'styled-system/jsx/factory';

import { Icon } from '../icon/Icon';

const Container = styled('button', {
  base: {
    position: 'fixed',
    right: '24',
    bottom: '24',
    zIndex: 'sticky',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '4.8rem',
    height: '4.8rem',
    borderRadius: 'full',
    border: 'none',
    backgroundColor: 'layout.primary',
    color: 'text.default-light',
    fontSize: '2rem',
    boxShadow: 'floating',
    cursor: 'pointer',
    transitionProperty: 'background-color, opacity, visibility',
    transitionDuration: '0.2s',
    _hover: { backgroundColor: 'layout.primary-dark' },
    _active: { backgroundColor: 'layout.primary-dark' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      backgroundColor: 'layout.bg-disable',
      color: 'text.disable',
      cursor: 'not-allowed',
    },
    '&[aria-hidden=true]': {
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    },
  },
});

export type ScrollToTopButtonProps = Omit<ComponentProps<'button'>, 'children' | 'type'> & {
  threshold?: number;
  behavior?: ScrollBehavior;
};

function prefersReducedMotion() {
  return typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function ScrollToTopButton({
  className, threshold = 300, behavior = 'smooth',
  'aria-label': ariaLabel = '맨 위로 이동', onClick, ref, ...props
}: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const setButtonRef = (node: HTMLButtonElement | null) => {
    buttonRef.current = node;

    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  useEffect(() => {
    const update = () => {
      const next = window.scrollY > threshold;
      const button = buttonRef.current;

      if (!next && button && button === document.activeElement) {
        button.blur();
      }

      setVisible(next);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => window.removeEventListener('scroll', update);
  }, [threshold]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : behavior,
    });
  };

  return (
    <Container
      {...props}
      ref={setButtonRef}
      className={className}
      type="button"
      aria-label={ariaLabel}
      aria-hidden={!visible}
      tabIndex={visible ? props.tabIndex : -1}
      onClick={handleClick}
    >
      <Icon name="chevron-up" />
    </Container>
  );
}
