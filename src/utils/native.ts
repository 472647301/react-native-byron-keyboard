import { NativeModules } from 'react-native'

const { RNByronKeyboard } = NativeModules

type IByronKeyboard = {
  install: (reactTag: number, height: number) => void
  uninstall: (reactTag: number) => void
  insertText: (reactTag: number, text: string) => void
  backSpace: (reactTag: number) => void
}

function _uf(name: string) {
  console.log(`[RNByronKeyboard] ${name}执行失败.`)
}

const byronKeyboard: IByronKeyboard = {
  install: RNByronKeyboard.install || _uf.bind(this, 'install'),
  uninstall: RNByronKeyboard.uninstall || _uf.bind(this, 'uninstall'),
  insertText: RNByronKeyboard.insertText || _uf.bind(this, 'insertText'),
  backSpace: RNByronKeyboard.backSpace || _uf.bind(this, 'backSpace')
}

export default byronKeyboard
