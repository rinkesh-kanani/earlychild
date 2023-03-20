import React from 'react';
import { Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { colors, fontSizes } from '../../styles';
import { indent } from '../../styles/dimensions';
import SpinnerButton from './Spinner/SpinnerButton';
import TextView from '@app/components/TextView';

const Button = ({
  onPress,
  ButtonText = '',
  children,
  style,
  animationStyle,
  isLoading = false,
  spinnerDotSize = 8,
  spinnerType = 'DotIndicator',
  disabled = false,
  textStyle,
  ...props
}) => {
  if (Platform.OS === 'android') {
    if (isLoading === true) {
      return (
        <SpinnerButton
          animationStyle={[animationStyle, s.fullWithLoading]}
          buttonStyle={[s.fullWidthButton, style]}
          size={spinnerDotSize}
          disabled={disabled}
          isLoading={isLoading}
          onPress={onPress}
          spinnerType={spinnerType}
          indicatorCount={4}
          {...props}>
          <TextView
            type={'button-text'}
            text={ButtonText}
            style={[s.buttonTextView, textStyle, disabled && s.disabledTextStyle]}
          />
        </SpinnerButton>
      );
    } else {
      return (
        <TouchableNativeFeedback onPress={onPress} disabled={disabled} {...props}>
          {!ButtonText ? (
            <View style={[style, disabled && s.disabledStyle]}>{children}</View>
          ) : (
            <View style={[s.fullWidthButton, style, disabled && s.disabledStyle]}>
              <TextView type={'button-text'} text={ButtonText} style={[s.buttonTextView, textStyle]} />
            </View>
          )}
        </TouchableNativeFeedback>
      );
    }
  } else {
    if (isLoading === true) {
      return (
        <SpinnerButton
          animationStyle={animationStyle}
          buttonStyle={[s.fullWidthButton, style, disabled && [s.disabledStyle]]}
          size={spinnerDotSize}
          disabled={disabled}
          isLoading={isLoading}
          onPress={onPress}
          spinnerType={spinnerType}
          indicatorCount={4}
          {...props}>
          <TextView
            type={'button-text'}
            text={ButtonText}
            style={[s.buttonTextView, textStyle, disabled && s.disabledTextStyle]}
          />
        </SpinnerButton>
      );
    } else {
      return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={disabled && s.disabledStyle} {...props}>
          {!ButtonText ? (
            <View style={style}>{children}</View>
          ) : (
            <View style={[s.fullWidthButtonIOS, style]}>
              <TextView
                type={'button-text'}
                text={ButtonText}
                style={[s.buttonTextView, textStyle, disabled && s.disabledTextStyle]}
              />
            </View>
          )}
        </TouchableOpacity>
      );
    }
  }
};

const s = StyleSheet.create({
  fullWidthButton: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: indent,
    borderRadius: 30,
  },
  fullWithLoading: {
    width: '100%',
  },
  fullWidthButtonIOS: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: indent,
    borderRadius: 30,
  },
  buttonTextView: {
    fontFamily: 'Navigo-regular',
    fontSize: fontSizes.body,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: colors.white,
  },
  disabledStyle: {
    backgroundColor: colors.primary,
    borderRadius:30,
    opacity:0.8
  },
  disabledTextStyle: {
    color: colors.disabledTextColor,
  },
});
export default Button;
