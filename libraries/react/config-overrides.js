module.exports = {
  jest(config) {
    // config.roots = ['<rootDir>/ts']
    config.testMatch = [
      '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
    ]
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
    return config
  }
}
