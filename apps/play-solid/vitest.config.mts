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
		},
	},
})
