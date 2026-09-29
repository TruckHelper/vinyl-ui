import { fireEvent, render, screen } from '@testing-library/react';

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
    it('disables link and blocks access', () => {
      render((
        <Link
          href="#"
          disabled
        >
          비활성 링크
        </Link>
      ));

      const link = screen.getByRole('link', { name: /비활성 링크/ });

      const clicked = fireEvent.click(link);
      expect(clicked).toBe(false);

      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('tabindex', '-1');
    });
  });
});
