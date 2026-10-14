import { render, screen } from '@testing-library/react';

import { Caption } from './Caption';

describe('Caption', () => {
  it('renders children', () => {
    render((
      <Caption>Caption</Caption>
    ));

    expect(screen.getByText('Caption')).toBeInTheDocument();
  });

  it('renders inline elements inside the text', () => {
    render((
      <Caption>
        결제 후 <b>취소</b> 불가
      </Caption>
    ));

    expect(screen.getByText('취소')).toBeInTheDocument();
  });
});
