import { SFC } from 'react'
import * as React from 'react'
import nativeModules from '../utils/native'
import { findNodeHandle, ViewStyle } from 'react-native'
import { ScrollView, ScrollViewProps } from 'react-native'
import { EmitterSubscription, Keyboard } from 'react-native'
import { Platform, NativeAppEventEmitter } from 'react-native'
import { UIManager, TextInput, Dimensions, View } from 'react-native'

type IByronScrollView = {
  style?: ViewStyle
  scrollProps?: ScrollViewProps
}
type IState = {
  showKeyBoard: boolean
}
class ByronScrollView extends React.Component<IByronScrollView & SFC> {
  public scroll: ScrollView | null = null
  public showCustom: EmitterSubscription | null = null
  public hideCustom: EmitterSubscription | null = null
  public keyShow: EmitterSubscription | null = null
  public keyHide: EmitterSubscription | null = null
  public showKeyBoard = false
  public flag = 0

  public state: IState = {
    showKeyBoard: false
  }

  public componentDidMount() {
    if (Platform.OS === 'android') {
      this.showCustom = NativeAppEventEmitter.addListener(
        'showCustomKeyboard',
        this.showCustomKeyboard.bind(this)
      )
      this.hideCustom = NativeAppEventEmitter.addListener(
        'hideCustomKeyboard',
        this.hideCustomKeyboard.bind(this)
      )
      this.keyShow = Keyboard.addListener(
        'keyboardDidShow',
        this.keyboardDidShow.bind(this)
      )
      this.keyHide = Keyboard.addListener(
        'keyboardDidHide',
        this.keyboardDidHide.bind(this)
      )
    }
  }

  public componentDidUpdate(prevProps: any, prevState: IState) {
    if (prevState.showKeyBoard !== this.state.showKeyBoard) {
      this.updateScrollTo()
    }
  }

  public componentWillMount() {
    this.keyShow && this.keyShow.remove()
    this.keyHide && this.keyHide.remove()
    this.showCustom && this.showCustom.remove()
    this.hideCustom && this.hideCustom.remove()
  }

  public showCustomKeyboard() {
    this.flag += 2
    this.showKeyBoard = true
    this.changeKeyBoardState()
  }

  public hideCustomKeyboard() {
    this.flag -= 2
    this.showKeyBoard = false
    this.changeKeyBoardState()
  }

  public keyboardDidShow() {
    this.flag++
  }

  public keyboardDidHide() {
    this.flag--
    if (this.flag === 0) {
      this.showKeyBoard = false
      this.changeKeyBoardState()
    }
  }

  public changeKeyBoardState() {
    this.setState((prevState: IState) => {
      if (prevState.showKeyBoard === this.showKeyBoard) {
        this.updateScrollTo()
        return prevState
      }
      return { showKeyBoard: this.showKeyBoard }
    })
  }

  public updateScrollTo() {
    const currentlyTfNode = TextInput.State.currentlyFocusedField()
    if (currentlyTfNode === null) {
      return
    }
    if (this.scroll === null) {
      return
    }
    const scrollViewNode = findNodeHandle(this.scroll)
    if (scrollViewNode === null) {
      return
    }
    if (!this.state.showKeyBoard) {
      this.scroll.scrollTo({ y: 0 })
      return
    }
    UIManager.measureInWindow(scrollViewNode, (x, y, width, height) => {
      UIManager.measureLayout(
        currentlyTfNode,
        scrollViewNode,
        function() {},
        (left, top, width, height) => {
          const windowHeight = Dimensions.get('window').height
          const subHeight = windowHeight - nativeModules.height
          const currentHeight = top + height + y + 30 //上下padding高度
          if (subHeight < currentHeight && this.scroll) {
            this.scroll.scrollTo({ y: currentHeight - subHeight })
          }
        }
      )
    })
  }

  public render() {
    const { showKeyBoard } = this.state
    return (
      <ScrollView
        {...this.props.scrollProps}
        ref={ref => (this.scroll = ref)}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {this.props.children}
        <View style={{ height: showKeyBoard ? nativeModules.height : 0 }} />
      </ScrollView>
    )
  }
}

export default ByronScrollView
