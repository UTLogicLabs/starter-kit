import { createInterface } from 'node:readline/promises'

export interface ProjectAnswers {
  name: string
  accentColor: string
}

const presetSwatches: Record<string, string> = {
  copper: '#c1811d',
  trace: '#178e96',
  'signal-red': '#b02730',
}

const hexPattern = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

export async function promptForAnswers(argsProjectName?: string): Promise<ProjectAnswers> {
  const rl = createInterface({ input: process.stdin, output: process.stdout })

  try {
    const name = argsProjectName ?? (await rl.question('Project name: '))

    let accentColor: string | undefined
    while (accentColor === undefined) {
      const accentInput = await rl.question(
        'Accent color (hex like #ff6b35, or one of copper/trace/signal-red) [copper]: ',
      )
      const trimmed = accentInput.trim().toLowerCase()

      if (trimmed === '') {
        accentColor = presetSwatches.copper
      } else if (presetSwatches[trimmed]) {
        accentColor = presetSwatches[trimmed]
      } else if (hexPattern.test(trimmed)) {
        accentColor = trimmed
      } else {
        console.log('Please enter a valid hex color or one of: copper, trace, signal-red')
      }
    }

    return { name, accentColor }
  } finally {
    rl.close()
  }
}
