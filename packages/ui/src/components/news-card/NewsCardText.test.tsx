import { render, screen } from '@testing-library/react';

import { NewsCardText } from './NewsCardText';

describe('NewsCardText', () => {
  it('renders text', () => {
    const text = '아주 긴 본문 '.repeat(20).trim();

    render(<NewsCardText>{text}</NewsCardText>);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
