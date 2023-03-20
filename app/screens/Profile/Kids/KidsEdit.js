import { Platform, SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import storage from '@react-native-firebase/storage';
import svgs from '../../../assets/svg';
import s from './styles';
import HeaderButton from '../../../components/HeaderButton';
import AppStyles from '../../../styles/AppStyles';
import TextView from '../../../components/TextView';
import { colors } from '../../../styles';
import DatePicker from '../../../components/molecules/DatePicker';
import { Button } from '../../../components/Button';
import ScrollableAvoidKeyboard from '../../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import { useDispatch, useSelector } from 'react-redux';
import AppAvtar from '../../../components/Avtar/AppAvtar';
import { clearChild, updateChildData } from '../../../actions/childActions';
import { getUniqueId, isEmpty, isNumber, openFilePicker, toastNotification } from '../../../helpers/helpers';
import { CHILDPROFILEPATH } from '../../../constants/constant';
import {
  createChildNewDocument,
  setAllChildDocuments,
  setCurrentChildData,
  updateChildDocument,
} from '../../../services/childService';

const KidsEditScreen = ({ navigation }) => {
  const childSelector = useSelector((state) => state.child);
  const { child, currentChild } = childSelector;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            color={colors.textColor}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  useEffect(() => {
    return () => {
      dispatch(clearChild());
    };
  }, [dispatch]);

  const onChangeChildInfo = useCallback(
    async (propsName, value) => {
      await dispatch(updateChildData({ propsName, value }));
    },
    [dispatch],
  );

  const openImagePicker = useCallback(async () => {
    const image = await openFilePicker();
    onChangeChildInfo('profile', image);
  }, [onChangeChildInfo]);

  const updateChildInfo = useCallback(
    async (item) => {
      if (item?.id) {
        const result = await dispatch(updateChildDocument(item?.uid, item?.id, item));
        if (item?.id === currentChild?.id) dispatch(setCurrentChildData(result));
      } else {
        const result = await dispatch(createChildNewDocument(item));
        dispatch(setCurrentChildData(result));
      }

      await dispatch(setAllChildDocuments());
      // dispatch(setChildList(newList));

      navigation.goBack();
    },
    [currentChild?.id, dispatch, navigation],
  );

  const onSave = useCallback(async () => {
    try {
      setLoading(true);
      if (isEmpty(child?.firstName)) {
        toastNotification('please enter first Name');
        return;
      } else if (isEmpty(child?.lastName)) {
        toastNotification('please enter last Name');
        return;
      } else if (child?.premature) {
        if (isEmpty(child?.noOfWeekPremature)) {
          toastNotification('please enter number of weeks premature');
          return;
        } else if (!isNumber(child?.noOfWeekPremature)) {
          toastNotification('please enter only number of weeks premature');
          return;
        }
      }

      let newChild = {
        ...child,
        birthDay: new Date(child?.birthDay)?.toUTCString(),
        profile: undefined,
      };

      if (child?.profile) {
        const filename = getUniqueId();
        const task = storage()
          .ref(CHILDPROFILEPATH + '/' + filename)
          .putString(child?.profile?.data, 'base64', { contentType: child?.profile?.mime });

        task.on(
          'state_changed',
          () => {
            setLoading(true);
          },
          (error) => console.log(error),
          (snapshot) => {
            snapshot.ref.getDownloadURL().then(async (downloadURL) => {
              newChild.profileLink = downloadURL;
              await updateChildInfo(newChild);
            });
          },
        );
      } else {
        await updateChildInfo(newChild);
      }
    } catch (error) {
      setLoading(false);
      console.log('onChildUpdate', error);
    } finally {
      setLoading(false);
    }
  }, [child, updateChildInfo]);

  return (
    <SafeAreaView style={s.root}>
      <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false}>
        <View style={s.paddingWrap}>
          <View style={s.imgWrap}>
            {child?.profile ? (
              <AppAvtar
                Imgsrc={`data:${child?.profile?.mime};base64,${child?.profile?.data}`}
                Size={140}
                TextType={'title'}
              />
            ) : child?.profileLink ? (
              <AppAvtar Imgsrc={child?.profileLink} Size={140} TextType={'title'} />
            ) : (
              <SvgIcon svgs={svgs} name={'profile-img'} width={150} height={150} style={s.secondtp} />
            )}

            <TouchableOpacity onPress={openImagePicker} style={s.imgEditWrap}>
              <SvgIcon svgs={svgs} name={'edit-icon'} width={18} height={18} />
            </TouchableOpacity>
          </View>
          <View style={s.inputWrap}>
            <TextInput
              placeholder='Child’s first name'
              value={child?.firstName}
              onChangeText={(text) => {
                onChangeChildInfo('firstName', text);
              }}
              style={s.inputStyle}
              placeholderTextColor={colors.placeholder}
            />
            <TextInput
              placeholder='Child’s last name'
              value={child?.lastName}
              onChangeText={(text) => {
                onChangeChildInfo('lastName', text);
              }}
              style={s.inputStyle}
              placeholderTextColor={colors.placeholder}
            />
            <View style={s.dateWrap}>
              <DatePicker
                value={new Date(child?.birthDay)}
                onChange={(date) => {
                  if (date) onChangeChildInfo('birthDay', date);
                }}
              />
            </View>
          </View>
          <View style={s.radioWrap}>
            <TouchableOpacity
              onPress={() => {
                onChangeChildInfo('premature', !child?.premature);
              }}>
              {child?.premature ? (
                <SvgIcon svgs={svgs} name={'radio-ac'} width={22} height={22} />
              ) : (
                <SvgIcon svgs={svgs} name={'radio-un'} width={22} height={22} />
              )}
            </TouchableOpacity>
            <TextView text={'Was born prematurely'} type={'body-two'} style={s.bornText} />
          </View>
          {child?.premature && (
            <View style={s.numberWrap}>
              <TextInput
                placeholder='Number of weeks premature*'
                style={s.weekInputStyle}
                keyboardType='number-pad'
                placeholderTextColor={s.placeTextColor}
                onChangeText={(text) => {
                  onChangeChildInfo('noOfWeekPremature', text);
                }}
                value={child?.noOfWeekPremature}
                // returnKeyType={'done'}
                // onSubmitEditing={onSave}
              />
              {!isEmpty(child?.noOfWeekPremature) && <TextView text={'Weeks'} style={s.weekText} />}
            </View>
          )}
        </View>
      </ScrollableAvoidKeyboard>
      <View style={s.btnWrap}>
        <Button
          ButtonText='Save'
          textStyle={AppStyles.buttonRegular}
          onPress={onSave}
          isLoading={loading}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default KidsEditScreen;
