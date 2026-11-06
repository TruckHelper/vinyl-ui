import { styled } from 'styled-system/jsx/factory';

import { Icon } from '../icon/Icon';

const Container = styled('button', {
  base: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: 0,
    border: 'none',
    borderRadius: '4',
    backgroundColor: 'transparent',
    fontSize: '1.6rem',
    cursor: 'pointer',
    '& > [data-part=up], & > [data-part=down]': {
      display: 'inline-flex',
      color: 'text.disable',
    },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
  },
  variants: {
    direction: {
      none: {},
      asc: {
        '& > [data-part=up]': { color: 'text.default' },
      },
      desc: {
        '& > [data-part=down]': { color: 'text.default' },
      },
    },
  },
});

export type TableSortButtonProps = {
  direction: 'none' | 'asc' | 'desc';
  label: string;
  onClick: () => void;
};

export function TableSortButton({
  direction,
  label,
  onClick,
}: TableSortButtonProps) {
  return (
    <Container
      type="button"
      direction={direction}
      aria-label={label}
      onClick={onClick}
    >
      <span data-part="up">
        <Icon name="chevron-up" />
      </span>
      <span data-part="down">
        <Icon name="chevron-down" />
      </span>
    </Container>
  );
}
