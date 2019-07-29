import * as React from 'react'
import { AppRegistry } from 'react-native'
import nativeModules from './utils/native'
import ByronKeyboard from './views/KeyBoard'
import _ByronTextInput from './views/TextInput'
import _ByronScrollView from './views/ScrollView'

export const RNByronKeyboard = nativeModules

export const ByronTextInput = _ByronTextInput

export const ByronScrollView = _ByronScrollView

type IinstallByronKeyboard = {
  onClose?: () => void
  onNext?: () => void
  closeText?: string
  nextText?: string
  closeView?: JSX.Element
  nextView?: JSX.Element
  children?: JSX.Element
  underlayColor?: string
}
export function installByronKeyboard(_props: IinstallByronKeyboard) {
  class KeyBoard extends React.Component<{ tag: number }> {
    public render() {
      return <ByronKeyboard {..._props} tag={this.props.tag} />
    }
  }
  AppRegistry.registerComponent('RNByronKeyboard', () => KeyBoard)
}
