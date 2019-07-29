import * as React from 'react'
import nativeModules from '../utils/native'
import InteractionManager from '../utils/manager'
import { TouchableHighlight } from 'react-native'
import { View, Text, Image, TextInput } from 'react-native'
import { StyleSheet } from 'react-native'

type IByronKeyboard = {
  tag?: number
  onClose?: () => void
  onNext?: () => void
  closeText?: string
  nextText?: string
  closeView?: JSX.Element
  nextView?: JSX.Element
  children?: JSX.Element
  underlayColor?: string
}
class ByronKeyboard extends React.PureComponent<IByronKeyboard> {
  public onClickKeyboard(key: string) {
    InteractionManager.runAfterInteractions(() => {
      const { tag } = this.props
      if (key === 'del' && tag) {
        nativeModules.backSpace(tag)
      } else if (key !== '' && tag) {
        nativeModules.insertText(tag, key)
      }
    })
  }

  public onClickClose() {
    const { onClose, tag } = this.props
    if (tag) {
      TextInput.State.blurTextInput(tag)
    }
    if (onClose) {
      onClose()
    }
  }

  public render() {
    const { closeText, nextText } = this.props
    const { nextView, closeView } = this.props
    const { children, underlayColor, onNext } = this.props
    return children ? (
      <View style={[styles.keyboard, { height: nativeModules.height }]}>
        {children}
      </View>
    ) : (
      <View style={[styles.keyboard, { height: nativeModules.height }]}>
        <View style={styles.keyboard_left}>
          <View style={styles.keyboard_left_list}>
            {['1', '2', '3'].map(n => {
              return (
                <TouchableHighlight
                  key={n}
                  style={styles.keyboard_left_item}
                  underlayColor={underlayColor || '#fff'}
                  onPress={this.onClickKeyboard.bind(this, n)}
                >
                  <Text style={styles.keyboard_left_text}>{n}</Text>
                </TouchableHighlight>
              )
            })}
          </View>
          <View style={styles.keyboard_left_list}>
            {['4', '5', '6'].map(n => {
              return (
                <TouchableHighlight
                  key={n}
                  style={styles.keyboard_left_item}
                  underlayColor={underlayColor || '#fff'}
                  onPress={this.onClickKeyboard.bind(this, n)}
                >
                  <Text style={styles.keyboard_left_text}>{n}</Text>
                </TouchableHighlight>
              )
            })}
          </View>
          <View style={styles.keyboard_left_list}>
            {['7', '8', '9'].map(n => {
              return (
                <TouchableHighlight
                  key={n}
                  style={styles.keyboard_left_item}
                  underlayColor={underlayColor || '#fff'}
                  onPress={this.onClickKeyboard.bind(this, n)}
                >
                  <Text style={styles.keyboard_left_text}>{n}</Text>
                </TouchableHighlight>
              )
            })}
          </View>
          <View style={styles.keyboard_left_list}>
            {['.', '0'].map(n => {
              return (
                <TouchableHighlight
                  key={n}
                  style={styles.keyboard_left_item}
                  underlayColor={underlayColor || '#fff'}
                  onPress={this.onClickKeyboard.bind(this, n)}
                >
                  <Text style={styles.keyboard_left_text}>{n}</Text>
                </TouchableHighlight>
              )
            })}
            <TouchableHighlight
              style={styles.keyboard_left_item}
              underlayColor={underlayColor || '#fff'}
              onPress={this.onClickKeyboard.bind(this, 'del')}
            >
              <Image
                resizeMode={'center'}
                source={require('../icons/delete.png')}
                style={{ width: 18, height: 14, tintColor: '#fff' }}
              />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.keyboard_right}>
          <TouchableHighlight
            style={styles.keyboard_right_item}
            onPress={this.onClickClose.bind(this)}
          >
            {closeView || (
              <Text style={styles.keyboard_right_text}>
                {closeText || '关闭'}
              </Text>
            )}
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.keyboard_right_item}
            onPress={() => onNext && onNext()}
          >
            {nextView || (
              <Text style={styles.keyboard_right_text}>
                {nextText || '下一项'}
              </Text>
            )}
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export default ByronKeyboard

const styles = StyleSheet.create({
  keyboard: {
    height: 176,
    flexDirection: 'row',
    backgroundColor: '#18222b'
  },
  keyboard_left: {
    flex: 1
  },
  keyboard_right: {
    width: 88
  },
  keyboard_left_list: {
    height: 44,
    flexDirection: 'row'
  },
  keyboard_left_item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#2d3a44',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth
  },
  keyboard_left_text: {
    fontSize: 20,
    color: '#fff'
  },
  keyboard_right_item: {
    height: 88,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#2d3a44',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  keyboard_right_text: {
    fontSize: 14,
    color: '#fff'
  }
})
