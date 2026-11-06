import { render, screen } from '@testing-library/react';

import { CardImage } from './CardImage';

describe('CardImage', () => {
  it('exposes alt text as img role', () => {
    render((
      <CardImage
        src="/news.png"
        alt="뉴스 이미지"
      />
    ));

    expect(screen.getByRole('img', { name: '뉴스 이미지' })).toHaveAttribute('src', '/news.png');
  });

  it('is presentational when alt is empty', () => {
    render((
      <CardImage
        src="/news.png"
        alt=""
      />
    ));

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });
});
