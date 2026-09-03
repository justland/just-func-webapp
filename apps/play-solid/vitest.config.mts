import solidPlugin from 'vite-plugin-solid'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [solidPlugin()],
	resolve: {
		conditions: ['development', 'browser'],
	},
	test: {
		globals: true,
		environment: 'jsdom',
		// vite-plugin-solid injects a jest-dom setup file when this is empty, and
		// under pnpm's strict layout it picks an entry point the app cannot resolve.
		setupFiles: ['@testing-library/jest-dom/vitest'],
		include: ['**/?(*.)+(spec|test|integrate|accept|system|unit).[jt]s?(x)'],
		coverage: {
			provider: 'v8',
			include: ['ts/**/*.{ts,tsx}'],
			reporter: ['text', 'lcov', 'clover', 'json'],
			// A ratchet, not a target. Set to the level the suite already
			// reaches so a regression fails the `coverage` task instead of
			// only being printed. `functions` is omitted deliberately: the
			// single spec exercises no function in `ts/`, so the honest
			// floor is 0 and a 0 threshold would assert nothing.
			thresholds: {
				statements: 11,
				branches: 12,
				lines: 18,
			},
		},
	},
})
