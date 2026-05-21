module.exports = {
  webpack(config) {
    // Allow ESM packages (like @just-web/*) that import 'react/jsx-runtime' without .js extension
    config.module.rules.unshift({
      test: /\.m?js/,
      resolve: { fullySpecified: false }
    })
    return config
  },
  jest(config) {
    config.transformIgnorePatterns = [
      '/node_modules/.pnpm/(?!(sentence-case|no-case)@)',
      '^.+\\.module\\.(css|sass|scss)$'
    ]
    const esModules = ['react-command-palette/dist/themes']
    esModules.forEach(m => config.moduleNameMapper[m] = 'identity-obj-proxy')
    config.watchPlugins = [
      'jest-watch-suspend',
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
      [
        'jest-watch-toggle-config', { 'setting': 'verbose' },
      ],
      [
        'jest-watch-toggle-config', { 'setting': 'collectCoverage' },
      ],
    ]
    config.setupFilesAfterEnv = ['<rootDir>/src/jest-setup.ts']
    return config
  }
}
