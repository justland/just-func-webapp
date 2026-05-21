import { lazy } from 'react'

// lazyImport was removed from @just-web/react in v9
export function lazyImport<M extends Record<string, any>, K extends keyof M>(
	importPlugin: Promise<M>,
	key: K,
	extendPlugin: (m: M['default']) => any
) {
	let cached: Promise<[M, any]> | undefined

	function cachedExtendingApp() {
		return cached ? cached : (cached = extendingApp())
	}

	async function extendingApp() {
		const m = await importPlugin
		const extendedApp = extendPlugin(m.default)
		await extendedApp.start()
		return [m, extendedApp] as [M, any]
	}

	const Component = lazy(async () => {
		const [m] = await cachedExtendingApp()
		return { default: m[key] as any }
	})

	return {
		[key]: Component,
		getExtendingApp: () => cachedExtendingApp().then(([, extendedApp]) => extendedApp)
	} as { [P in K]: typeof Component } & { getExtendingApp: () => Promise<any> }
}
