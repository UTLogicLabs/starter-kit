# UTLogicLabs Starter Kit — Project Spec

## Purpose
A monorepo of npm packages + a scaffolding CLI so every new UTLogicLabs project (portfolio or client) starts with consistent branding, theme tokens, and a React component library — instead of re-copying config per project.

## Architecture Decisions (locked)
- **Framework-agnostic core.** `theme` and `brand-assets` have zero framework coupling. `ui` is React-only (Storybook implies React; this is an accepted, explicit exception, not a leak).
- **npm-published packages**, not copy-in-place templates. Consumers `npm install` the packages; updates flow via semver, not manual diffing.
- **Backend-agnostic.** No Cloudflare/D1/Turnstile in v1. That becomes an optional add-on later (`--with-cf-worker` flag or separate package), not baked into core.
- **Native ESM only** across all packages — `"type": "module"`, no CJS interop shims.
- **Monorepo tooling:** npm or pnpm workspaces. No Turborepo yet — not enough packages to justify it.
- **Versioning:** manual `npm publish` per package for v1. No changesets automation yet (documented as deferred, not forgotten).

## Package Structure
```
starter-kit/           (monorepo root)
├── packages/
│   ├── theme/                 → @utlogiclabs/theme
│   ├── brand-assets/          → @utlogiclabs/brand-assets
│   └── ui/                    → @utlogiclabs/ui
├── cli/                       → create-utlogiclabs-app
└── package.json                (workspaces root)
```

### `@utlogiclabs/theme`
- Exports a Tailwind preset (`presets: [...]`) AND raw CSS custom properties, so non-Tailwind consumers can still use tokens.
- Circuit-board color scheme + Liberation Mono Bold as the display font, extracted as tokens (no hardcoded hex anywhere downstream).
- `accentColor` override mechanism via CSS var reassignment — must NOT require a rebuild of the package to retheme a consumer project.
- Build target: ESM only.

### `@utlogiclabs/brand-assets`
- SVG logo (circuit-board wordmark), favicon, Apple touch icon.
- Wordmark SVG contains a `{{PROJECT_NAME}}` placeholder text node.
- Exports a small templating helper: `generateBrandAssets({ name, outDir })` — a direct function export, not a CLI-only script, so the main CLI can import and call it in-process (no subprocess spawn).
- Build target: ESM only.

### `@utlogiclabs/ui`
- React component primitives styled against `@utlogiclabs/theme`'s Tailwind preset: `Button`, `Card`, `Nav` at minimum (seed set — don't over-build v1).
- Storybook lives inside this package (`packages/ui/.storybook`), not at monorepo root — `ui` must be viewable/publishable standalone without the CLI or any consumer app present.
- `react` / `react-dom` as `peerDependencies`, not bundled dependencies — avoid duplicate React copies in consumer apps.
- Build target: ESM only.

### `create-utlogiclabs-app` (CLI)
- Invoked via `npx create-utlogiclabs-app <project-name>`.
- Prompts: project name, accent color (hex or preset swatch choice).
- Prompt library: keep minimal-dependency — consider raw `node:readline`/`node:util.parseArgs` before reaching for a prompt library, consistent with avoiding unnecessary deps.
- Generates a **minimal consumer `package.json`** declaring the three `@utlogiclabs/*` packages as dependencies — CLI does NOT copy a template file tree, it scaffolds a thin project that installs the real packages.
- Calls `@utlogiclabs/brand-assets`' `generateBrandAssets()` directly (in-process import) to template SVGs into the new project's `public/` (or equivalent) dir.
- Writes a `.prettierrc` (`{ semi: false, useTabs: false, singleQuote: true }`) and matching `.editorconfig` into the generated project.
- Runs `npm install` at the end by default; supports `--skip-install`.
- Supports `--dry-run`: prints what would be generated/written without touching disk.

## Open Items / Blockers to Resolve Early
1. **`@utlogiclabs` npm scope availability.** Scoped packages need either a registered paid npm org or public-scoped packages. Check/register this before wiring up any `npm publish` step — this blocks the whole publishing flow if unresolved.
2. **Cross-package versioning.** `ui` depends on `theme`. Decide now: does `ui` pin an exact version of `theme`, or use `^` range? A token rename in `theme` is a breaking change for `ui` either way — pick a policy before the first breaking change happens, not after.
3. **Storybook config placement** — confirmed inside `packages/ui`. Note this if any future infra/add-on package wants to share Storybook config; it currently doesn't, so no sharing mechanism needed yet.

## v1 Scope (explicit)
In scope:
- Theme package + brand-assets package + ui package + Storybook + CLI.

Deferred to v2 (do not build now):
- Cloudflare Worker + D1 + Turnstile module.
- CI pipeline (GitHub Actions) in generated projects.
- ADR-style docs explaining stack choices.
- Changesets/automated release flow.

## Suggested Build Order (for Claude Code sessions)
1. Scaffold monorepo root (`package.json` with workspaces, base `tsconfig.json`, `.prettierrc`).
2. Build `@utlogiclabs/theme` (tokens + Tailwind preset) — no dependents yet, easiest to get right in isolation.
3. Build `@utlogiclabs/brand-assets` (SVG templating + `generateBrandAssets` export) — independent of theme.
4. Build `@utlogiclabs/ui` against `theme` (Button, Card, Nav) + Storybook config.
5. Build the CLI last, since it's the integration point that imports `brand-assets` and declares dependencies on `theme`/`ui`.
6. Manually verify end-to-end: run the CLI against a scratch directory, confirm generated project installs and renders themed components.

## Style/Conventions to Apply Throughout
- Function declarations over function expressions.
- `useTernary ? 'x' : null` over `condition && 'x'`, especially in JSX.
- Descriptive TypeScript type names (no single-letter generics); `Array<T>` generic syntax over `T[]`.
- Rely on TypeScript inference — no explicit return types unless genuinely necessary.
- Native `fetch`, avoid axios/unneeded deps in general.