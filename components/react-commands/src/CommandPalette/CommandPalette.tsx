import type { CommandContribution, Context, KeyBindingContribution } from '@just-web/app'
import { formatCommand, formatKeyBinding } from '@just-web/app'
import { useStore } from '@just-web/react'
import { VFC } from 'react'
import CP from 'react-command-palette'
import theme from 'react-command-palette/dist/themes/atom-theme'
import { required } from 'type-plus'
import { getStore } from '../store'
import styles from './CommandPalette.module.css'

export type CommandPaletteCommand = CommandContribution & KeyBindingContribution

export interface CommandPaletteProps {
  ctx?: Context
}

function getCommands(ctx: Context) {
  const cmds = ctx.contributions.commands.get()
  const kbs = ctx.contributions.keyBindings.get()
  return Object.values(cmds)
    .filter(c => c.commandPalette !== false)
    .map(c => {
      const r = {
        ...c,
        name: formatCommand(c).name,
        command: () => ctx.commands.invoke(c.command)
      }
      const k = kbs[c.command]
      return k ? { ...r, key: formatKeyBinding(k).key } : r
    })
}

const RenderCommand: VFC<{ name: string, key?: string }> = command => (
  <div className={styles.suggestion}>
    <span className={styles.name}>{command.name}</span>
    {command.key && <span className={styles.key}>{command.key}</span>}
  </div>
)

const CommandPalette: VFC<CommandPaletteProps> = (props) => {
  const store = getStore()
  const [open, setOpen] = useStore(store, s => s.openCommandPalette, s => { s.openCommandPalette = open })

  const commands = open ? getCommands(required(store.get().context, props.ctx)) : []

  const onRequestClose = () => setOpen(false)

  return <CP
    commands={commands}
    closeOnSelect={true}
    open={open}
    theme={{ ...theme, trigger: styles.trigger }}
    onRequestClose={onRequestClose}
    renderCommand={RenderCommand}
  />
}

export default CommandPalette
