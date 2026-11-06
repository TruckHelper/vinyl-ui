'use client';

import { createContext } from 'react';

export const ProcessIndicatorContext = createContext<{ current: number }>({ current: 0 });
