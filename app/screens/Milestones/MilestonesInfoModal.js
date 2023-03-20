import { Image, Platform, View } from 'react-native';
import React from 'react';
import s from './styles';
import TextView from '../../components/TextView';
import { Button } from '../../components/Button';
import AppStyles from '../../styles/AppStyles';
import HeaderButton from '../../components/HeaderButton';
import { colors } from '../../styles';

const MilestonesInfoModal = ({ onRequestClose }) => {
  return (
    <View style={s.wrapModal}>
      <View style={s.modalRoot}>
        <Image source={require('../../assets/image/birdsmodal.png')} style={s.modalImg} />
        <View style={s.modalBlog}>
          <TextView type={'sub-title'} text={'Earlychild Milestones'} style={s.titleModal} />
          <TextView
            text={`These are skill and behavior based milestones for your child. About 75% of kids can do these things at these ages, but don’t worry if your kid isn’t there yet. It doesn’t mean that your kid is behind or there’s a problem. We encourage you to use them as a guide. For each milestone, we provide activity recommendations to help build or strengthen that skill.`}
            type={'body-one'}
            style={s.modalcaps}
          />
          <Button ButtonText='Got it' textStyle={AppStyles.buttonRegular} style={s.gotBtn} />
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

export default MilestonesInfoModal;
