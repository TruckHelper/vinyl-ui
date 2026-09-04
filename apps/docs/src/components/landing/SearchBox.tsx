import { Icon } from '@bigmobility/vinyl-ui/icon';

import { styled } from 'styled-system/jsx';

// UI만 구현 — 검색 동작(⌘K·결과)은 fumadocs-core 검색 Phase에서 배선한다.

const Box = styled('button', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8',
    width: '32rem',
    height: '2.9rem',
    paddingInline: '10',
    paddingBlock: '6',
    backgroundColor: 'layout.bg-light',
    border: '1px solid',
    borderColor: 'layout.default-line',
    borderRadius: '4',
    cursor: 'pointer',
    transitionProperty: 'border-color',
    transitionDuration: '0.2s',
    _hover: { borderColor: 'layout.strong-line' },
  },
});

const SearchIcon = styled('span', {
  base: {
    display: 'inline-flex',
    fontSize: '1.4rem',
    color: 'layout.neutral-gray',
  },
});

const Placeholder = styled('span', {
  base: {
    flex: '1',
    textAlign: 'left',
    textStyle: 'body.small-normal',
    color: 'layout.neutral-gray',
  },
});

const Kbd = styled('span', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingInline: '0.5rem',
    paddingBlock: '0.2rem',
    backgroundColor: 'layout.bg-light-gray',
    borderRadius: '4',
    textStyle: 'body.xsmall-light',
    color: 'text.soft',
  },
});

export default function SearchBox() {
  return (
    <Box
      type="button"
      aria-label="Search docs"
    >
      <SearchIcon>
        <Icon name="search" />
      </SearchIcon>
      <Placeholder>Search docs...</Placeholder>
      <Kbd>⌘K</Kbd>
    </Box>
  );
}
