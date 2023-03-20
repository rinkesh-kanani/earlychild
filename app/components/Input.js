import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import colors from '../styles/colors';
import { InputVerticalPadding } from '../styles/dimensions';
import Typography from '../styles/Typography';

const Input = ({ style, value, onChangeText, placeholder, ...props }) => (
  <View style={s.root}>
    <TextInput
      underlineColorAndroid='transparent'
      style={[s.input, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Platform.OS == 'ios' ? colors.gray : undefined}
      {...props}
    />
  </View>
);

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    ...Typography.body,
    flex: 1,
    paddingVertical: InputVerticalPadding,
    ...Platform.select({
      android: {
        marginBottom: 7,
      },
    }),
  },
});
export default Input;
