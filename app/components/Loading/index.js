import React from 'react';
import { View, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../styles';
import Typography from '../../styles/Typography';
import { indent } from '../../styles/dimensions';
import AppStyles from '../../styles/AppStyles';
import TextView from '../TextView';

const Loading = (props) => {
  return (
    <SafeAreaView style={AppStyles.rootLoading}>
      <View style={s.container}>
        <ActivityIndicator size='large' color={colors.primary} />
        <TextView style={s.textStyle} type={'body'} text={props.text || 'Loading...'} />
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  textStyle: {
    marginVertical: indent,
    color: colors.textColor,
    ...Typography.bodyOne,
  },
});

export default Loading;
