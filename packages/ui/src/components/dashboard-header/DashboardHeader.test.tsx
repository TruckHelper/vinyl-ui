import { render, screen } from '@testing-library/react';

import { Link } from '../link/Link';

import { DashboardHeader } from './DashboardHeader';
import { DashboardHeaderActions } from './DashboardHeaderActions';
import { DashboardHeaderDivider } from './DashboardHeaderDivider';
import { DashboardHeaderLogo } from './DashboardHeaderLogo';
import { DashboardHeaderUser } from './DashboardHeaderUser';

describe('DashboardHeader', () => {
  it('renders a banner landmark with logo, user name and actions', () => {
    render((
      <DashboardHeader>
        <DashboardHeaderLogo>
          <a href="/">홈</a>
        </DashboardHeaderLogo>
        <DashboardHeaderActions>
          <DashboardHeaderUser>김회원님</DashboardHeaderUser>
          <DashboardHeaderDivider />
          <Link href="/logout">로그아웃</Link>
        </DashboardHeaderActions>
      </DashboardHeader>
    ));

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '홈' })).toHaveAttribute('href', '/');
    expect(screen.getByText('김회원님')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '로그아웃' })).toHaveAttribute('href', '/logout');
  });

  it('hides the divider from assistive technology', () => {
    render((
      <DashboardHeader>
        <DashboardHeaderActions>
          <DashboardHeaderDivider data-testid="divider" />
        </DashboardHeaderActions>
      </DashboardHeader>
    ));

    expect(screen.getByTestId('divider')).toHaveAttribute('aria-hidden', 'true');
  });

  it('passes className to the root element', () => {
    render((
      <DashboardHeader className="custom">
        <DashboardHeaderUser>김회원님</DashboardHeaderUser>
      </DashboardHeader>
    ));

    expect(screen.getByRole('banner')).toHaveClass('custom');
  });
});
