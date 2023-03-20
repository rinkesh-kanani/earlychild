import { Image, Platform, View } from 'react-native';
import React, { useCallback } from 'react';
import s from './styles';
import TextView from '../../components/TextView';
import { Button } from '../../components/Button';
import AppStyles from '../../styles/AppStyles';
import { colors } from '../../styles';
import HeaderButton from '../../components/HeaderButton';
import screens from '../../constants/screens';

const MindfulModal = ({ onRequestClose, navigation }) => {
  const onPressViewStates = useCallback(() => {
    onRequestClose();
    navigation.navigate(screens.ProfileRoot);
  }, [navigation, onRequestClose]);

  return (
    <View style={s.mindfulModal}>
      <View style={s.modalRoot}>
        <Image source={require('../../assets/image/fly.png')} style={s.mindfulImg} />
        <View>
          <TextView text={'Mindful Playtime Tracked!'} type={'header'} style={s.titlemodalText} />
          <TextView text={'You have checked IN TODAY'} style={s.modalCaps} />
        </View>
        <View style={s.btnModalWrap}>
          <Button ButtonText={'View stats'} textStyle={AppStyles.buttonRegular} onPress={onPressViewStates} />
        </View>
        <View style={s.closeIcon}>
          <HeaderButton
            type={1}
            iconName={'x'}
            color={colors.textColor}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
            onPress={onRequestClose}
          />
        </View>
      </View>
    </View>
  );
};

export default MindfulModal;
