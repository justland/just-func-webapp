import { createStore } from '@just-web/states'
import type { Doc } from './types'

export const store = createStore<{ docs: Doc[] }>({ docs: [] })
