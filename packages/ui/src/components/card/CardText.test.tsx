import { render, screen } from '@testing-library/react';

import { CardText } from './CardText';

describe('CardText', () => {
  it('keeps the full text in the DOM', () => {
    const text = '아주 긴 본문 '.repeat(20).trim();

    render(<CardText>{text}</CardText>);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
