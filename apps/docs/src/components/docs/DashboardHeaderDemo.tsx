import {
  DashboardHeader,
  DashboardHeaderActions,
  DashboardHeaderDivider,
  DashboardHeaderLogo,
  DashboardHeaderUser,
} from '@bigmobility/vinyl-ui/dashboard-header';
import { Icon } from '@bigmobility/vinyl-ui/icon';
import { Link } from '@bigmobility/vinyl-ui/link';

import { styled } from 'styled-system/jsx';

const Surface = styled('div', {
  base: {
    width: '100%',
    borderRadius: '8',
    backgroundColor: 'layout.bg-dark',
  },
});

const LogoText = styled('span', {
  base: {
    textStyle: 'heading.small-bold',
    whiteSpace: 'nowrap',
  },
});

export default function DashboardHeaderDemo() {
  return (
    <Surface>
      <DashboardHeader>
        <DashboardHeaderLogo>
          <LogoText>LOGO</LogoText>
        </DashboardHeaderLogo>
        <DashboardHeaderActions>
          <DashboardHeaderUser>김회원님</DashboardHeaderUser>
          <DashboardHeaderDivider />
          <Link href="#기본-예시">
            로그아웃
            <Icon name="log-out" />
          </Link>
        </DashboardHeaderActions>
      </DashboardHeader>
    </Surface>
  );
}
