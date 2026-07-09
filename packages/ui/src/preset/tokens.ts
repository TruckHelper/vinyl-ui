import type { Tokens } from '@pandacss/dev';

export const tokens: Tokens = {
  colors: {
    navy: {
      100: { value: '#EEF0F7' },
      200: { value: '#D0D5E8' },
      300: { value: '#A4AED0' },
      400: { value: '#6878B0' },
      500: { value: '#27396B' },
      600: { value: '#1E2D56' },
      700: { value: '#152244' },
      800: { value: '#0C1530' },
    },
    orange: {
      100: { value: '#FEF0E7' },
      200: { value: '#FDD4B3' },
      300: { value: '#FAAA72' },
      400: { value: '#F27D3A' },
      500: { value: '#EB6013' },
      600: { value: '#B84200' },
      700: { value: '#8A3200' },
      800: { value: '#5C2000' },
    },
    'emerald-green': {
      100: { value: '#EAFAF2' },
      200: { value: '#C1EDDA' },
      300: { value: '#87DAB7' },
      400: { value: '#42C18E' },
      500: { value: '#259E6E' },
      600: { value: '#1B7955' },
      700: { value: '#165B3E' },
      800: { value: '#0F3B2A' },
    },
    green: {
      100: { value: '#EAF4EA' },
      200: { value: '#C0E0BF' },
      300: { value: '#8DC48B' },
      400: { value: '#62A960' },
      500: { value: '#498F47' },
      600: { value: '#376E35' },
      700: { value: '#276B25' },
      800: { value: '#174D15' },
    },
    red: {
      100: { value: '#FDECEC' },
      200: { value: '#F9BFBF' },
      300: { value: '#F18787' },
      400: { value: '#E85656' },
      500: { value: '#DB3535' },
      600: { value: '#A01A1A' },
      700: { value: '#7A1111' },
      800: { value: '#520808' },
    },
    black: {
      100: { value: '#F2F3F5' },
      200: { value: '#D9DBE1' },
      300: { value: '#B0B4BF' },
      400: { value: '#80869A' },
      500: { value: '#565B6E' },
      600: { value: '#353A49' },
      700: { value: '#22263A' },
      800: { value: '#13172A' },
    },
    white: {
      default: { value: '#FFFFFF' },
    },
  },
  spacing: {
    4: { value: '0.4rem' },
    8: { value: '0.8rem' },
    12: { value: '1.2rem' },
    16: { value: '1.6rem' },
    24: { value: '2.4rem' },
    32: { value: '3.2rem' },
    40: { value: '4rem' },
    48: { value: '4.8rem' },
    60: { value: '6rem' },
    80: { value: '8rem' },
    100: { value: '10rem' },
    120: { value: '12rem' },
  },
  radii: {
    4: { value: '0.4rem' },
    8: { value: '0.8rem' },
    16: { value: '1.6rem' },
    24: { value: '2.4rem' },
    40: { value: '4rem' },
    full: { value: '50%' },
  },
  fonts: {
    body: {
      value:
        '"Spoqa Han Sans Neo", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
  },
  fontWeights: {
    light: { value: 400 },
    normal: { value: 500 },
    bold: { value: 700 },
  },
  shadows: {
    xs: { value: '0 1px 2px 0 rgba(0,0,0,0.05)' },
    sm: {
      value: '0 1px 3px 0 rgba(0,0,0,0.10), 0 1px 2px -1px rgba(0,0,0,0.10)',
    },
    md: {
      value: '0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.10)',
    },
    lg: {
      value:
        '0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10)',
    },
    xl: {
      value:
        '0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.10)',
    },
    inner: { value: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)' },
  },
  fontSizes: {
    heading: {
      'display-heading': { value: '3.2rem' },
      'heading-1': { value: '2.4rem' },
      'heading-2': { value: '1.8rem' },
      'heading-3': { value: '1.6rem' },
    },
    body: {
      xlarge: { value: '2.4rem' },
      large: { value: '1.8rem' },
      medium: { value: '1.6rem' },
      small: { value: '1.4rem' },
      xsmall: { value: '1.2rem' },
    },
    button: {
      large: { value: '1.8rem' },
      medium: { value: '1.6rem' },
      small: { value: '1.4rem' },
    },
    input: {
      medium: { value: '1.8rem' },
      small: { value: '1.6rem' },
      xsmall: { value: '1.4rem' },
    },
  },
};
