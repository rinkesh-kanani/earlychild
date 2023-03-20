import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import TextView from '@app/components/TextView';

const FormGroup = ({
  style,
  children,
  formTitle = '',
  isLabel = Platform.OS == 'android' ? false : true,
  ...props
}) => (
  <View>
    {isLabel ? <TextView type={'form-title'} text={formTitle} /> : null}
    <View style={[s.inputWrapper, style]} {...props}>
      {children}
    </View>
  </View>
);
const s = StyleSheet.create({
  inputWrapper: {
    marginBottom: 10,
  },
});
export default FormGroup;
