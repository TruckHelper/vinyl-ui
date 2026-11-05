import { fireEvent, render, screen } from '@testing-library/react';

import { Icon } from '../icon/Icon';

import { Link } from './Link';

const context = describe;

describe('Link', () => {
  it('renders a link with href and listens for click events', () => {
    const handleClick = jest.fn();

    render((
      <Link
        href="/about"
        onClick={handleClick}
      >
        소개
      </Link>
    ));

    const link = screen.getByRole('link', { name: '소개' });

    expect(link).toHaveAttribute('href', '/about');

    fireEvent.click(link);

    expect(handleClick).toHaveBeenCalled();
  });

  it('does not set the role attribute explicitly', () => {
    render(<Link href="/about">소개</Link>);

    expect(screen.getByRole('link', { name: '소개' })).not.toHaveAttribute('role');
  });

  context('when disabled', () => {
    it('is not interactive', () => {
      const handleClick = jest.fn();

      render((
        <Link
          href="/about"
          onClick={handleClick}
          disabled
        >
          소개
        </Link>
      ));

      const link = screen.getByRole('link', { name: '소개' });

      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('tabindex', '-1');
      expect(link).not.toHaveAttribute('href');

      fireEvent.click(link);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('prevents the default action of click events', () => {
      render((
        <Link
          href="/about"
          disabled
        >
          소개
        </Link>
      ));

      const notPrevented = fireEvent.click(screen.getByRole('link', { name: '소개' }));

      expect(notPrevented).toBe(false);
    });

    it('keeps disabled attributes even if the consumer passes conflicting props', () => {
      render((
        <Link
          href="/about"
          aria-disabled={false}
          tabIndex={0}
          disabled
        >
          소개
        </Link>
      ));

      const link = screen.getByRole('link', { name: '소개' });

      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('tabindex', '-1');
      expect(link).not.toHaveAttribute('href');
    });
  });

  context('with icons', () => {
    it('renders an icon before the text', () => {
      render((
        <Link href="/">
          <Icon name="chevron-left" />
          링크
        </Link>
      ));

      const icon = screen.getByTestId('icon');
      const link = screen.getByRole('link', { name: '링크' });

      expect(icon).toHaveAttribute('data-name', 'chevron-left');
      expect(link.firstElementChild).toContainElement(icon);
    });

    it('renders an icon after the text', () => {
      render((
        <Link href="/">
          링크
          <Icon name="chevron-right" />
        </Link>
      ));

      const icon = screen.getByTestId('icon');
      const link = screen.getByRole('link', { name: '링크' });

      expect(icon).toHaveAttribute('data-name', 'chevron-right');
      expect(link.lastElementChild).toContainElement(icon);
    });
  });

  context('with asChild', () => {
    it('renders a single link element using the child', () => {
      render((
        <Link
          asChild
          className="custom"
        >
          <a href="/router">라우터</a>
        </Link>
      ));

      const links = screen.getAllByRole('link');
      const link = screen.getByRole('link', { name: '라우터' });

      expect(links).toHaveLength(1);
      expect(link).toHaveAttribute('href', '/router');
      expect(link).toHaveClass('custom');
      expect(link.querySelector('a')).toBeNull();
    });

    it('renders an icon inside the child link', () => {
      render((
        <Link asChild>
          <a href="/more">
            더보기
            <Icon name="chevron-right" />
          </a>
        </Link>
      ));

      const links = screen.getAllByRole('link');
      const link = screen.getByRole('link', { name: '더보기' });

      expect(links).toHaveLength(1);
      expect(link).toHaveAttribute('href', '/more');
      expect(link).toContainElement(screen.getByTestId('icon'));
    });

    context('when disabled', () => {
      it('is not interactive', () => {
        const handleClick = jest.fn();

        render((
          <Link
            asChild
            disabled
          >
            <a
              href="/router"
              onClick={handleClick}
            >
              라우터
            </a>
          </Link>
        ));

        const link = screen.getByRole('link', { name: '라우터' });

        expect(link).toHaveAttribute('aria-disabled', 'true');
        expect(link).toHaveAttribute('tabindex', '-1');

        const notPrevented = fireEvent.click(link);

        expect(notPrevented).toBe(false);
        expect(handleClick).not.toHaveBeenCalled();
      });
    });
  });
});
