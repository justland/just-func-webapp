import { CommandsContext } from '@just-web/commands'
import { LogContext } from '@just-web/log'
import { createStore } from '@just-web/states'
import { definePlugin } from '@just-web/types'
import { setStore, State } from './store'

export * from './CommandPalette'

export default definePlugin({
  init: async (context: LogContext & CommandsContext) => {
    const log = context.log.getLogger('@just-web/react-commands')
    log.notice('activate')
    const store = setStore(createStore<State>({
      context,
      log,
      openCommandPalette: false
    }))
    context.commands.register(
      'just-web.showCommandPalette',
      () => store.update(s => { s.openCommandPalette = true })
    )
  }
})

export async function activate(context: LogContext & CommandsContext) {
  const log = context.log.getLogger('@just-web/react-commands')
  log.notice('activate')
  const store = setStore(createStore<State>({
    context,
    log,
    openCommandPalette: false
  }))
  context.commands.register(
    'just-web.showCommandPalette',
    () => store.update(s => { s.openCommandPalette = true })
  )
}
