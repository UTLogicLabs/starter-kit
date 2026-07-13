# UTLogicLabs Starter Kit

A monorepo of npm packages + a scaffolding CLI so every new UTLogicLabs project (portfolio or client) starts with consistent branding, theme tokens, and a React component library — instead of re-copying config per project.

See [SPEC.md](./SPEC.md) for the full architecture spec and design decisions.

## Packages

| Package | Description |
| --- | --- |
| [`@utlogiclabs/theme`](./packages/theme) | Circuit-board color tokens, Tailwind v3 preset, CSS custom properties |
| [`@utlogiclabs/brand-assets`](./packages/brand-assets) | Wordmark/favicon templating, `generateBrandAssets()` |
| [`@utlogiclabs/ui`](./packages/ui) | React component primitives (Button, Card, Nav) + Storybook |
| [`create-utlogiclabs-app`](./cli) | Scaffolding CLI: `npx create-utlogiclabs-app <name>` |

## Getting started (this repo)

```bash
npm install
npm run build       # builds theme -> brand-assets -> ui -> cli, in order
npm run typecheck
npm run dev:ui       # Storybook for @utlogiclabs/ui
```

## Scaffolding a new project

```bash
npx create-utlogiclabs-app my-project
```

Prompts for a project name and accent color, generates a minimal `package.json` declaring the three `@utlogiclabs/*` packages as dependencies, templates in brand assets, and runs `npm install`.

Flags:
- `--skip-install` — generate files without running `npm install`
- `--dry-run` — print what would be generated without touching disk

## Retheming without a rebuild

Every component reads color from a single CSS custom property, `--utl-color-accent`. Override it in your own app CSS, loaded after `@utlogiclabs/theme/css`:

```css
:root {
  --utl-color-accent: #ff6b35;
}
```

No `theme` package rebuild or republish required.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT — see [LICENSE](./LICENSE).
