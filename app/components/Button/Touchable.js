import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

const Touchable = ({ onPress, children, style, disabled = false, ...props }) => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={onPress} disabled={disabled} {...props}>
        <View style={[style, disabled && s.disabledStyle]}>{children}</View>
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} {...props}>
        <View style={[style, disabled && s.disabledStyle]}>{children}</View>
      </TouchableOpacity>
    );
  }
};

const s = StyleSheet.create({
  disabledStyle: {
    opacity: 0.5,
  },
});
export default Touchable;
