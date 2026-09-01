import { createStore } from '@just-web/states'
import type { View } from './types'

export const store = createStore<{ views: View[] }>({ views: [] })
