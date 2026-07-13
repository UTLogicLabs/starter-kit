# @utlogiclabs/theme

Framework-agnostic design tokens for UTLogicLabs projects: a circuit-board color scheme, Liberation Mono display type, a Tailwind v3 preset, and raw CSS custom properties for non-Tailwind consumers.

## Install

```bash
npm install @utlogiclabs/theme
```

## Usage

### Tailwind

```js
// tailwind.config.js
import preset from '@utlogiclabs/theme/tailwind-preset'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}'],
}
```

This adds `background`, `surface`, `foreground`, `border`, `accent` (+ `accent-foreground`), `secondary`, and `danger` colors, plus `font-display`/`font-body` font families, all backed by CSS custom properties.

### Raw CSS (no Tailwind)

```css
@import '@utlogiclabs/theme/css';
```

Exposes `--utl-color-*` custom properties directly.

### Retheming without a rebuild

Every color resolves through CSS variables — most importantly `--utl-color-accent`. Override it in your own app CSS, loaded *after* `@utlogiclabs/theme/css`:

```css
:root {
  --utl-color-accent: #ff6b35;
}
```

No package rebuild or republish needed — this is a plain CSS cascade override. Alternatively, apply one of the built-in preset swatches via a `data-theme` attribute:

```html
<html data-theme="trace">
```

Supported values: `copper` (default), `trace`, `signal-red`.

### JS/TS tokens

```ts
import { palette, semanticTokens, fontDisplay, fontBody } from '@utlogiclabs/theme'
```

`palette` exposes the raw 50–950 color scales (`board`, `copper`, `silkscreen`, `trace`, `solderMask`, `signalRed`) if you need to build on the primitives directly, though components should prefer the semantic tokens/CSS variables.

## Notes

- `tailwindcss` is an optional peer dependency — install it yourself if you use the Tailwind preset; the raw CSS export works without it.
- The "Liberation Mono Bold as display font" requirement is interpreted as headings/display text in the mono face at `font-weight: 700`, with a humanist sans (`Inter`) for body copy. Flag any change here as a design decision, not a bug fix.
