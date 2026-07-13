# @utlogiclabs/ui

React component primitives styled against [`@utlogiclabs/theme`](../theme)'s Tailwind preset.

## Install

```bash
npm install @utlogiclabs/ui @utlogiclabs/theme react react-dom
```

`react`/`react-dom` are peer dependencies — install them yourself so your app doesn't end up with duplicate React copies.

Your project's `tailwind.config.js` must apply the theme preset and scan this package's compiled output, or none of the component classes will be generated:

```js
import preset from '@utlogiclabs/theme/tailwind-preset'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: [
    './src/**/*.{ts,tsx}',
    './index.html',
    './node_modules/@utlogiclabs/ui/dist/**/*.js',
  ],
}
```

## Components (v1 seed set)

- **Button** — `variant`: `primary` | `secondary` | `ghost` | `danger`; `size`: `sm` | `md` | `lg`
- **Card** — `variant`: `surface` | `outlined`
- **Nav** — `items: Array<{ label, href, isActive? }>`, optional `logoSlot`

```tsx
import { Button, Card, Nav } from '@utlogiclabs/ui'
```

## Storybook

```bash
npm run storybook
```

Storybook lives inside this package (`packages/ui/.storybook`) so `ui` is viewable and publishable standalone, without the CLI or any consumer app present.

## Build

```bash
npm run build
```

ESM output via `tsup`, with `react`/`react-dom` marked external so they're never bundled.
