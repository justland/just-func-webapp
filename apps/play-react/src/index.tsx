import { justApp } from '@just-web/app'
import { browserGizmoFn } from '@just-web/browser'
import { browserKeyboardGizmo } from '@just-web/browser-keyboard'
import { commandsGizmoFn } from '@just-web/commands'
import { keyboardGizmoFn } from '@just-web/keyboard'
import { logLevels } from '@just-web/log'
import { osGizmo } from '@just-web/os'
import { routesGizmo } from '@just-web/routes'
import React from 'react'
import ReactDOM from 'react-dom'
import { createColorLogReporter } from 'standard-log-color'
import App from './App'
import { createDocument } from './docs/createDocument'
import { createDocView } from './docViews/createDocView'
import reportWebVitals from './reportWebVitals'
import { createAppStore } from './store'
import './styles.css'

void (async () => {
  const reporter = createColorLogReporter()
  const app = await justApp({
    name: 'play-react',
    log: { logLevel: logLevels.all, reporters: [reporter] }
  })
    .with(keyboardGizmoFn())
    .with(commandsGizmoFn())
    .with(osGizmo)
    .with(browserGizmoFn())
    .with(browserKeyboardGizmo)
    .with(routesGizmo)
    .create()

  createAppStore(app)

  app.commands.contributions.add({
    id: 'app.newDocument',
    title: 'Create a new document'
  })

  app.commands.handlers.register('app.newDocument', () => {
    const doc = createDocument()
    createDocView(doc)
  })

  app.routes.register('/', () => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    )

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals()
  })

  app.routes.register('/error', () => {
    ReactDOM.render(
      <div>something went wrong</div>,
      document.getElementById('root')
    )
  })

  app.routes.navigate()
})()
