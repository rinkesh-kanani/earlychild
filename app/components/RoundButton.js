import React from 'react';
import { Platform, View, ViewPropTypes, TouchableNativeFeedback, StyleSheet } from 'react-native';
import T from 'prop-types';
import Icon from './Icon';
import { colors } from '../styles';

const RoundButton = ({
  style,
  size = 56,
  isFeatherIcon = false,
  icon = 'md-add',
  iconSize = 24,
  iconColor = colors.white,
  ...props
}) => {
  {
    if (Platform.OS === 'android') {
      return (
        <View style={style}>
          <View style={{ borderRadius: size / 2, overflow: 'hidden' }}>
            <TouchableNativeFeedback {...props}>
              <View
                style={[
                  s.container,
                  {
                    borderRadius: size / 2,
                    width: size,
                    height: size,
                  },
                ]}>
                <Icon isFeather={isFeatherIcon} name={icon} size={iconSize} color={iconColor} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
};

const s = StyleSheet.create({
  container: {
    backgroundColor: colors.theme,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

RoundButton.propTypes = {
  style: ViewPropTypes.style,
  size: T.number.isRequired,
  isFeatherIcon: T.bool,
  icon: T.string.isRequired,
  iconSize: T.number,
  iconColor: T.string,
};
export default RoundButton;
