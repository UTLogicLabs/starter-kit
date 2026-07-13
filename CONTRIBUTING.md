# Contributing

## Setup

```bash
npm install
npm run build
```

Packages must build in dependency order (`theme` → `brand-assets` → `ui` → `cli`); `npm run build` at the root does this for you. If you change `theme` or `brand-assets`, rebuild them before working on `ui` or the CLI, since those consume built `dist/` output, not source.

## Conventions

- TypeScript throughout, native ESM only (`"type": "module"`, no CJS shims).
- Function declarations over function expressions.
- Ternaries (`condition ? 'x' : null`) over `&&` in JSX.
- Descriptive TypeScript type names; `Array<T>` generic syntax over `T[]`.
- Rely on TypeScript inference — no explicit return types unless genuinely necessary.
- Native `fetch`; avoid axios or other unneeded dependencies in general.
- Format with Prettier (`{ semi: false, useTabs: false, singleQuote: true }`) before committing: `npm run format`.

## Working on a single package

```bash
npm run typecheck -w @utlogiclabs/theme
npm run build -w @utlogiclabs/theme
```

## Storybook (`ui`)

```bash
npm run dev:ui
```

Stories live next to their components (`packages/ui/src/components/<Name>/<Name>.stories.tsx`).

## Testing the CLI end-to-end

The `@utlogiclabs/*` packages aren't resolvable from the npm registry inside a scratch project unless they've been published. To test CLI changes against real installs without publishing:

```bash
npm run build
mkdir -p /tmp/utl-tarballs
for pkg in packages/theme packages/brand-assets packages/ui; do
  (cd "$pkg" && npm pack --pack-destination /tmp/utl-tarballs)
done
node cli/dist/index.js scratch-app --dry-run   # sanity check first
node cli/dist/index.js scratch-app --skip-install
# then point scratch-app/package.json's @utlogiclabs/* deps at the tarballs
# in /tmp/utl-tarballs before running npm install inside scratch-app
```

## Publishing

Manual per-package publishing for v1 (no changesets automation yet), driven by a tag-triggered GitHub Actions workflow (`.github/workflows/publish.yml`) — no local `npm publish` needed.

To release a package:

1. Bump its `version` in `<package-dir>/package.json` and commit.
2. Tag and push using the pattern `<package>-v<version>`:
   ```bash
   git tag theme-v0.1.1
   git push origin theme-v0.1.1
   ```
   Valid prefixes: `theme-v*`, `brand-assets-v*`, `ui-v*`, `cli-v*` (for `cli/`, published as `create-utlogiclabs-app`).
3. The workflow builds all packages, verifies the tag version matches `package.json`, and runs `npm publish --access public` for just that package directory.

**One-time setup**: add an `NPM_TOKEN` (an npm automation/publish token) as a repository secret in GitHub before the first tag push — the workflow authenticates via `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}` and will fail without it.

`ui` depends on `theme` via a caret range (`^0.1.0`). A token rename in `theme` is a semver-major change — bump `theme`'s major version, then update `ui`'s dependency range and release a new `ui` version too if the rename affects `ui`'s own Tailwind class usage.
