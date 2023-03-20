import React from 'react';
import { View, Platform } from 'react-native';
import { Button } from '../components/Button';
import Icon from './Icon';
import RoundButton from './RoundButton';

const HeaderButton = ({
  type, //here type 1=Button and type 2=View
  color,
  iconName,
  isFeather = true,
  ...props
}) => {
  if (type == 1) {
    return Platform.OS == 'ios' ? (
      <Button {...props}>
        <Icon isFeather={isFeather} name={iconName} color={color} />
      </Button>
    ) : (
      <RoundButton isFeatherIcon={isFeather} icon={iconName} iconColor={color} {...props} size={40} />
    );
  } else if (type == 2) {
    return (
      <View {...props}>
        <Icon isFeather={isFeather} name={iconName} color={color} />
      </View>
    );
  } else {
    return null;
  }
};
export default HeaderButton;
