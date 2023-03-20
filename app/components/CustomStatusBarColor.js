import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../constants/constant';
const CustomStatusBarColor = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const styles = StyleSheet.create({
  statusBar: {
    height: STATUS_BAR_HEIGHT,
  },
});
export default CustomStatusBarColor;
