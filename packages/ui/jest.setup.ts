import '@testing-library/jest-dom';

import { jest } from '@jest/globals';

class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

Object.assign(globalThis, { jest });

if (!('ResizeObserver' in globalThis)) {
  Object.assign(globalThis, { ResizeObserver });
}
