export interface ColorScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

export interface CircuitBoardPalette {
  board: ColorScale
  copper: ColorScale
  silkscreen: ColorScale
  trace: ColorScale
  solderMask: ColorScale
  signalRed: ColorScale
}

export const palette: CircuitBoardPalette = {
  board: {
    50: '#eefbf3',
    100: '#d3f4e0',
    200: '#a3e8bf',
    300: '#6dd89a',
    400: '#3cbd76',
    500: '#1f9c5a',
    600: '#147a45',
    700: '#0f5c34',
    800: '#0c4529',
    900: '#082e1b',
    950: '#041a10',
  },
  copper: {
    50: '#fdf6e8',
    100: '#f9e8c2',
    200: '#f0cd7e',
    300: '#e5b04a',
    400: '#d99a2b',
    500: '#c1811d',
    600: '#a06416',
    700: '#7c4c13',
    800: '#5e3a12',
    900: '#402710',
    950: '#241408',
  },
  silkscreen: {
    50: '#ffffff',
    100: '#f5f7f6',
    200: '#e4e9e6',
    300: '#c9d2ce',
    400: '#a6b3ad',
    500: '#82938c',
    600: '#647267',
    700: '#4c5750',
    800: '#37403b',
    900: '#242a26',
    950: '#151815',
  },
  trace: {
    50: '#e8fbfb',
    100: '#c4f3f4',
    200: '#8ee5e8',
    300: '#54cfd4',
    400: '#28b0b8',
    500: '#178e96',
    600: '#106f76',
    700: '#0d565c',
    800: '#0b4145',
    900: '#082c2f',
    950: '#041a1c',
  },
  solderMask: {
    50: '#f2f4f3',
    100: '#dde2e0',
    200: '#b3bcb8',
    300: '#82908a',
    400: '#586660',
    500: '#3a4640',
    600: '#28322d',
    700: '#1c2420',
    800: '#131916',
    900: '#0b0f0d',
    950: '#050706',
  },
  signalRed: {
    50: '#fdece9',
    100: '#f9c9c1',
    200: '#f0918a',
    300: '#e35f5c',
    400: '#d13c3f',
    500: '#b02730',
    600: '#8c1c26',
    700: '#6b151d',
    800: '#4f1116',
    900: '#350c0f',
    950: '#1e0708',
  },
}

export const semanticTokens = {
  colorBackground: 'var(--utl-color-background)',
  colorSurface: 'var(--utl-color-surface)',
  colorForeground: 'var(--utl-color-foreground)',
  colorAccent: 'var(--utl-color-accent)',
  colorAccentForeground: 'var(--utl-color-accent-foreground)',
  colorSecondary: 'var(--utl-color-secondary)',
  colorDanger: 'var(--utl-color-danger)',
  colorBorder: 'var(--utl-color-border)',
} as const
