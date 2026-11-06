import { render, screen } from '@testing-library/react';

import { NewsCard } from './NewsCard';
import { NewsCardContent } from './NewsCardContent';
import { NewsCardDate } from './NewsCardDate';
import { NewsCardImage } from './NewsCardImage';
import { NewsCardInfo } from './NewsCardInfo';
import { NewsCardLabel } from './NewsCardLabel';
import { NewsCardText } from './NewsCardText';
import { NewsCardTitle } from './NewsCardTitle';

describe('NewsCard', () => {
  it('renders every part', () => {
    render((
      <NewsCard>
        <NewsCardImage
          src="/news.png"
          alt="뉴스 이미지"
        />
        <NewsCardInfo>
          <NewsCardContent>
            <NewsCardLabel>공지</NewsCardLabel>
            <NewsCardTitle>타이틀</NewsCardTitle>
            <NewsCardText>본문</NewsCardText>
          </NewsCardContent>
          <NewsCardDate dateTime="2026-01-01">2026.01.01</NewsCardDate>
        </NewsCardInfo>
      </NewsCard>
    ));

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '뉴스 이미지' })).toBeInTheDocument();
    expect(screen.getByText('공지')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '타이틀' })).toBeInTheDocument();
    expect(screen.getByText('본문')).toBeInTheDocument();
    expect(screen.getByText('2026.01.01')).toBeInTheDocument();
  });
});
