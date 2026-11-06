import { useState, type ReactElement } from 'react';

import {
  act, fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { Carousel } from './Carousel';
import { CarouselControl } from './CarouselControl';
import { CarouselIndicator } from './CarouselIndicator';
import { CarouselIndicatorGroup } from './CarouselIndicatorGroup';
import { CarouselItem } from './CarouselItem';
import { CarouselItemGroup } from './CarouselItemGroup';
import { CarouselNextTrigger } from './CarouselNextTrigger';
import { CarouselPrevTrigger } from './CarouselPrevTrigger';
import { CarouselProgressText } from './CarouselProgressText';

const context = describe;

const slides = [0, 1, 2];

const SLIDE_WIDTH = 100;

class IntersectionObserverStub {
  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords() {
    return [];
  }
}

class ResizeObserverStub {
  observe() {}

  unobserve() {}

  disconnect() {}
}

const patchedProperties = ['offsetWidth', 'offsetHeight', 'scrollWidth'] as const;
const originalDescriptors = new Map<string, PropertyDescriptor | undefined>();
const originalWindow = {
  IntersectionObserver: window.IntersectionObserver,
  ResizeObserver: window.ResizeObserver,
};
const originalScroll = {
  scrollTo: Element.prototype.scrollTo,
  scrollBy: Element.prototype.scrollBy,
};

beforeAll(() => {
  Object.assign(window, {
    IntersectionObserver: IntersectionObserverStub,
    ResizeObserver: ResizeObserverStub,
  });
  Object.assign(Element.prototype, {
    scrollTo: () => {},
    scrollBy: () => {},
  });

  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function mock(this: Element) {
    const element = this as HTMLElement;
    const index = Number(element.dataset.index ?? 0);
    const left = element.dataset.part === 'item' ? index * SLIDE_WIDTH : 0;

    return {
      x: left,
      y: 0,
      left,
      top: 0,
      right: left + SLIDE_WIDTH,
      bottom: SLIDE_WIDTH,
      width: SLIDE_WIDTH,
      height: SLIDE_WIDTH,
      toJSON: () => ({}),
    };
  });
  jest.spyOn(window, 'getComputedStyle').mockImplementation(() => ({
    direction: 'ltr',
    getPropertyValue: (name: string) => (name === 'scroll-snap-align' ? 'start' : ''),
  }) as unknown as CSSStyleDeclaration);

  patchedProperties.forEach((name) => {
    originalDescriptors.set(name, Object.getOwnPropertyDescriptor(HTMLElement.prototype, name));
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    value: SLIDE_WIDTH,
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    value: SLIDE_WIDTH,
  });
  Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
    configurable: true,
    value: SLIDE_WIDTH * slides.length,
  });
});

afterAll(() => {
  jest.restoreAllMocks();

  patchedProperties.forEach((name) => {
    const descriptor = originalDescriptors.get(name);

    if (descriptor) {
      Object.defineProperty(HTMLElement.prototype, name, descriptor);
    } else {
      Reflect.deleteProperty(HTMLElement.prototype, name);
    }
  });
  Object.assign(window, originalWindow);
  Object.assign(Element.prototype, originalScroll);
});

type CarouselExampleProps = {
  page: number;
  loop?: boolean;
  onChangePage: ({ page }: { page: number }) => void;
};

function CarouselExample({
  page,
  loop = false,
  onChangePage,
}: CarouselExampleProps) {
  return (
    <Carousel
      slideCount={slides.length}
      page={page}
      loop={loop}
      aria-label="배너"
      onChangePage={onChangePage}
    >
      <CarouselItemGroup>
        {slides.map((index) => (
          <CarouselItem
            key={index}
            index={index}
          >
            {`슬라이드 ${index + 1}`}
          </CarouselItem>
        ))}
      </CarouselItemGroup>
      <CarouselControl>
        <CarouselPrevTrigger />
        <CarouselIndicatorGroup>
          {slides.map((index) => (
            <CarouselIndicator
              key={index}
              index={index}
            />
          ))}
        </CarouselIndicatorGroup>
        <CarouselProgressText />
        <CarouselNextTrigger />
      </CarouselControl>
    </Carousel>
  );
}

function StatefulCarousel() {
  const [page, setPage] = useState(0);

  return (
    <CarouselExample
      page={page}
      onChangePage={({ page: next }) => setPage(next)}
    />
  );
}

async function renderCarousel(ui: ReactElement) {
  render(ui);

  await act(async () => {
    await new Promise((resolve) => {
      requestAnimationFrame(resolve);
    });
  });
}

describe('Carousel', () => {
  const handleChangePage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a named carousel region with slides and progress text', async () => {
    await renderCarousel((
      <CarouselExample
        page={0}
        onChangePage={handleChangePage}
      />
    ));

    expect(screen.getByRole('region', { name: '배너' })).toHaveAttribute('aria-roledescription', 'carousel');
    expect(screen.getAllByRole('group', { hidden: true })).toHaveLength(slides.length);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('renders triggers and indicators with default accessible names', async () => {
    await renderCarousel((
      <CarouselExample
        page={0}
        onChangePage={handleChangePage}
      />
    ));

    expect(screen.getByRole('button', { name: '이전 슬라이드' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '다음 슬라이드' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1번 슬라이드로 이동' })).toHaveAttribute('data-current');
    expect(screen.getByRole('button', { name: '3번 슬라이드로 이동' })).not.toHaveAttribute('data-current');
  });

  it('allows overriding trigger names', async () => {
    await renderCarousel((
      <Carousel
        slideCount={2}
        page={0}
        aria-label="배너"
        onChangePage={handleChangePage}
      >
        <CarouselControl>
          <CarouselPrevTrigger aria-label="이전 배너" />
          <CarouselNextTrigger aria-label="다음 배너" />
        </CarouselControl>
      </Carousel>
    ));

    expect(screen.getByRole('button', { name: '이전 배너' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '다음 배너' })).toBeInTheDocument();
  });

  it('requests the next page when next trigger is clicked', async () => {
    await renderCarousel((
      <CarouselExample
        page={0}
        onChangePage={handleChangePage}
      />
    ));

    fireEvent.click(screen.getByRole('button', { name: '다음 슬라이드' }));

    await waitFor(() => expect(handleChangePage).toHaveBeenCalledWith({ page: 1 }));
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('passes the page prop through to the carousel and shows that page', async () => {
    await renderCarousel((
      <CarouselExample
        page={1}
        onChangePage={handleChangePage}
      />
    ));

    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2번 슬라이드로 이동' })).toHaveAttribute('data-current');
  });

  context('when on the first page', () => {
    it('disables the prev trigger', async () => {
      await renderCarousel((
        <CarouselExample
          page={0}
          onChangePage={handleChangePage}
        />
      ));

      expect(screen.getByRole('button', { name: '이전 슬라이드' })).toBeDisabled();
      expect(screen.getByRole('button', { name: '다음 슬라이드' })).toBeEnabled();
    });
  });

  context('with loop', () => {
    it('keeps the prev trigger enabled on the first page', async () => {
      await renderCarousel((
        <CarouselExample
          page={0}
          loop
          onChangePage={handleChangePage}
        />
      ));

      expect(screen.getByRole('button', { name: '이전 슬라이드' })).toBeEnabled();
    });

    it('requests the last page when prev trigger is clicked on the first page', async () => {
      await renderCarousel((
        <CarouselExample
          page={0}
          loop
          onChangePage={handleChangePage}
        />
      ));

      fireEvent.click(screen.getByRole('button', { name: '이전 슬라이드' }));

      await waitFor(() => expect(handleChangePage).toHaveBeenCalledWith({ page: slides.length - 1 }));
    });
  });

  context('when page state is updated', () => {
    it('moves forward and back with triggers', async () => {
      await renderCarousel(<StatefulCarousel />);

      fireEvent.click(screen.getByRole('button', { name: '다음 슬라이드' }));

      await screen.findByText('2 / 3');
      expect(screen.getByRole('button', { name: '이전 슬라이드' })).toBeEnabled();

      fireEvent.click(screen.getByRole('button', { name: '이전 슬라이드' }));

      await screen.findByText('1 / 3');
      expect(screen.getByRole('button', { name: '이전 슬라이드' })).toBeDisabled();
    });

    it('disables the next trigger on the last page', async () => {
      await renderCarousel(<StatefulCarousel />);

      fireEvent.click(screen.getByRole('button', { name: '3번 슬라이드로 이동' }));

      await screen.findByText('3 / 3');
      expect(screen.getByRole('button', { name: '3번 슬라이드로 이동' })).toHaveAttribute('data-current');
      expect(screen.getByRole('button', { name: '다음 슬라이드' })).toBeDisabled();
    });
  });

  context('with keyboard on indicators', () => {
    it('requests the next page with ArrowRight', async () => {
      await renderCarousel((
        <CarouselExample
          page={0}
          onChangePage={handleChangePage}
        />
      ));

      fireEvent.keyDown(screen.getByRole('button', { name: '1번 슬라이드로 이동' }), { key: 'ArrowRight' });

      await waitFor(() => expect(handleChangePage).toHaveBeenCalledWith({ page: 1 }));
    });

    it('requests the last page with End', async () => {
      await renderCarousel((
        <CarouselExample
          page={0}
          onChangePage={handleChangePage}
        />
      ));

      fireEvent.keyDown(screen.getByRole('button', { name: '1번 슬라이드로 이동' }), { key: 'End' });

      await waitFor(() => expect(handleChangePage).toHaveBeenCalledWith({ page: 2 }));
    });

    it('requests the first page with Home', async () => {
      await renderCarousel((
        <CarouselExample
          page={2}
          onChangePage={handleChangePage}
        />
      ));

      fireEvent.keyDown(screen.getByRole('button', { name: '3번 슬라이드로 이동' }), { key: 'Home' });

      await waitFor(() => expect(handleChangePage).toHaveBeenCalledWith({ page: 0 }));
    });
  });
});
