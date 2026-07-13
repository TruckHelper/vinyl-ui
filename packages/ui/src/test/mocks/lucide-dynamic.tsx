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
  'chevron-left': () => Promise.resolve({}),
  'chevron-right': () => Promise.resolve({}),
  'file-x': () => Promise.resolve({}),
};
