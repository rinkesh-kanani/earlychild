import React, { useCallback, useEffect, useState } from 'react';
import { View, Platform, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';
import { useDispatch, useSelector } from 'react-redux';
import { updateSignupUser } from '../../../actions/authActions';
import { Button } from '../../../components/Button';
import HeaderButton from '../../../components/HeaderButton';
import Touchable from '../../../components/molecules/Touchable';
import ScrollableAvoidKeyboard from '../../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import TextView from '../../../components/TextView';
import screens from '../../../constants/screens';
import { isEmail, isEmpty, toastNotification } from '../../../helpers/helpers';
import { colors } from '../../../styles';
import AppStyles from '../../../styles/AppStyles';
import s from './Styles';
import TermsOfServiceModal from './TermsOfServiceModal';

const SignupScreen = ({ navigation, route }) => {
  const authSelector = useSelector((state) => state.auth);
  const [isOpenTermsOfServiceModal, setOpenTermsOfServiceModal] = useState(false);
  const { signupUser } = authSelector;
  const dispatch = useDispatch();

  const onOpenPersonInfoModal = useCallback(() => {
    setOpenTermsOfServiceModal(true);
  }, []);

  const onCloseTermsOfServiceModal = useCallback(() => {
    setOpenTermsOfServiceModal(false);
  }, []);
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
    if (route?.params?.error) toastNotification('That email address is already exist!');
  }, [route?.params?.error]);

  const onChangeUserInfo = useCallback(
    (propsName, value) => {
      dispatch(updateSignupUser({ propsName, value }));
    },
    [dispatch],
  );

  const onClickContinue = useCallback(() => {
    try {
      if (isEmpty(signupUser?.email)) {
        toastNotification('Please enter email address');
        return;
      } else if (!isEmail(signupUser?.email)) {
        toastNotification('please enter valid email address');
        return;
      }
      navigation.navigate(screens.CreatePassword);
    } catch (error) {
      console.log(error);
    }
  }, [navigation, signupUser?.email]);

  return (
    <>
      <View style={s.rootStyle}>
        <ScrollableAvoidKeyboard keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>
          <View>
            <View style={s.signupWrap}>
              <TextView text={'Sign up'} style={s.titleText} />
            </View>
            <View style={s.inputWrap}>
              <TextInput
                placeholder='Email address'
                style={s.inputStyle}
                value={signupUser?.email}
                placeholderTextColor={colors.placeholder}
                keyboardType='email-address'
                onChangeText={(email) => onChangeUserInfo('email', email)}
                returnKeyType={'done'}
                onSubmitEditing={onClickContinue}
              />
              <View style={s.rowTerms}>
                <TextView text={`By continuing, you agree to our  `} type={'caps'} style={s.termCondition} />
                <Touchable onPress={onOpenPersonInfoModal}>
                  <TextView text={`Terms of Service`} type={'caps'} style={s.termLink} />
                </Touchable>
                <TextView text={' &'} type={'caps'} style={s.termCondition} />
              </View>
              <Touchable onPress={onOpenPersonInfoModal}>
                <TextView text={`Privacy Policy`} type={'caps'} style={s.termLink} />
              </Touchable>
            </View>
            <View style={s.btnWrap}>
              <Button ButtonText='Continue' textStyle={AppStyles.buttonRegular} onPress={onClickContinue} />
            </View>
          </View>
        </ScrollableAvoidKeyboard>
      </View>
      <Modal
        style={s.modal}
        isOpen={isOpenTermsOfServiceModal}
        entry={'bottom'}
        position={'bottom'}
        coverScreen={true}
        backdrop={true}
        swipeToClose={true}
        backdropColor={colors.black}
        backdropOpacity={0.6}
        backdropPressToClose={true}
        onClosed={onCloseTermsOfServiceModal}>
        <TermsOfServiceModal onRequestClose={onCloseTermsOfServiceModal} />
      </Modal>
    </>
  );
};
export default SignupScreen;
