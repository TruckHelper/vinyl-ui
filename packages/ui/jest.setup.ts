import '@testing-library/jest-dom';

import { jest } from '@jest/globals';

Object.assign(globalThis, { jest });

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.assign(globalThis, { ResizeObserver: ResizeObserverStub });
