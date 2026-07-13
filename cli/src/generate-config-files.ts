export const prettierrcContent = JSON.stringify(
  { semi: false, useTabs: false, singleQuote: true },
  null,
  2,
) + '\n'

export const editorconfigContent = `root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
`

export const tailwindConfigContent = `import preset from '@utlogiclabs/theme/tailwind-preset'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: [
    './src/**/*.{ts,tsx}',
    './index.html',
    './node_modules/@utlogiclabs/ui/dist/**/*.js',
  ],
}
`

export interface GlobalsCssOptions {
  accentColor: string
}

export function generateGlobalsCss(options: GlobalsCssOptions) {
  return `@import '@utlogiclabs/theme/css';

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --utl-color-accent: ${options.accentColor};
}
`
}
