import { definePlugin } from '@just-web/types'
import { isType } from 'type-plus'
import { startKeyBindings } from './keyBindings'

export default definePlugin(() => ({
  name: '@just-web/browser-contributions',
  init(ctx: startKeyBindings.Param) {
    ctx.log.notice('init')
    return [undefined, ctx]
  },
  async start(ctx) {
    ctx.log.notice('start')
    if (isType<startKeyBindings.Param>(ctx, ctx => !!ctx.contributions)) {
      startKeyBindings(ctx)
    }
  }
}))
