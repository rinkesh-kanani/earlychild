import React, { useCallback, useEffect, useRef, useState } from 'react';
import s from './styles';
import { Platform, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import ScrollableAvoidKeyboard from '../../../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import { colors } from '../../../../styles';
import { isEmpty, reauthenticate, toastNotification } from '../../../../helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDocId, updateUserDocument } from '../../../../services/userService';
import { setUserData } from '../../../../actions/userActions';
import { Button } from '../../../../components/Button';
import AppStyles from '../../../../styles/AppStyles';
import HeaderButton from '../../../../components/HeaderButton';
import screens from '../../../../constants/screens';

const ChangePasswordScreen = ({ navigation }) => {
  const userSelector = useSelector((state) => state.user);
  const { user } = userSelector;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const newPasswordInput = useRef();
  const confirmPasswordInput = useRef();

  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      title: 'Change Password',
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
              navigation.navigate(screens.AccountAndSubscription);
            }}
          />
        </View>
      ),
      headerRight: () => <View></View>,
      headerStyle: s.headerStyle,
      headerTitleStyle: AppStyles.settingHeader,
    });
  }, [navigation]);

  const validatesInputs = useCallback(() => {
    if (isEmpty(currentPassword)) {
      toastNotification('Please enter current Password');
      return false;
    } else if (isEmpty(newPassword)) {
      toastNotification('Please enter new Password');
      return false;
    } else if (newPassword?.length < 8) {
      toastNotification(' New password must be at least 8 character');
      return false;
    } else if (isEmpty(confirmPassword)) {
      toastNotification('Please enter confirm  Password');
      return false;
    } else if (newPassword !== confirmPassword) {
      toastNotification('Passwords are not match');
      return false;
    } else if (currentPassword !== user?.password) {
      toastNotification('The password you entered is not valid');
      return false;
    }
    return true;
  }, [confirmPassword, currentPassword, newPassword, user?.password]);

  const onChangePassword = useCallback(async () => {
    try {
      const isValidate = validatesInputs();
      if (isValidate) {
        setLoading(true);
        await reauthenticate(currentPassword).then(async () => {
          await auth()
            .currentUser.updatePassword(newPassword)
            .then(async () => {
              const newItem = { password: newPassword };
              const user = auth().currentUser;
              const userId = user?.uid;
              const userDocId = await dispatch(getUserDocId(userId));
              const result = await dispatch(updateUserDocument(userId, userDocId, newItem));
              await dispatch(setUserData(result));
            });
        });
        setLoading(false);
        navigation.navigate(screens.AccountAndSubscription);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [currentPassword, dispatch, navigation, newPassword, validatesInputs]);
  return (
    <View style={s.root}>
      <View style={s.rootStyle}>
        <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false}>
          <View>
            <View style={s.inputWrap}>
              <TextInput
                placeholder='Current Password'
                secureTextEntry={true}
                value={currentPassword}
                onChangeText={(value) => setCurrentPassword(value)}
                returnKeyType={'next'}
                onSubmitEditing={() => newPasswordInput.current.focus()}
                style={s.inputStyle}
                placeholderTextColor={colors.placeholder}
              />
            </View>
            <View style={s.inputWrap}>
              <TextInput
                ref={newPasswordInput}
                placeholder='New Password'
                secureTextEntry={true}
                value={newPassword}
                onChangeText={(value) => setNewPassword(value)}
                returnKeyType={'next'}
                onSubmitEditing={() => confirmPasswordInput.current.focus()}
                style={s.inputStyle}
                placeholderTextColor={colors.placeholder}
              />
            </View>
            <View style={s.inputWrap}>
              <TextInput
                ref={confirmPasswordInput}
                placeholder='Confirm New Password'
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(value) => setConfirmPassword(value)}
                returnKeyType={'done'}
                onSubmitEditing={onChangePassword}
                style={s.inputStyle}
                placeholderTextColor={colors.placeholder}
              />
            </View>
          </View>
          <View style={s.btnWrap}>
            <Button
              ButtonText='Update Password'
              textStyle={AppStyles.buttonRegular}
              onPress={onChangePassword}
              isLoading={loading}
              disabled={loading}
            />
          </View>
        </ScrollableAvoidKeyboard>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;
