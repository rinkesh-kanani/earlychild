import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from '../../../components/Button';
import TextView from '../../../components/TextView';
import AppStyles from '../../../styles/AppStyles';
import s from './Styles';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { isEmail, isEmpty, toastNotification, validFirebaseErrorMessage } from '../../../helpers/helpers';
import asyncStorageHelpers from '../../../helpers/asyncStorageHelpers';
import { saveAuthUser } from '../../../utils/localStorage';
import { CommonActions } from '@react-navigation/native';
import screens from '../../../constants/screens';
import { updateSigninUser } from '../../../actions/authActions';
import { colors } from '../../../styles';
import { isExistChild } from '../../../services/childService';
import { appInit } from '../../../helpers/appInitHelpers';
import ScrollableAvoidKeyboard from '../../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import { getUserDocId, IsPasswordMatch, updateUserDocument } from '../../../services/userService';

const LoginScreen = ({ navigation }) => {
  const authSelector = useSelector((state) => state.auth);
  const { signinUser } = authSelector;
  const [loading, setLoading] = useState(false);
  const passwordInput = useRef();
  const dispatch = useDispatch();

  const onChangeUserInfo = useCallback(
    (propsName, value) => {
      dispatch(updateSigninUser({ propsName, value }));
    },
    [dispatch],
  );

  const onLogin = useCallback(async () => {
    try {
      if (isEmpty(signinUser.email)) {
        toastNotification('Please enter email address');
        return;
      } else if (!isEmail(signinUser.email)) {
        toastNotification('please enter valid email address');
        return;
      } else if (isEmpty(signinUser.password)) {
        toastNotification('Please enter password');
        return;
      }
      setLoading(true);
      await auth()
        .signInWithEmailAndPassword(signinUser.email, signinUser.password)
        .then(async () => {
          const isUserLoggedInBefore = await asyncStorageHelpers.getIsLoggedInBefore();
          if (!isUserLoggedInBefore) await asyncStorageHelpers.saveIsLoggedInBefore(true);
          const idTokenResult = await auth().currentUser.getIdTokenResult();
          await asyncStorageHelpers.setIsPlaytimeDismiss(false);
          await saveAuthUser(idTokenResult);

          const isExistChildData = await dispatch(isExistChild());
          const userId = auth().currentUser?.uid;
          const isPasswordMathcOrNot = await dispatch(IsPasswordMatch(userId, signinUser.password));
          if (!isPasswordMathcOrNot) {
            const userDocId = await dispatch(getUserDocId(userId));
            await dispatch(updateUserDocument(userId, userDocId, { password: signinUser.password }));
          }
          await dispatch(appInit());

          let screen = screens.NavigationRoot;
          if (!isExistChildData) screen = screens.ParentsProfile;

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: screen,
                },
              ],
            }),
          );
        })
        .catch((error) => {
          setLoading(false);
          console.log(JSON.stringify(error.message));
          validFirebaseErrorMessage(error);
        });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigation, signinUser.email, signinUser.password]);

  return (
    <SafeAreaView style={s.root}>
      <View style={s.rootStyle}>
        <ScrollableAvoidKeyboard keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>
          <View>
            <View style={s.signupWrap}>
              <TextView text={'Welcome back!'} style={s.titleText} />
            </View>

            <View style={s.inputWrap}>
              <TextInput
                placeholder='Email address'
                keyboardType='email-address'
                value={signinUser.email}
                style={s.inputStyle}
                placeholderTextColor={colors.placeholder}
                onChangeText={(email) => onChangeUserInfo('email', email.trim())}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  passwordInput.current.focus();
                }}
              />
              <View style={s.inputRow}>
                <TextInput
                  ref={passwordInput}
                  placeholder='Password'
                  secureTextEntry={true}
                  style={s.inputStyle}
                  placeholderTextColor={colors.placeholder}
                  value={signinUser.password}
                  onChangeText={(password) => onChangeUserInfo('password', password)}
                  returnKeyType={'done'}
                  onSubmitEditing={onLogin}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate(screens.ForgotPassword)} style={s.forgateView}>
              <TextView text={'FORGOT PASSWORD?'} style={s.fgpassword} />
            </TouchableOpacity>
            <View style={s.btnWrap}>
              <Button
                ButtonText='Log in'
                textStyle={AppStyles.buttonRegular}
                onPress={onLogin}
                isLoading={loading}
                disabled={loading}
              />
            </View>
          </View>
          <View style={s.textNew}>
            <TextView text={'New to Earlychild?'} type={'body-two'} style={s.newEarly} />
          </View>
          <TouchableOpacity style={s.bmBtn} onPress={() => navigation.navigate(screens.Signup)}>
            <TextView text={'SIGN UP FOR FREE'} style={s.linktext} />
          </TouchableOpacity>
        </ScrollableAvoidKeyboard>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
