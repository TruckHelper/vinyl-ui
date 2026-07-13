import type { ComponentProps, ElementType } from 'react';

export function styled<T extends ElementType>(Tag: T) {
  return function Styled(props: ComponentProps<T>) {
    return <Tag {...props} />;
  };
}
