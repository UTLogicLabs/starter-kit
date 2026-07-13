import preset from '@utlogiclabs/theme/tailwind-preset'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
}
