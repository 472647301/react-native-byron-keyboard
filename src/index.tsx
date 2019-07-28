import * as React from 'react'
import { AppRegistry } from 'react-native'
import nativeModules from './utils/native'
import ByronKeyboard from './views/KeyBoard'
import _ByronTextInput from './views/TextInput'

export const RNByronKeyboard = nativeModules

export const ByronTextInput = _ByronTextInput

type IinstallByronKeyboard = {
  onClose?: () => void
  onNext?: () => void
  closeView?: JSX.Element
  nextView?: JSX.Element
  children?: JSX.Element
  underlayColor?: string
}
export function installByronKeyboard(_props: IinstallByronKeyboard) {
  class KeyBoard extends React.Component {
    public render() {
      return <ByronKeyboard {..._props} />
    }
  }
  AppRegistry.registerComponent('RNByronKeyboard', () => KeyBoard)
}
