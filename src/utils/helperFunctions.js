import { Platform, Dimensions } from 'react-native';

const Screen = Dimensions.get('window');

export const SCREEN_WIDTH = Screen.width;
export const SCREEN_HEIGHT = Screen.height;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// example usage- getKeyValue(object, 'paramList')
// where param list is separated by .
// a = { b: {c: { d: 'dd'}}}
// getKeyValue(a, 'b.c.d') -> result: dd
export const getKeyValue = (object, keyString) => {
  return keyString.split('.').reduce(function (o, x) {
    return typeof o === 'undefined' || o === null ? o : o[x];
  }, object);
};
