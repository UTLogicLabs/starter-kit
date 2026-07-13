import { execFile } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { promisify } from 'node:util'
import { generateBrandAssets } from '@utlogiclabs/brand-assets'
import { parseCliArgs } from './args.js'
import {
  editorconfigContent,
  generateGlobalsCss,
  prettierrcContent,
  tailwindConfigContent,
} from './generate-config-files.js'
import { generatePackageJson } from './generate-package-json.js'
import { logPlan, logStep } from './logger.js'
import { promptForAnswers } from './prompts.js'

const execFileAsync = promisify(execFile)

function toKebabCase(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function run(argv: Array<string>) {
  const args = parseCliArgs(argv)
  const answers = await promptForAnswers(args.projectName)

  const kebabName = toKebabCase(answers.name)
  const targetDir = resolve(process.cwd(), kebabName)

  const packageJsonContent = generatePackageJson({ kebabName })
  const globalsCssContent = generateGlobalsCss({ accentColor: answers.accentColor })

  if (args.dryRun) {
    logPlan(`Would create directory: ${targetDir}/`)
    logPlan(`Would write: ${join(targetDir, 'package.json')}`)
    logPlan(`Would write: ${join(targetDir, '.prettierrc')}`)
    logPlan(`Would write: ${join(targetDir, '.editorconfig')}`)
    logPlan(`Would write: ${join(targetDir, 'tailwind.config.js')}`)
    logPlan(`Would write: ${join(targetDir, 'src/globals.css')}`)

    const brandAssets = await generateBrandAssets({
      name: answers.name,
      outDir: join(targetDir, 'public'),
      dryRun: true,
    })
    for (const asset of brandAssets) {
      logPlan(`Would write: ${asset.outputPath} (${asset.bytesWritten} bytes)`)
    }

    logPlan('Would run: npm install (skipped in dry-run)')
    return
  }

  await mkdir(targetDir, { recursive: true })
  await mkdir(join(targetDir, 'src'), { recursive: true })

  await writeFile(join(targetDir, 'package.json'), packageJsonContent, 'utf-8')
  await writeFile(join(targetDir, '.prettierrc'), prettierrcContent, 'utf-8')
  await writeFile(join(targetDir, '.editorconfig'), editorconfigContent, 'utf-8')
  await writeFile(join(targetDir, 'tailwind.config.js'), tailwindConfigContent, 'utf-8')
  await writeFile(join(targetDir, 'src', 'globals.css'), globalsCssContent, 'utf-8')

  await generateBrandAssets({
    name: answers.name,
    outDir: join(targetDir, 'public'),
  })

  logStep(`Created project at ${targetDir}`)

  if (!args.skipInstall) {
    logStep('Installing dependencies...')
    await execFileAsync('npm', ['install'], { cwd: targetDir })
    logStep('Dependencies installed.')
  } else {
    logStep('Skipped npm install (--skip-install). Run `npm install` inside the project when ready.')
  }

  logStep(`\nDone! Next steps:\n  cd ${kebabName}\n  npm run dev`)
}
