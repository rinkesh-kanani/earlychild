import { Platform, Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export const indent = 16;
export const doubleIndent = indent * 2;
export const halfindent = indent / 2;
export const lessIndent = Platform.OS === 'ios' ? indent - 3 : indent - 4;

export const borderRadius = Platform.OS === 'ios' ? 8 : 4;
export const ModalBGborderRadius = 8;

export const headerIconSize = 24;

export const InputVerticalPadding = Platform.OS === 'ios' ? 11 : 6;
export const borderWidth = Platform.OS === 'android' ? 0.5 : 0.5;
