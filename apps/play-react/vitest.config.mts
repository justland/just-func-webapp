import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/vitest-setup.ts'],
		include: ['src/**/?(*.)+(spec|test|integrate|accept|system|unit).[jt]s?(x)'],
		coverage: {
			provider: 'v8',
			include: ['src/**/*.{ts,tsx}'],
			reporter: ['text', 'lcov', 'clover', 'json'],
			// A ratchet, not a target. Set to the level the suite already
			// reaches so a regression fails the `coverage` task instead of
			// only being printed. Raise these as tests are added; the gap
			// between these numbers and 100 is real and unfilled.
			thresholds: {
				statements: 29,
				branches: 55,
				functions: 22,
				lines: 31,
			},
		},
	},
})
