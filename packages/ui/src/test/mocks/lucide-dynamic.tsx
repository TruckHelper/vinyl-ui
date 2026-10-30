import type { ComponentProps } from 'react';

export function DynamicIcon({ name, ...props }: ComponentProps<'svg'> & { name: string }) {
  return (
    <svg
      data-testid="icon"
      data-name={name}
      {...props}
    />
  );
}

export const dynamicIconImports = {
  check: () => Promise.resolve({}),
  'chevron-down': () => Promise.resolve({}),
  'chevron-left': () => Promise.resolve({}),
  'chevron-right': () => Promise.resolve({}),
  'chevron-up': () => Promise.resolve({}),
  'chevrons-left': () => Promise.resolve({}),
  'chevrons-right': () => Promise.resolve({}),
  'file-x': () => Promise.resolve({}),
  info: () => Promise.resolve({}),
  minus: () => Promise.resolve({}),
  user: () => Promise.resolve({}),
};
