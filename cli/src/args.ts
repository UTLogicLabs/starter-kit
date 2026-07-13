import { parseArgs } from 'node:util'

export interface CliArgs {
  projectName?: string
  skipInstall: boolean
  dryRun: boolean
}

export function parseCliArgs(argv: Array<string>): CliArgs {
  const { values, positionals } = parseArgs({
    args: argv,
    options: {
      'skip-install': { type: 'boolean', default: false },
      'dry-run': { type: 'boolean', default: false },
    },
    allowPositionals: true,
  })

  return {
    projectName: positionals[0],
    skipInstall: values['skip-install'] ?? false,
    dryRun: values['dry-run'] ?? false,
  }
}
