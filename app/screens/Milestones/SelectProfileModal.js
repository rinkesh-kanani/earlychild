import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import s from './styles';
import TextView from '../../components/TextView';
import Icon from '../../components/Icon';
import { colors } from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../helpers/helpers';
import { MILESTONE_LIST } from '../../constants/constant';
import screens from '../../constants/screens';
import { getCurrentChildData, setCurrentChildData } from '../../services/childService';
import AppAvtar from '../../components/Avtar/AppAvtar';

const SelectProfileModal = ({ onRequestClose, navigation }) => {
  const childSelector = useSelector((state) => state.child);

  const { childList } = childSelector;
  const dispatch = useDispatch();

  const isExistCurrentChild = useCallback(async () => {
    const currentChild = await dispatch(getCurrentChildData());
    if (isEmpty(currentChild)) {
      navigation.goBack();
    }
  }, [dispatch, navigation]);

  useEffect(() => {
    return () => {
      isExistCurrentChild();
    };
  }, [isExistCurrentChild]);

  const onClickChild = useCallback(
    async (child) => {
      await dispatch(setCurrentChildData(child));
      onRequestClose();
    },
    [dispatch, onRequestClose],
  );

  const childProfileView = useMemo(() => {
    if (!isEmpty(childList))
      return childList?.map((child, index) => {
        return (
          <TouchableOpacity
            onPress={() => onClickChild(child)}
            style={s.rowProfile}
            key={`childprofileview_index_${index}`}
            activeOpacity={0.9}>
            <AppAvtar
              Imgsrc={child?.profileLink ? child?.profileLink : undefined}
              Name={child?.firstName}
              Size={56}
              TextType={'title'}
            />
            <View style={s.nameView}>
              <TextView text={`${child?.firstName} ${child?.lastName}`} type={'body-head'} style={s.modalName} />
              <TextView text={MILESTONE_LIST[child?.milestone]} type={'caption'} style={s.modalMonth} />
            </View>
          </TouchableOpacity>
        );
      });
    return null;
  }, [childList, onClickChild]);

  return (
    <KeyboardAvoidingView style={s.keyBord}>
      <View style={s.modalWrapper}>
        <Text style={s.closeModal} onPress={onRequestClose}></Text>
        <View style={s.rectView}></View>
        <View style={s.modalBox}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {childProfileView}
            <TouchableOpacity
              onPress={() => {
                onRequestClose();
                navigation.navigate(screens.KidsEdit);
              }}
              style={s.addChildView}>
              <View style={s.iconView}>
                <Icon name={'plus'} color={colors.textColor} size={20} />
              </View>
              <View style={s.nameView}>
                <TextView text={'Add Another Child'} type={'body-head'} style={s.headerText} />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SelectProfileModal;
