module.exports = {
  webpack(config) {
    // console.info(config)
    return config
  },
  jest(config) {
    config.transformIgnorePatterns = [
      '/node_modules/(?!(sentence-case)/)',
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
