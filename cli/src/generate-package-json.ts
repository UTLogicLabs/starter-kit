export interface GeneratedPackageJsonOptions {
  kebabName: string
}

export function generatePackageJson(options: GeneratedPackageJsonOptions) {
  const packageJson = {
    name: options.kebabName,
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      format: 'prettier --write .',
    },
    dependencies: {
      '@utlogiclabs/theme': '^0.1.0',
      '@utlogiclabs/brand-assets': '^0.1.0',
      '@utlogiclabs/ui': '^0.1.0',
      react: '^18.3.0',
      'react-dom': '^18.3.0',
    },
    devDependencies: {
      '@vitejs/plugin-react': '^4.3.0',
      autoprefixer: '^10.4.0',
      postcss: '^8.4.0',
      prettier: '^3.3.0',
      tailwindcss: '^3.4.0',
      typescript: '^5.5.0',
      vite: '^5.4.0',
    },
  }

  return JSON.stringify(packageJson, null, 2) + '\n'
}
