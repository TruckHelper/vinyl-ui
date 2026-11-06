import { render, screen } from '@testing-library/react';

import { Card } from './Card';
import { CardContent } from './CardContent';
import { CardDate } from './CardDate';
import { CardImage } from './CardImage';
import { CardInfo } from './CardInfo';
import { CardLabel } from './CardLabel';
import { CardText } from './CardText';
import { CardTitle } from './CardTitle';

const context = describe;

describe('Card', () => {
  context('with label, title and text', () => {
    it('renders every part', () => {
      render((
        <Card>
          <CardImage
            src="/news.png"
            alt="뉴스 이미지"
          />
          <CardInfo>
            <CardContent>
              <CardLabel>공지</CardLabel>
              <CardTitle>타이틀</CardTitle>
              <CardText>본문</CardText>
            </CardContent>
            <CardDate dateTime="2026-01-01">2026.01.01</CardDate>
          </CardInfo>
        </Card>
      ));

      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: '뉴스 이미지' })).toBeInTheDocument();
      expect(screen.getByText('공지')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: '타이틀' })).toBeInTheDocument();
      expect(screen.getByText('본문')).toBeInTheDocument();
      expect(screen.getByText('2026.01.01')).toBeInTheDocument();
    });
  });

  context('with label and title only', () => {
    it('renders label, title and date without text', () => {
      render((
        <Card>
          <CardInfo>
            <CardContent>
              <CardLabel>공지</CardLabel>
              <CardTitle>타이틀</CardTitle>
            </CardContent>
            <CardDate>2026.01.01</CardDate>
          </CardInfo>
        </Card>
      ));

      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByText('공지')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: '타이틀' })).toBeInTheDocument();
      expect(screen.getByText('2026.01.01')).toBeInTheDocument();
      expect(screen.queryByText('본문')).not.toBeInTheDocument();
    });
  });

  context('with title and text only', () => {
    it('renders title, text and date without label', () => {
      render((
        <Card>
          <CardInfo>
            <CardContent>
              <CardTitle>타이틀</CardTitle>
              <CardText>본문</CardText>
            </CardContent>
            <CardDate>2026.01.01</CardDate>
          </CardInfo>
        </Card>
      ));

      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: '타이틀' })).toBeInTheDocument();
      expect(screen.getByText('본문')).toBeInTheDocument();
      expect(screen.getByText('2026.01.01')).toBeInTheDocument();
      expect(screen.queryByText('공지')).not.toBeInTheDocument();
    });
  });

  it('passes dateTime to the time element', () => {
    render(<CardDate dateTime="2026-01-01">2026.01.01</CardDate>);

    expect(screen.getByText('2026.01.01').tagName).toBe('TIME');
    expect(screen.getByText('2026.01.01')).toHaveAttribute('datetime', '2026-01-01');
  });

  it('can be wrapped in a link to make the whole card navigable', () => {
    render((
      <a href="/news/1">
        <Card>
          <CardInfo>
            <CardTitle>타이틀</CardTitle>
          </CardInfo>
        </Card>
      </a>
    ));

    expect(screen.getByRole('link', { name: '타이틀' })).toHaveAttribute('href', '/news/1');
  });

  it('merges className', () => {
    render(<Card className="custom">내용</Card>);

    expect(screen.getByRole('article')).toHaveClass('custom');
  });
});
