import { JustApp } from '@just-web/app'
import { BrowserGizmo } from '@just-web/browser'
import { CommandsGizmo } from '@just-web/commands'
import { KeyboardGizmo } from '@just-web/keyboard'
import { OSGizmo } from '@just-web/os'
import { RoutesGizmo } from '@just-web/routes'
import { createStore, Store } from '@just-web/states'

export type App = JustApp & KeyboardGizmo & OSGizmo & BrowserGizmo & CommandsGizmo & RoutesGizmo

export interface AppStore<A = App> {
  app: A
}

let s: Store<AppStore<any>>

export function createAppStore<A extends App = App>(app: A) {
  return s = createStore<AppStore<A>>({ app })
}

export function getStore<A extends App = App>() {
  return s as Store<AppStore<A>>
}

export function getStoreValue<A extends App = App>() {
  return s.get() as AppStore<A>
}
