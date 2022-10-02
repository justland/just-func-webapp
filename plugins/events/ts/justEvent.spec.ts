import logPlugin from '@just-web/log'
import eventsPlugin, { justEvent } from '.'

it('can create just event', () => {
  const addEvent = justEvent('add')
  const [ctx] = logPlugin.initForTest()
  const [{ emitter }] = eventsPlugin.init(ctx)

  let called = false
  addEvent.listenTo(emitter, () => called = true)
  addEvent.emitBy(emitter)

  expect(called).toBe(true)
})