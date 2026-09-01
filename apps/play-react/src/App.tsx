import { useStore } from '@just-web/react'
import { lazy, Suspense } from 'react'
import MainBackdrop from './components/MainBackdrop/MainBackdrop'
import MainContent from './components/MainContent/MainContent'
import { store } from './docViews/store'

const CommandPalette = lazy(() => import('@just-web/react-commands').then((m) => ({ default: m.CommandPalette })))

function App() {
	const [hasView] = useStore(store, (s) => s.views.length !== 0)

	return (
		<>
			<main className="bg-zinc-800 min-h-screen text-white">{hasView ? <MainContent /> : <MainBackdrop />}</main>
			<Suspense fallback={<div>Loading...</div>}>
				<CommandPalette />
			</Suspense>
		</>
	)
}

export default App
