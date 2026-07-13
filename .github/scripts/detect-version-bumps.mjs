import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const packages = [
  { name: 'theme', dir: 'packages/theme' },
  { name: 'brand-assets', dir: 'packages/brand-assets' },
  { name: 'ui', dir: 'packages/ui' },
  { name: 'cli', dir: 'cli' },
]

function readVersionFromWorkingTree(dir) {
  const packageJson = JSON.parse(readFileSync(`${dir}/package.json`, 'utf-8'))
  return packageJson.version
}

function readVersionFromPreviousCommit(dir) {
  try {
    const raw = execFileSync('git', ['show', `HEAD^:${dir}/package.json`], {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    return JSON.parse(raw).version
  } catch {
    return null
  }
}

const bumped = []
for (const pkg of packages) {
  const currentVersion = readVersionFromWorkingTree(pkg.dir)
  const previousVersion = readVersionFromPreviousCommit(pkg.dir)
  if (currentVersion !== previousVersion) {
    bumped.push({ ...pkg, version: currentVersion })
  }
}

console.log(JSON.stringify(bumped))
