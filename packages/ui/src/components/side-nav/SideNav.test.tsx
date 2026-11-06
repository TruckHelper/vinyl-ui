import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { SideNav } from './SideNav';
import { SideNavGroup } from './SideNavGroup';
import { SideNavItem } from './SideNavItem';
import { SideNavList } from './SideNavList';
import { SideNavSubItem } from './SideNavSubItem';

const context = describe;

describe('SideNav', () => {
  it('renders a labelled navigation with a list of links', () => {
    render((
      <SideNav aria-label="대시보드 메뉴">
        <SideNavList>
          <SideNavItem
            href="/"
            icon="house"
          >
            홈
          </SideNavItem>
          <SideNavItem href="/orders">주문</SideNavItem>
        </SideNavList>
      </SideNav>
    ));

    const nav = screen.getByRole('navigation', { name: '대시보드 메뉴' });

    expect(nav).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('link', { name: '홈' })).toHaveAttribute('href', '/');
  });

  it('renders the icon before the label', () => {
    render((
      <SideNavList>
        <SideNavItem
          href="/"
          icon="house"
        >
          홈
        </SideNavItem>
      </SideNavList>
    ));

    expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'house');
  });

  it('marks the current item with aria-current', () => {
    render((
      <SideNavList>
        <SideNavItem
          href="/"
          current
        >
          홈
        </SideNavItem>
        <SideNavItem href="/orders">주문</SideNavItem>
      </SideNavList>
    ));

    expect(screen.getByRole('link', { name: '홈' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: '주문' })).not.toHaveAttribute('aria-current');
  });

  context('when item is disabled', () => {
    it('is not interactive', () => {
      const handleClick = jest.fn();

      render((
        <SideNavList onClick={handleClick}>
          <SideNavItem
            href="/orders"
            disabled
          >
            주문
          </SideNavItem>
        </SideNavList>
      ));

      const link = screen.getByRole('link', { name: '주문' });

      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('tabindex', '-1');
      expect(link).not.toHaveAttribute('href');

      fireEvent.click(link);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  context('with asChild', () => {
    it('passes props and icon to the child element', () => {
      render((
        <SideNavList>
          <SideNavItem
            icon="house"
            current
            asChild
          >
            <a href="/home">홈</a>
          </SideNavItem>
          <SideNavSubItem asChild>
            <a href="/members">회원</a>
          </SideNavSubItem>
        </SideNavList>
      ));

      const link = screen.getByRole('link', { name: '홈' });

      expect(link).toHaveAttribute('href', '/home');
      expect(link).toHaveAttribute('aria-current', 'page');
      expect(link).toContainElement(screen.getByTestId('icon'));
      expect(screen.getByRole('link', { name: '회원' })).toHaveAttribute('href', '/members');
    });

    context('when disabled', () => {
      it('keeps the child href but blocks navigation and focus', () => {
        const handleClick = jest.fn();

        render((
          <SideNavList>
            <SideNavItem
              disabled
              asChild
            >
              <a
                href="/orders"
                onClick={handleClick}
              >
                주문
              </a>
            </SideNavItem>
            <SideNavSubItem
              disabled
              asChild
            >
              <a href="/members">회원</a>
            </SideNavSubItem>
          </SideNavList>
        ));

        const link = screen.getByRole('link', { name: '주문' });

        expect(link).toHaveAttribute('href', '/orders');
        expect(link).toHaveAttribute('aria-disabled', 'true');
        expect(link).toHaveAttribute('tabindex', '-1');

        const clickEvent = fireEvent.click(link);

        expect(clickEvent).toBe(false);
        expect(handleClick).not.toHaveBeenCalled();
        expect(screen.getByRole('link', { name: '회원' })).toHaveAttribute('aria-disabled', 'true');
      });
    });
  });

  context('with group', () => {
    it('toggles sub items by clicking the trigger', async () => {
      render((
        <SideNavList>
          <SideNavGroup
            label="신청 관리"
            icon="file"
          >
            <SideNavSubItem href="/requests">신청 목록</SideNavSubItem>
          </SideNavGroup>
        </SideNavList>
      ));

      const trigger = screen.getByRole('button', { name: '신청 관리' });

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByRole('link', { name: '신청 목록' })).not.toBeInTheDocument();

      fireEvent.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });

      expect(screen.getByRole('link', { name: '신청 목록' })).toBeVisible();
    });

    it('toggles sub items with Enter and Space keys', async () => {
      const pressEnter = (element: HTMLElement) => {
        fireEvent.keyDown(element, { key: 'Enter' });
        fireEvent.click(element);
        fireEvent.keyUp(element, { key: 'Enter' });
      };

      const pressSpace = (element: HTMLElement) => {
        fireEvent.keyDown(element, { key: ' ' });
        fireEvent.keyUp(element, { key: ' ' });
        fireEvent.click(element);
      };

      render((
        <SideNavList>
          <SideNavGroup label="신청 관리">
            <SideNavSubItem href="/requests">신청 목록</SideNavSubItem>
          </SideNavGroup>
        </SideNavList>
      ));

      const trigger = screen.getByRole('button', { name: '신청 관리' });

      trigger.focus();

      expect(trigger).toHaveFocus();
      expect(trigger.tagName).toBe('BUTTON');

      pressEnter(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });

      pressSpace(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('opens initially with defaultOpen and marks the current sub item', () => {
      render((
        <SideNavList>
          <SideNavGroup
            label="신청 관리"
            defaultOpen
          >
            <SideNavSubItem
              href="/requests"
              current
            >
              신청 목록
            </SideNavSubItem>
            <SideNavSubItem href="/requests/new">신규 신청</SideNavSubItem>
          </SideNavGroup>
        </SideNavList>
      ));

      expect(screen.getByRole('button', { name: '신청 관리' })).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('link', { name: '신청 목록' })).toHaveAttribute('aria-current', 'page');
      expect(screen.getByRole('link', { name: '신규 신청' })).not.toHaveAttribute('aria-current');
    });
  });
});
