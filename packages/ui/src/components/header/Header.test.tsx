import type { ComponentProps } from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Header } from './Header';
import { HeaderActions } from './HeaderActions';
import { HeaderLogo } from './HeaderLogo';
import { HeaderMenuTrigger } from './HeaderMenuTrigger';
import { HeaderNav } from './HeaderNav';
import { HeaderNavLink } from './HeaderNavLink';

const context = describe;

function renderHeader({
  headerProps = {},
  linkProps = {},
}: {
  headerProps?: ComponentProps<typeof Header>;
  linkProps?: Partial<ComponentProps<typeof HeaderNavLink>>;
} = {}) {
  return render((
    <Header {...headerProps}>
      <HeaderLogo>
        <a href="/">로고</a>
      </HeaderLogo>
      <HeaderMenuTrigger />
      <HeaderNav aria-label="주 메뉴">
        <HeaderNavLink
          href="/service"
          current
        >
          서비스
        </HeaderNavLink>
        <HeaderNavLink
          href="#notice"
          {...linkProps}
        >
          공지사항
        </HeaderNavLink>
      </HeaderNav>
      <HeaderActions>
        <button type="button">로그인</button>
      </HeaderActions>
    </Header>
  ));
}

async function openMenu() {
  const trigger = screen.getByRole('button', { name: '메뉴' });

  fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));

  return trigger;
}

function focusOrder() {
  return [...document.querySelectorAll<HTMLElement>('a[href], button')]
    .filter((element) => element.tabIndex >= 0);
}

describe('Header', () => {
  it('renders a banner with logo, navigation and actions', () => {
    renderHeader();

    const banner = screen.getByRole('banner');

    expect(banner.tagName).toBe('HEADER');
    expect(screen.getByRole('link', { name: '로고' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: '주 메뉴' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });

  it('passes header attributes to the root', () => {
    renderHeader({
      headerProps: {
        id: 'site-header',
        className: 'custom',
        'aria-label': '사이트 헤더',
      },
    });

    const banner = screen.getByRole('banner');

    expect(banner).toHaveAttribute('id', 'site-header');
    expect(banner).toHaveClass('custom');
    expect(banner).toHaveAttribute('aria-label', '사이트 헤더');
  });

  it('uses the white background by default', () => {
    renderHeader();

    expect(screen.getByRole('banner')).toHaveAttribute('data-background', 'white');
  });

  it('applies the transparent background', () => {
    renderHeader({ headerProps: { background: 'transparent' } });

    expect(screen.getByRole('banner')).toHaveAttribute('data-background', 'transparent');
  });

  it('marks the current page link', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: '서비스' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: '공지사항' })).not.toHaveAttribute('aria-current');
  });

  context('with the menu trigger', () => {
    it('opens and closes the navigation', async () => {
      renderHeader();

      const trigger = screen.getByRole('button', { name: '메뉴' });
      const nav = screen.getByRole('navigation');

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-controls', nav.id);
      expect(nav).toHaveAttribute('data-state', 'closed');
      expect(nav).not.toHaveAttribute('hidden');
      expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'text-align-end');

      await openMenu();

      expect(nav).toHaveAttribute('data-state', 'open');
      expect(screen.getByRole('banner')).toHaveAttribute('data-state', 'open');
      expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'x');

      fireEvent.click(trigger);

      await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    });

    it('is a native button that receives keyboard focus', () => {
      renderHeader();

      const trigger = screen.getByRole('button', { name: '메뉴' });

      trigger.focus();

      expect(trigger).toHaveFocus();
      expect(trigger.tagName).toBe('BUTTON');
      expect(trigger).toHaveAttribute('type', 'button');
    });

    it('moves focus from the trigger to the first menu link with Tab after opening', async () => {
      renderHeader();

      const trigger = await openMenu();
      const order = focusOrder();

      expect(order[order.indexOf(trigger) + 1]).toBe(screen.getByRole('link', { name: '서비스' }));
    });

    it('closes the navigation when a link is clicked', async () => {
      renderHeader();

      const trigger = await openMenu();

      fireEvent.click(screen.getByRole('link', { name: '공지사항' }));

      await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    });

    it('uses the given accessible name', () => {
      render((
        <Header>
          <HeaderMenuTrigger aria-label="전체 메뉴" />
        </Header>
      ));

      expect(screen.getByRole('button', { name: '전체 메뉴' })).toBeInTheDocument();
    });
  });

  context('when a link is disabled', () => {
    it('is not interactive', () => {
      renderHeader({ linkProps: { disabled: true } });

      const link = screen.getByRole('link', { name: '공지사항' });

      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('tabindex', '-1');
      expect(link).not.toHaveAttribute('href');

      const notPrevented = fireEvent.click(link);

      expect(notPrevented).toBe(false);
    });
  });

  context('with asChild', () => {
    it('renders a single link element using the child', () => {
      const handleClick = jest.fn((event: { preventDefault: () => void }) => event.preventDefault());

      render((
        <Header>
          <HeaderNav>
            <HeaderNavLink
              asChild
              className="custom"
              current
            >
              <a
                href="/router"
                onClick={handleClick}
              >
                라우터
              </a>
            </HeaderNavLink>
          </HeaderNav>
        </Header>
      ));

      const link = screen.getByRole('link', { name: '라우터' });

      expect(screen.getAllByRole('link')).toHaveLength(1);
      expect(link).toHaveAttribute('href', '/router');
      expect(link).toHaveAttribute('aria-current', 'page');
      expect(link).toHaveClass('custom');

      fireEvent.click(link);

      expect(handleClick).toHaveBeenCalled();
    });
  });

  context('outside Header', () => {
    it('renders the link without throwing', () => {
      render(<HeaderNavLink href="#alone">단독</HeaderNavLink>);

      const link = screen.getByRole('link', { name: '단독' });

      expect(link).toHaveAttribute('href', '#alone');

      fireEvent.click(link);

      expect(link).toBeInTheDocument();
    });
  });
});
