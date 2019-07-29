import * as React from 'react'
import nativeModules from '../utils/native'
import { findNodeHandle } from 'react-native'
import { TextInput, TextInputProps } from 'react-native'

type IByronTextInput = {}
class ByronTextInput extends React.Component<IByronTextInput & TextInputProps> {
  public input: TextInput | null = null
  public timer: number | null = null

  public componentDidMount() {
    this.timer = setTimeout(() => {
      const reactTag = findNodeHandle(this.input)
      if (reactTag) {
        nativeModules.install(reactTag, nativeModules.height)
      }
    }, 300)
  }

  public componentWillUnmount() {
    if (this.timer !== null) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  public render() {
    return <TextInput {...this.props} ref={ref => (this.input = ref)} />
  }
}

export default ByronTextInput
