import { Platform, Dimensions } from 'react-native';

const Screen = Dimensions.get('window');

export const SCREEN_WIDTH = Screen.width;
export const SCREEN_HEIGHT = Screen.height;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
