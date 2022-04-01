import { createState, OnStateChange, ResetState, SetState } from './state'

export interface Store<T> {
  get(): T,
  set: SetState<T>,
  onChange: OnStateChange<T>,
  reset: ResetState
}

/**
 * creates a object style store to track a value and its changes.
 */
export function createStore<T>(value: T): Store<T> {
  const state = createState(value)
  const [, set, onChange, reset] = state
  onChange(v => state[0] = v)
  return {
    get() { return state[0] },
    set,
    onChange,
    reset
  }
}
