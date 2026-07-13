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

Manual per-package version bumps for v1 (no changesets automation yet), but tagging and publishing are automatic once a bump lands on `master`.

To release a package:

1. Bump its `version` in `<package-dir>/package.json` (e.g. `packages/theme/package.json`) on a branch, and merge/push that change to `master`.
2. `.github/workflows/release.yml` runs on the push to `master`, diffs every package's `package.json` version against the previous commit via `.github/scripts/detect-version-bumps.mjs`, and for each package whose version changed:
   - creates and pushes a `<name>-v<version>` tag (`theme`, `brand-assets`, `ui`, or `cli` — `cli` publishes as `create-utlogiclabs-app`)
   - builds all packages and runs `npm publish --access public` for that package directory, in the same job

No manual tagging or `npm publish` needed for normal releases. `.github/workflows/publish.yml` (triggered by pushing a `<name>-v<version>` tag by hand) still exists as a fallback for one-off republishes, since GitHub Actions doesn't let a workflow's own tag pushes re-trigger other workflows.

**One-time setup**: add an `NPM_TOKEN` (an npm automation/publish token) as a repository secret in GitHub — both `release.yml` and `publish.yml` authenticate via `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}` and will fail without it.

`ui` depends on `theme` via a caret range (`^0.1.0`). A token rename in `theme` is a semver-major change — bump `theme`'s major version, then update `ui`'s dependency range and release a new `ui` version too if the rename affects `ui`'s own Tailwind class usage.
