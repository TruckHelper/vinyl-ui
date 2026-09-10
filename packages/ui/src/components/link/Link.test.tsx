import type { ComponentPropsWithoutRef } from 'react';

import { render, screen } from '@testing-library/react';

import { Link } from './Link';

const context = describe;

describe('Link', () => {
  it('renders link', () => {
    render((
      <Link href="https://example.com">
        링크 텍스트
      </Link>
    ));

    const link = screen.getByRole('link', { name: '링크 텍스트' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  context('when disabled', () => {
    it('blocks access', () => {
      render((
        <Link
          href="#"
          disabled
        >
          비활성 링크
        </Link>
      ));

      const link = screen.getByRole('link', { name: /비활성 링크/ });

      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('tabindex', '-1');
    });
  });

  context('with client-side routing', () => {
    function MockClientRouterLink(props: ComponentPropsWithoutRef<'a'>) {
      return (
        <a {...props} />
      );
    }

    it('renders child with delegated attributes instead of default anchor', () => {
      render((
        <Link
          asChild
          href="#"
          disabled
        >
          <MockClientRouterLink 
          href="/home"
          >
            링크
          </MockClientRouterLink>
        </Link>
      ));

      const links = screen.getAllByRole('link');

      expect(links).toHaveLength(1);

      const link = links[0];

      expect(link).toHaveAttribute('href', '/home');
      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('tabindex', '-1');
    });
  });
});
