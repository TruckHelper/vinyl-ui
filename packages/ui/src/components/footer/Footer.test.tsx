import { render, screen, within } from '@testing-library/react';

import { Link } from '../link/Link';

import { Footer } from './Footer';
import { FooterCopyright } from './FooterCopyright';
import { FooterInfo } from './FooterInfo';
import { FooterInfoItem } from './FooterInfoItem';
import { FooterInfoList } from './FooterInfoList';
import { FooterLinkGroup } from './FooterLinkGroup';
import { FooterLinkGroupTitle } from './FooterLinkGroupTitle';
import { FooterLinkList } from './FooterLinkList';
import { FooterNav } from './FooterNav';
import { FooterTitle } from './FooterTitle';

function renderFooter() {
  return render((
    <Footer>
      <FooterInfo>
        <FooterTitle>서비스명</FooterTitle>
        <FooterInfoList>
          <FooterInfoItem>(주) 회사명</FooterInfoItem>
          <FooterInfoItem>대표이사 : 홍길동</FooterInfoItem>
        </FooterInfoList>
        <FooterInfoList>
          <FooterInfoItem>이메일 : help@example.com</FooterInfoItem>
        </FooterInfoList>
      </FooterInfo>
      <FooterNav aria-label="푸터 메뉴">
        <FooterLinkGroup>
          <FooterLinkGroupTitle>이용안내</FooterLinkGroupTitle>
          <FooterLinkList>
            <Link href="/guide">신청 절차 가이드</Link>
            <Link href="/faq">자주 묻는 질문</Link>
          </FooterLinkList>
        </FooterLinkGroup>
        <FooterLinkGroup>
          <FooterLinkGroupTitle>이용 및 약관</FooterLinkGroupTitle>
          <FooterLinkList>
            <Link href="/privacy">개인정보처리방침</Link>
          </FooterLinkList>
        </FooterLinkGroup>
      </FooterNav>
      <FooterCopyright>
        <p>© 2026 Company. All rights reserved.</p>
      </FooterCopyright>
    </Footer>
  ));
}

describe('Footer', () => {
  it('renders footer', () => {
    renderFooter();

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders company information as list', () => {
    renderFooter();

    const lists = screen.getAllByRole('list');

    expect(lists).toHaveLength(2);
    expect(within(lists[0] as HTMLElement).getAllByRole('listitem')).toHaveLength(2);
    expect(within(lists[1] as HTMLElement).getAllByRole('listitem')).toHaveLength(1);
  });

  it('renders links in navigation', () => {
    renderFooter();

    const nav = screen.getByRole('navigation', { name: '푸터 메뉴' });

    expect(within(nav).getAllByRole('link')).toHaveLength(3);
  });
});
