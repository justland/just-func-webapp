import { Context } from '@just-web/contexts'
import { Adder, createStore, push, Store, withAdder } from '@just-web/states'

export interface PluginModule {
  activate(context: Context): void | Promise<void>
}

export interface PluginsContext {
  addPlugin(plugin: PluginModule): void
}

export interface ReadonlyPluginsContext {

}

export interface PluginsContextOptions {
  context: Context
}

let plugins: Store<PluginModule[]> & {
  add: Adder<PluginModule>
}

const loading: Array<Promise<void> | void> = []

export function createPluginsContext(options: PluginsContextOptions): PluginsContext {
  plugins = withAdder(createStore<PluginModule[]>([]), push)
  return {
    addPlugin(plugin: PluginModule) {
      plugins.add(plugin)
      loading.push(plugin.activate(options.context))
    },
  }
}

export function start() {
  return {
    loadingPlugins: Promise.all(loading)
  }
}