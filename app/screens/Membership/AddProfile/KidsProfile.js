import { View, Platform, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import s from './styles';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import { colors } from '../../../styles';
import svgs from '../../../assets/svg';
import HeaderButton from '../../../components/HeaderButton';
import AppStyles from '../../../styles/AppStyles';
import TextView from '../../../components/TextView';
import DatePicker from '../../../components/molecules/DatePicker';
import { Button } from '../../../components/Button';
import screens from '../../../constants/screens';
import { useDispatch, useSelector } from 'react-redux';
import { clearChildItem, setChildItem, updateChildItem, updateOnBoardingUser } from '../../../actions/authActions';
import { getUniqueId, isEmpty, isNumber, openFilePicker, toastNotification } from '../../../helpers/helpers';
import AppAvtar from '../../../components/Avtar/AppAvtar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KidsProfileScreen = ({ route, navigation }) => {
  const { params } = route;
  const authSelector = useSelector((state) => state.auth);
  const { child, onBoarding } = authSelector;
  const dispatch = useDispatch();
  const lastNameRef = useRef();
  const onChangeChildInfo = useCallback(
    async (propsName, value) => {
      await dispatch(updateChildItem({ propsName, value }));
    },
    [dispatch],
  );

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'arrow-left'}
            color={colors.textColor}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
            onPress={navigation.goBack}
          />
        </View>
      ),

      headerStyle: AppStyles.hederTwoStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  useEffect(() => {
    if (params?.item) {
      dispatch(setChildItem(params?.item));
    }
    return () => {
      dispatch(clearChildItem());
    };
  }, [dispatch, params?.item]);

  const onClickContinue = useCallback(async () => {
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

    let item = {
      ...child,
    };
    const newChild = onBoarding?.child ? JSON.parse(JSON.stringify(onBoarding?.child)) : [];
    if (params?.item) {
      const index = newChild?.findIndex((x) => x.id === params?.item?.id);
      if (index !== -1) {
        newChild[index] = item;
      }
    } else {
      item.id = getUniqueId();
      newChild?.push(item);
    }

    dispatch(updateOnBoardingUser({ propsName: 'child', value: newChild }));
    navigation.navigate(screens.AddChilds);
    dispatch(clearChildItem());
  }, [child, dispatch, navigation, onBoarding?.child, params?.item]);

  const openImagePicker = useCallback(async () => {
    const image = await openFilePicker();
    onChangeChildInfo('profile', image);
  }, [onChangeChildInfo]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={s.root}>
          <View style={[s.paddingWrap, s.paddingTop]}>
            <View>
              <TextView text={'Great!'} style={s.titleText} />
              <TextView text={'Now add your kids.'} style={s.titleText} />
              <View>
                <View style={s.stepWrapper}>
                  <View style={s.wrapCenter}>
                    <SvgIcon svgs={svgs} name={'step-completed'} width={28} height={28} />
                    <TextView text={'You'} type={'caps'} style={s.stepText} />
                  </View>
                  <View style={s.dividerLeft}></View>
                  <View style={s.wrapCenter}>
                    <View style={s.activeStep}>
                      <TextView text={'2'} type={'caps'} style={s.activeText} />
                    </View>
                    <TextView text={'Your Kids'} type={'caps'} style={s.stepText} />
                  </View>
                  <View style={s.dividerRight}></View>
                  <View style={s.wrapCenter}>
                    <View style={s.unactiveStep}>
                      <TextView text={'3'} type={'caps'} style={s.unactiveText} />
                    </View>
                    <TextView text={'Complete'} type={'caps'} style={s.nonstepText} />
                  </View>
                </View>
              </View>
            </View>
            <View style={s.bottmWrap}>
              <View style={s.imgWrap}>
                <View style={s.profileWrap}>
                  {child?.profile ? (
                    <AppAvtar
                      Imgsrc={`data:${child?.profile?.mime};base64,${child?.profile?.data}`}
                      Size={91}
                      TextType={'title'}
                    />
                  ) : (
                    <SvgIcon svgs={svgs} name={'child-icon'} width={112} height={112} style={s.secondtp} />
                  )}

                  <TouchableOpacity onPress={openImagePicker} style={s.addimg}>
                    <SvgIcon svgs={svgs} name={'camera-icon'} width={17} height={17} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={s.inputWrap}>
                <TextInput
                  placeholder='Child’s first name'
                  style={s.inputStyle}
                  placeholderTextColor={colors.placeholder}
                  value={child?.firstName}
                  onChangeText={(text) => {
                    onChangeChildInfo('firstName', text);
                  }}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    lastNameRef.current.focus();
                  }}
                />
                <TextInput
                  ref={lastNameRef}
                  placeholder='Child’s last name'
                  value={child?.lastName}
                  style={s.inputStyle}
                  placeholderTextColor={colors.placeholder}
                  onChangeText={(text) => {
                    onChangeChildInfo('lastName', text);
                  }}
                />
                <View style={s.dateWrap}>
                  <DatePicker
                    value={new Date(child?.birthDay)}
                    // placeholder={'Their birthday'}
                    onChange={(date) => {
                      if (date) onChangeChildInfo('birthDay', date);
                    }}
                  />
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
                  <TextInput
                    placeholder='Number of weeks premature*'
                    style={s.inputStyle}
                    keyboardType='number-pad'
                    placeholderTextColor={colors.placeholder}
                    onChangeText={(text) => {
                      onChangeChildInfo('noOfWeekPremature', text);
                    }}
                    value={child?.noOfWeekPremature}
                  />
                )}
              </View>
              <View style={s.btnwrap}>
                <Button ButtonText='Continue' textStyle={s.btnText} onPress={onClickContinue} />
                <Button
                  ButtonText='Back'
                  style={AppStyles.backbtn}
                  textStyle={AppStyles.backbtnText}
                  onPress={navigation.goBack}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default KidsProfileScreen;
