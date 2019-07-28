
# react-native-byron-keyboard

## Getting started

`$ npm install react-native-byron-keyboard --save`

### Mostly automatic installation

`$ react-native link react-native-byron-keyboard`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-byron-keyboard` and add `RNByronKeyboard.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNByronKeyboard.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.byron.keyboard.RNByronKeyboardPackage;` to the imports at the top of the file
  - Add `new RNByronKeyboardPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-byron-keyboard'
  	project(':react-native-byron-keyboard').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-byron-keyboard/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-byron-keyboard')
  	```


## Usage
```javascript
import RNByronKeyboard from 'react-native-byron-keyboard';

// TODO: What to do with the module?
RNByronKeyboard;
```
  