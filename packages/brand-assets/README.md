# @utlogiclabs/brand-assets

Brand assets (circuit-board wordmark, favicon) and a templating helper for generating per-project branding files.

## Install

```bash
npm install @utlogiclabs/brand-assets
```

## Usage

```ts
import { generateBrandAssets } from '@utlogiclabs/brand-assets'

const generated = await generateBrandAssets({
  name: 'my-project',
  outDir: './public',
})
```

Writes a `wordmark.svg` (with `{{PROJECT_NAME}}` templated to `my-project`) and a static `favicon.svg` into `outDir`, and returns an array describing each written file:

```ts
interface GeneratedAsset {
  filename: string
  outputPath: string
  bytesWritten: number
}
```

### Dry run

```ts
await generateBrandAssets({ name: 'my-project', outDir: './public', dryRun: true })
```

Skips all filesystem writes and returns the same `GeneratedAsset[]` shape, computed from in-memory buffer sizes — useful for CLI `--dry-run` flows.

`generateBrandAssets` is a direct function export meant to be imported and called in-process (e.g. from `create-utlogiclabs-app`) — it never spawns a subprocess.

## v1 limitation

Only an SVG favicon ships in v1 (`favicon.svg`) — no rasterized PNG favicon or Apple touch icon. Modern browsers support SVG favicons; older Safari/iOS home-screen icons won't pick this up. Adding PNG rasterization was deferred to avoid a native image-processing dependency (e.g. `sharp`) in a package whose only other job is templating a text string into an SVG.
