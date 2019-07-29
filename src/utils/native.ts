import { NativeModules } from 'react-native'
import { Platform, Dimensions } from 'react-native'

const { RNByronKeyboard } = NativeModules

const { width, height } = Dimensions.get('window')

type IByronKeyboard = {
  install: (reactTag: number, height: number) => void
  uninstall: (reactTag: number) => void
  insertText: (reactTag: number, text: string) => void
  backSpace: (reactTag: number) => void
  height: number
}

function _uf(name: string) {
  console.log(`[RNByronKeyboard] ${name}执行失败.`)
}

function isIphoneX() {
  const scale = (height / width + '').substr(0, 4)
  const iX = Number(scale) * 100 === 216
  return Platform.OS === 'ios' && iX
}

const byronKeyboard: IByronKeyboard = {
  install: RNByronKeyboard.install || _uf.bind(this, 'install'),
  uninstall: RNByronKeyboard.uninstall || _uf.bind(this, 'uninstall'),
  insertText: RNByronKeyboard.insertText || _uf.bind(this, 'insertText'),
  backSpace: RNByronKeyboard.backSpace || _uf.bind(this, 'backSpace'),
  height: isIphoneX() ? 210 : 176
}

export default byronKeyboard
