import { run } from './run.js'

run(process.argv.slice(2)).catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
