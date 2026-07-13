import type { Config } from 'tailwindcss'

export type ThemePreset = Pick<Config, 'theme' | 'plugins'>

export const preset: ThemePreset = {
  theme: {
    extend: {
      colors: {
        background: 'var(--utl-color-background)',
        surface: 'var(--utl-color-surface)',
        foreground: 'var(--utl-color-foreground)',
        border: 'var(--utl-color-border)',
        accent: {
          DEFAULT: 'var(--utl-color-accent)',
          foreground: 'var(--utl-color-accent-foreground)',
        },
        secondary: 'var(--utl-color-secondary)',
        danger: 'var(--utl-color-danger)',
      },
      fontFamily: {
        display: 'var(--utl-font-display)',
        body: 'var(--utl-font-body)',
      },
      fontWeight: {
        display: '700',
      },
    },
  },
  plugins: [],
}

export default preset
