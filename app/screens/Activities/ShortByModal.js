import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import s from './style';
import TextView from '../../components/TextView';
import { Button } from '../../components/Button';
import AppStyles from '../../styles/AppStyles';
import RadioBox from '../../components/RadioBox';
import { SORT_ACTIVITY_MENU } from '../../constants/constant';

const ShortByModal = ({ onRequestClose, onChangeSortValue, sortValue }) => {
  const [value, setValue] = useState(sortValue);

  const onApply = useCallback(() => {
    onChangeSortValue(value);
    onRequestClose();
  }, [onRequestClose, onChangeSortValue, value]);

  return (
    <KeyboardAvoidingView style={s.keyBord}>
      <View style={s.modalWrapper}>
        <Text style={s.closeModal} onPress={onRequestClose}></Text>
        <View style={s.rectView}></View>
        <View style={s.modalBox}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={s.paddingModal}>
              <View>
                <TextView text={'Sort by'} type={'body-head'} style={s.modalType} />
                <View>
                  <RadioBox
                    rightText={'Most Relevant'}
                    style={s.checkBox}
                    isChecked={value === SORT_ACTIVITY_MENU?.MOSTRELEVANT}
                    onClick={() => setValue(SORT_ACTIVITY_MENU?.MOSTRELEVANT)}
                  />
                  <RadioBox
                    rightText={'Newest-Oldest'}
                    style={s.checkBox}
                    isChecked={value === SORT_ACTIVITY_MENU?.NEWESTOOLDEST}
                    onClick={() => setValue(SORT_ACTIVITY_MENU?.NEWESTOOLDEST)}
                  />
                  <RadioBox
                    rightText={'Oldest-Newest'}
                    style={s.checkBox}
                    isChecked={value === SORT_ACTIVITY_MENU?.OLDESTONEWEST}
                    onClick={() => setValue(SORT_ACTIVITY_MENU?.OLDESTONEWEST)}
                  />
                  <RadioBox
                    rightText={'Alphabetical (A-Z)'}
                    style={s.checkBox}
                    isChecked={value === SORT_ACTIVITY_MENU?.ASC}
                    onClick={() => setValue(SORT_ACTIVITY_MENU?.ASC)}
                  />
                  <RadioBox
                    rightText={'Alphabetical (Z-A)'}
                    style={s.checkBox}
                    isChecked={value === SORT_ACTIVITY_MENU?.DESC}
                    onClick={() => setValue(SORT_ACTIVITY_MENU?.DESC)}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={s.btnModal}>
            <Button ButtonText='Apply' textStyle={AppStyles.buttonRegular} onPress={onApply} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ShortByModal;
