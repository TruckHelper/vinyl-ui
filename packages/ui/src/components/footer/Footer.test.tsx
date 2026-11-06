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

const context = describe;

describe('Footer', () => {
  it('renders a footer landmark with its children', () => {
    render((
      <Footer className="custom">
        <FooterInfo>
          <FooterTitle>서비스명</FooterTitle>
        </FooterInfo>
      </Footer>
    ));

    const footer = screen.getByRole('contentinfo');

    expect(footer.tagName).toBe('FOOTER');
    expect(footer).toHaveClass('custom');
    expect(within(footer).getByText('서비스명')).toBeInTheDocument();
  });

  context('with company information', () => {
    it('renders each information as a list item', () => {
      render((
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
        </Footer>
      ));

      const [first, second] = screen.getAllByRole('list') as [HTMLElement, HTMLElement];

      expect(screen.getAllByRole('list')).toHaveLength(2);
      expect(within(first).getAllByRole('listitem')).toHaveLength(2);
      expect(within(second).getByRole('listitem')).toHaveTextContent('이메일 : help@example.com');
    });
  });

  context('with link groups', () => {
    it('renders links inside a labeled navigation', () => {
      render((
        <Footer>
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
        </Footer>
      ));

      const nav = screen.getByRole('navigation', { name: '푸터 메뉴' });

      expect(within(nav).getAllByRole('link')).toHaveLength(3);
      expect(within(nav).getByText('이용안내')).toBeInTheDocument();
      expect(within(nav).getByRole('link', { name: '개인정보처리방침' })).toHaveAttribute('href', '/privacy');
    });
  });

  context('with copyright', () => {
    it('renders the notice and copyright text', () => {
      render((
        <Footer>
          <FooterCopyright>
            <p>이용안내 고지 문구</p>
            <p>© 2026 Company. All rights reserved.</p>
          </FooterCopyright>
        </Footer>
      ));

      expect(screen.getByText('이용안내 고지 문구')).toBeInTheDocument();
      expect(screen.getByText('© 2026 Company. All rights reserved.')).toBeInTheDocument();
    });
  });
});
