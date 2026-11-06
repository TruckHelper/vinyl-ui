import { render, screen } from '@testing-library/react';

import { PageTitle } from './PageTitle';
import { PageTitleAside } from './PageTitleAside';
import { PageTitleHeading } from './PageTitleHeading';

describe('PageTitle', () => {
  it('renders the title as a level 1 heading inside a header', () => {
    render((
      <PageTitle>
        <PageTitleHeading>주문 관리</PageTitleHeading>
      </PageTitle>
    ));

    const heading = screen.getByRole('heading', { level: 1, name: '주문 관리' });

    expect(heading).toBeInTheDocument();
    expect(screen.getByRole('banner')).toContainElement(heading);
  });

  it('renders aside content next to the title', () => {
    render((
      <PageTitle>
        <PageTitleHeading>주문 관리</PageTitleHeading>
        <PageTitleAside>
          <a href="/orders">주문</a>
        </PageTitleAside>
      </PageTitle>
    ));

    expect(screen.getByRole('link', { name: '주문' })).toHaveAttribute('href', '/orders');
  });

  it('passes className to the root', () => {
    render((
      <PageTitle className="custom">
        <PageTitleHeading>주문 관리</PageTitleHeading>
      </PageTitle>
    ));

    expect(screen.getByRole('banner')).toHaveClass('custom');
  });
});
