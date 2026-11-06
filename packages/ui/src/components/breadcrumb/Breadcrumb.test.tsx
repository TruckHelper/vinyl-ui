import { fireEvent, render, screen } from '@testing-library/react';

import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbCurrent } from './BreadcrumbCurrent';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbLink } from './BreadcrumbLink';

const context = describe;

function renderBreadcrumb() {
  return render((
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/category">대분류</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/category/sub">중분류</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbCurrent>소분류</BreadcrumbCurrent>
      </BreadcrumbItem>
    </Breadcrumb>
  ));
}

describe('Breadcrumb', () => {
  it('renders a navigation landmark with an ordered list of items', () => {
    renderBreadcrumb();

    const navigation = screen.getByRole('navigation', { name: '현재 위치' });
    const list = screen.getByRole('list');

    expect(navigation).toContainElement(list);
    expect(list.tagName).toBe('OL');
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('uses the given aria-label for the navigation', () => {
    render((
      <Breadcrumb aria-label="카테고리 경로">
        <BreadcrumbItem>
          <BreadcrumbCurrent>홈</BreadcrumbCurrent>
        </BreadcrumbItem>
      </Breadcrumb>
    ));

    expect(screen.getByRole('navigation', { name: '카테고리 경로' })).toBeInTheDocument();
  });

  it('renders links to the parent pages', () => {
    renderBreadcrumb();

    expect(screen.getByRole('link', { name: '대분류' })).toHaveAttribute('href', '/category');
    expect(screen.getByRole('link', { name: '중분류' })).toHaveAttribute('href', '/category/sub');
  });

  it('marks the current page with aria-current', () => {
    renderBreadcrumb();

    const current = screen.getByText('소분류');

    expect(current).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('link', { name: '소분류' })).not.toBeInTheDocument();
  });

  it('renders a chevron separator hidden from assistive technology in each item', () => {
    renderBreadcrumb();

    const icons = screen.getAllByTestId('icon');

    expect(icons).toHaveLength(3);
    icons.forEach((icon) => {
      expect(icon).toHaveAttribute('data-name', 'chevron-right');
      expect(icon.closest('[data-part="separator"]')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('keeps separators out of the accessible names of the items', () => {
    renderBreadcrumb();

    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent(/^중분류$/);
  });

  it('lets the links receive keyboard focus', () => {
    renderBreadcrumb();

    const link = screen.getByRole('link', { name: '대분류' });

    link.focus();

    expect(link).toHaveFocus();
  });

  it('listens for click events on the links', () => {
    const handleClick = jest.fn();

    render((
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/category"
            onClick={handleClick}
          >
            대분류
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    ));

    fireEvent.click(screen.getByRole('link', { name: '대분류' }));

    expect(handleClick).toHaveBeenCalled();
  });

  context('with asChild', () => {
    it('renders a single link element using the child', () => {
      render((
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="custom"
            >
              <a href="/router">대분류</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      ));

      const links = screen.getAllByRole('link');
      const link = screen.getByRole('link', { name: '대분류' });

      expect(links).toHaveLength(1);
      expect(link).toHaveAttribute('href', '/router');
      expect(link).toHaveClass('custom');
      expect(link.querySelector('a')).toBeNull();
    });

    it('lets the child link receive keyboard focus', () => {
      render((
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <a href="/router">대분류</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      ));

      const link = screen.getByRole('link', { name: '대분류' });

      link.focus();

      expect(link).toHaveFocus();
      expect(link).not.toHaveAttribute('tabindex');
    });
  });
});
