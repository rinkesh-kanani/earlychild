import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from '../../../components/Icon';
import RoundButton from '../../../components/RoundButton';
import TextView from '../../../components/TextView';
import { colors } from '../../../styles';
import s from './styles';

const ManageSubModal = ({ onRequestClose }) => {
  return (
    <KeyboardAvoidingView style={s.keyBord}>
      <View style={s.modalWrapper}>
        <Text style={s.closeModal} onPress={onRequestClose}></Text>
        <View style={s.rectView}></View>
        <View style={s.modalBox}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={s.modalHeadWrap}>
              <TextView text={'MANAGE SUBSCRIPTION'} style={s.modaltitle} />
              <RoundButton icon={'x'} iconColor={colors.textColor} iconSize={20} size={24} onPress={onRequestClose} />
            </View>
            <View style={s.modalPadding}>
              <View style={s.firstModalWrap}>
                <TextView text={'Subscription'} type={'body-two'} style={s.labelWrap} />
                <TextView text={'Valid until September 12, 2022'} type={'body-one'} style={s.dateText} />
              </View>
              <View style={s.secondModalWrap}>
                <View style={s.rowSub}>
                  <TextView text={'EDIT SUBSCRIPTION PREFERENCES'} style={s.subPrefe} />
                  <Icon name={'more-horizontal'} color={colors.textColor} size={20} />
                </View>
                <View style={s.cancelWrap}>
                  <TextView text={'CANCEL SUBSCRIPTION'} style={s.subPrefe} />
                  <Icon name={'slash'} color={colors.red} size={20} />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ManageSubModal;
