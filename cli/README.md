# create-utlogiclabs-app

Scaffolding CLI for new UTLogicLabs projects — generates a thin consumer project that depends on `@utlogiclabs/theme`, `@utlogiclabs/brand-assets`, and `@utlogiclabs/ui`, instead of copying a template file tree.

## Usage

```bash
npx create-utlogiclabs-app <project-name>
```

Prompts for:
- **Project name** (skipped if passed positionally)
- **Accent color** — a hex value (e.g. `#ff6b35`) or one of the preset swatches: `copper` (default), `trace`, `signal-red`

### Flags

| Flag | Effect |
| --- | --- |
| `--skip-install` | Generate files but don't run `npm install` |
| `--dry-run` | Print every file that would be written, touch nothing on disk, skip install |

## What it generates

```
<project-name>/
├── package.json           (@utlogiclabs/* deps at ^0.1.0, react/react-dom, vite/tailwind devDeps)
├── .prettierrc            ({ semi: false, useTabs: false, singleQuote: true })
├── .editorconfig
├── tailwind.config.js     (presets the @utlogiclabs/theme Tailwind preset)
├── src/globals.css        (imports @utlogiclabs/theme/css + your accent override)
└── public/
    ├── wordmark.svg       (templated with your project name)
    └── favicon.svg
```

Brand assets are generated via an in-process import of `@utlogiclabs/brand-assets`' `generateBrandAssets()` — no subprocess spawn. `npm install` (unless `--skip-install`) is the CLI's one legitimate subprocess call.

## Build

```bash
npm run build
```

`tsup` emits a single ESM entrypoint with a `#!/usr/bin/env node` shebang banner (no `.d.ts` — a CLI binary has no public type surface to publish).
