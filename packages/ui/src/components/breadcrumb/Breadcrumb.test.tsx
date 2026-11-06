import { render, screen } from '@testing-library/react';

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
  it('renders breadcrumb', () => {
    renderBreadcrumb();

    expect(screen.getByRole('navigation', { name: '현재 위치' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('renders links', () => {
    renderBreadcrumb();

    expect(screen.getByRole('link', { name: '대분류' })).toHaveAttribute('href', '/category');
    expect(screen.getByRole('link', { name: '중분류' })).toHaveAttribute('href', '/category/sub');
  });

  it('marks current page with aria-current', () => {
    renderBreadcrumb();

    const current = screen.getByText('소분류');

    expect(current).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('link', { name: '소분류' })).not.toBeInTheDocument();
  });

  context('with asChild', () => {
    it('renders child link', () => {
      render((
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <a href="/router">대분류</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      ));

      const links = screen.getAllByRole('link');

      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute('href', '/router');
    });
  });
});
