import { fireEvent, render, screen, within } from '@testing-library/react';

import { Button } from '../button/Button';
import { Link } from '../link/Link';

import { List } from './List';
import { ListAction } from './ListAction';
import { ListItem } from './ListItem';
import { ListTitle } from './ListTitle';
import { ListValue } from './ListValue';

const context = describe;

describe('List', () => {
  it('renders items as a list', () => {
    render((
      <List>
        <ListItem>
          <ListTitle>이름</ListTitle>
          <ListValue>홍길동</ListValue>
        </ListItem>
        <ListItem>
          <ListTitle>이메일</ListTitle>
          <ListValue>hong@example.com</ListValue>
        </ListItem>
      </List>
    ));

    const list = screen.getByRole('list');
    const [first, second] = within(list).getAllByRole('listitem');

    expect(within(list).getAllByRole('listitem')).toHaveLength(2);
    expect(first).toHaveTextContent('이름홍길동');
    expect(second).toHaveTextContent('이메일hong@example.com');
  });

  it('passes className and attributes through', () => {
    render((
      <List
        className="custom"
        aria-label="회원 정보"
      >
        <ListItem className="item">
          <ListTitle>이름</ListTitle>
          <ListValue>홍길동</ListValue>
        </ListItem>
      </List>
    ));

    expect(screen.getByRole('list', { name: '회원 정보' })).toHaveClass('custom');
    expect(screen.getByRole('listitem')).toHaveClass('item');
  });

  context('with link', () => {
    it('renders a link with href', () => {
      render((
        <List>
          <ListItem>
            <ListTitle>약관</ListTitle>
            <ListValue>
              <Link href="/terms">보기</Link>
            </ListValue>
          </ListItem>
        </List>
      ));

      expect(screen.getByRole('link', { name: '보기' })).toHaveAttribute('href', '/terms');
    });
  });

  context('with action button', () => {
    it('listens for button click events', () => {
      const handleClick = jest.fn();

      render((
        <List>
          <ListItem>
            <ListTitle>휴대폰</ListTitle>
            <ListValue>
              <ListAction>
                <span>010-1234-5678</span>
                <Button
                  variant="neutral"
                  onClick={handleClick}
                >
                  변경
                </Button>
              </ListAction>
            </ListValue>
          </ListItem>
        </List>
      ));

      fireEvent.click(screen.getByRole('button', { name: '변경' }));

      expect(handleClick).toHaveBeenCalled();
    });

    it('renders the button only in the item that has it', () => {
      render((
        <List>
          <ListItem>
            <ListTitle>이름</ListTitle>
            <ListValue>홍길동</ListValue>
          </ListItem>
          <ListItem>
            <ListTitle>휴대폰</ListTitle>
            <ListValue>
              <ListAction>
                <span>010-1234-5678</span>
                <Button variant="neutral">변경</Button>
              </ListAction>
            </ListValue>
          </ListItem>
        </List>
      ));

      const [nameItem, phoneItem] = screen.getAllByRole('listitem');

      expect(within(nameItem as HTMLElement).queryByRole('button')).not.toBeInTheDocument();
      expect(within(phoneItem as HTMLElement).getByText('010-1234-5678')).toBeInTheDocument();
      expect(within(phoneItem as HTMLElement).getByRole('button', { name: '변경' })).toBeInTheDocument();
    });
  });
});
