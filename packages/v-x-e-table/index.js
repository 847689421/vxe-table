import Interceptor from './src/interceptor'
import Renderer from './src/renderer'
import Buttons from './src/buttons'
import Menus from './src/menus'
import Setup from './src/setup'
import GlobalConfig from '../conf'
import { UtilTools } from '../tools'

const installedPlugins = []

function use (Plugin, options) {
  if (Plugin && Plugin.install) {
    if (installedPlugins.indexOf(Plugin) === -1) {
      Plugin.install(VXETable, options)
      installedPlugins.push(Plugin)
    }
  }
  return VXETable
}

export const VXETable = {
  t: key => GlobalConfig.i18n(key),
  v: 'v1',
  use,
  types: {},
  setup: Setup,
  interceptor: Interceptor,
  renderer: Renderer,
  buttons: Buttons,
  menus: Menus
}

/**
 * 获取当前的 zIndex
 */
Object.defineProperty(VXETable, 'zIndex', { get: UtilTools.getLastZIndex })

/**
 * 获取下一个 zIndex
 */
Object.defineProperty(VXETable, 'nextZIndex', { get: UtilTools.nextZIndex })

export * from './src/interceptor'
export * from './src/renderer'
export * from './src/menus'
export * from './src/buttons'
export default VXETable
