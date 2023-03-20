import { Image, Platform, View } from 'react-native';
import React from 'react';
import s from './styles';
import TextView from '../../../components/TextView';
import { colors } from '../../../styles';
import HeaderButton from '../../../components/HeaderButton';

const MindfulModal = ({ onRequestClose, checkedDay }) => {
  return (
    <View style={s.mindfulModal}>
      <View style={s.modalRoot}>
        <Image source={require('../../../assets/image/fly.png')} style={s.mindfulImg} />
        <View>
          <TextView text={'Mindful Playtime Tracked!'} type={'header'} style={s.titlemodalText} />
          <TextView text={`You have checked IN ${checkedDay}`} type={'caps'} style={s.modalCaps} />
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
