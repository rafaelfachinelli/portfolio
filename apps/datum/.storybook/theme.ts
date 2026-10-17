import { create } from 'storybook/theming'

// The Storybook chrome itself wears Datum: dark board, drafting line, sharp corners.
export const datumTheme = create({
  base: 'dark',
  brandTitle: 'Datum · Rafael Fachinelli',
  brandUrl: 'https://rafaelfachinelli.com',
  brandImage: '/datum-wordmark.svg',
  brandTarget: '_blank',

  colorPrimary: '#38bdf8',
  colorSecondary: '#38bdf8',

  appBg: '#050c20',
  appContentBg: '#071027',
  appPreviewBg: '#071027',
  appBorderColor: 'rgba(125, 211, 252, 0.2)',
  appBorderRadius: 2,

  fontBase: '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif',
  fontCode: '"IBM Plex Mono", ui-monospace, monospace',

  textColor: '#e6edf8',
  textInverseColor: '#071027',
  textMutedColor: '#a3b3cc',

  barTextColor: '#a3b3cc',
  barSelectedColor: '#38bdf8',
  barHoverColor: '#7dd3fc',
  barBg: '#0a1530',

  inputBg: '#0e1b3b',
  inputBorder: 'rgba(125, 211, 252, 0.32)',
  inputTextColor: '#e6edf8',
  inputBorderRadius: 2,
})
