import React from 'react';
import { View, ViewPropTypes, StyleSheet } from 'react-native';
import T from 'prop-types';
import Icon from './Icon';
import { colors } from '../styles';

const RoundIcon = ({
  style,
  size = 42,
  icon = 'md-add',
  type = 'feather',
  iconSize = 24,
  iconColor = colors.white,
}) => {
  {
    return (
      <View style={style}>
        <View style={{ borderRadius: size / 2, overflow: 'hidden' }}>
          <View
            style={[
              s.container,
              {
                borderRadius: size / 2,
                width: size,
                height: size,
              },
            ]}>
            <Icon isFeather={true} name={icon} size={iconSize} color={iconColor} type={type} />
          </View>
        </View>
      </View>
    );
  }
};

const s = StyleSheet.create({
  container: {
    backgroundColor: colors.transparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

RoundIcon.propTypes = {
  style: ViewPropTypes.style,
  size: T.number,
  type: T.string,
  icon: T.string,
  iconSize: T.number,
  iconColor: T.string,
};
export default RoundIcon;
