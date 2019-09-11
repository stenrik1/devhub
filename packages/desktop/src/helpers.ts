import { app, BrowserWindow, Tray } from 'electron'
import path from 'path'

import * as constants from './constants'
import { __DEV__ } from './libs/electron-is-dev'

export function registerAppSchema() {
  unregisterAppSchema()
  if (__DEV__ && process.platform === 'win32') {
    app.setAsDefaultProtocolClient(
      constants.shared.APP_DEEP_LINK_SCHEMA,
      process.execPath,
      [path.resolve(process.argv[1])],
    )
  } else {
    app.setAsDefaultProtocolClient(constants.shared.APP_DEEP_LINK_SCHEMA)
  }
}

export function unregisterAppSchema() {
  if (__DEV__ && process.platform === 'win32') {
    app.removeAsDefaultProtocolClient(
      constants.shared.APP_DEEP_LINK_SCHEMA,
      process.execPath,
      [path.resolve(process.argv[1])],
    )
  } else {
    app.removeAsDefaultProtocolClient(constants.shared.APP_DEEP_LINK_SCHEMA)
  }
}

export function isDefaultAppSchema() {
  return __DEV__ && process.platform === 'win32'
    ? app.isDefaultProtocolClient(
        constants.shared.APP_DEEP_LINK_SCHEMA,
        process.execPath,
        [path.resolve(process.argv[1])],
      )
    : app.isDefaultProtocolClient(constants.shared.APP_DEEP_LINK_SCHEMA)
}

export function showWindow(win: BrowserWindow) {
  if (win.isMinimized()) win.restore()
  if (win.isVisible()) win.focus()
  win.show()
}

export function getCenterPosition(obj: BrowserWindow | Tray) {
  const bounds = obj.getBounds()

  const x = Math.round(bounds.x + bounds.width / 2)
  const y = Math.round(bounds.y + bounds.height / 2)

  return { x, y }
}
