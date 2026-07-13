import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const assetsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets')

export interface GenerateBrandAssetsOptions {
  name: string
  outDir: string
  dryRun?: boolean
}

export interface GeneratedAsset {
  filename: string
  outputPath: string
  bytesWritten: number
}

async function buildWordmark(name: string) {
  const template = await readFile(join(assetsDir, 'wordmark.template.svg'), 'utf-8')
  return template.replaceAll('{{PROJECT_NAME}}', name)
}

export async function generateBrandAssets(
  options: GenerateBrandAssetsOptions,
): Promise<Array<GeneratedAsset>> {
  const { name, outDir, dryRun = false } = options

  const wordmarkSvg = await buildWordmark(name)
  const faviconSvg = await readFile(join(assetsDir, 'favicon.svg'), 'utf-8')

  const files = [
    { filename: 'wordmark.svg', content: wordmarkSvg },
    { filename: 'favicon.svg', content: faviconSvg },
  ]

  if (!dryRun) {
    await mkdir(outDir, { recursive: true })
  }

  const generated: Array<GeneratedAsset> = []
  for (const file of files) {
    const outputPath = join(outDir, file.filename)
    const bytesWritten = Buffer.byteLength(file.content, 'utf-8')
    if (!dryRun) {
      await writeFile(outputPath, file.content, 'utf-8')
    }
    generated.push({ filename: file.filename, outputPath, bytesWritten })
  }

  return generated
}
