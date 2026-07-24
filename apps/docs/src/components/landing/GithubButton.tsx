'use client';

import { Button, type ButtonProps } from '@bigmobility/vinyl-ui';

import { GITHUB_URL } from '../../constants/site';

export function GithubButton({ children, ...props }: ButtonProps) {
  const handleClick = () => {
    window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
}
