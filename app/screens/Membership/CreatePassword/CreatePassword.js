import { Platform, TextInput, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';
import TextView from '../../../components/TextView';
import { Button } from '../../../components/Button';
import AppStyles from '../../../styles/AppStyles';
import s from './styles';
import HeaderButton from '../../../components/HeaderButton';
import { colors } from '../../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateOnBoardingUser, updateSignupUser } from '../../../actions/authActions';
import { isEmpty, toastNotification, validFirebaseErrorMessage } from '../../../helpers/helpers';
import auth from '@react-native-firebase/auth';
import { createUserNewDocument } from '../../../services/userService';
import screens from '../../../constants/screens';
import asyncStorageHelpers from '../../../helpers/asyncStorageHelpers';
import { saveAuthUser } from '../../../utils/localStorage';
import { CommonActions } from '@react-navigation/native';
import ScrollableAvoidKeyboard from '../../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';

const CreatePasswordScreen = ({ navigation }) => {
  const authSelector = useSelector((state) => state.auth);
  const { signupUser } = authSelector;
  const confirmPasswordInput = useRef();
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
    return () => {
      dispatch(updateSignupUser({ propsName: 'password', value: '' }));
      dispatch(updateSignupUser({ propsName: 'confirmPassword', value: '' }));
    };
  }, [dispatch]);

  const onChangeUserInfo = useCallback(
    (propsName, value) => {
      dispatch(updateSignupUser({ propsName, value }));
    },
    [dispatch],
  );

  const onClickContinue = useCallback(async () => {
    try {
      if (isEmpty(signupUser?.password)) {
        toastNotification('Please enter password');
        return;
      } else if (signupUser?.password?.length < 8) {
        toastNotification('Use atleast 8 character password');
        return;
      } else if (signupUser?.confirmPassword !== signupUser?.password) {
        toastNotification('Passwords are not match');
        return;
      }

      setLoading(true);
      await auth()
        .createUserWithEmailAndPassword(signupUser?.email, signupUser?.password)
        .then(async (userCredential) => {
          const userId = userCredential?.user?.uid;
          let newUser = JSON.parse(JSON.stringify(signupUser));
          delete newUser?.confirmPassword;
          const result = await dispatch(createUserNewDocument(userId, newUser));
          const isUserLoggedInBefore = await asyncStorageHelpers.getIsLoggedInBefore();
          if (!isUserLoggedInBefore) await asyncStorageHelpers.saveIsLoggedInBefore(true);
          const idTokenResult = await auth().currentUser.getIdTokenResult();
          console.log('idTokenResult', idTokenResult);
          await saveAuthUser(idTokenResult);

          if (result) {
            dispatch(updateOnBoardingUser({ propsName: 'uid', value: userId }));

            dispatch(updateOnBoardingUser({ propsName: 'id', value: result?.id }));
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: screens.ParentsProfile,
                  },
                ],
              }),
            );
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(JSON.stringify(error.message));
          validFirebaseErrorMessage(error);
          if (error.code === 'auth/email-already-in-use') navigation.navigate(screens.Signup, { error });
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigation, signupUser]);

  return (
    <View style={s.rootStyle}>
      <ScrollableAvoidKeyboard keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>
        <View>
          <View style={s.signupWrap}>
            <TextView text={'Create a password'} style={s.titleText} />
          </View>
          <View style={s.inputWrap}>
            <View style={s.inputRow}>
              <TextInput
                placeholder='Enter a password'
                value={signupUser?.password}
                secureTextEntry={true}
                style={s.inputStyle}
                placeholderTextColor={colors.placeholder}
                onChangeText={(password) => onChangeUserInfo('password', password)}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  confirmPasswordInput.current.focus();
                }}
              />
              <SvgIcon svgs={svgs} name={'lock-icon'} width={16} height={18} style={s.lockIcon} />
            </View>
            <View style={s.inputRow}>
              <TextInput
                ref={confirmPasswordInput}
                placeholder='Re-enter password'
                value={signupUser?.confirmPassword}
                secureTextEntry={true}
                style={s.inputStyle}
                placeholderTextColor={colors.placeholder}
                onChangeText={(confirmPassword) => onChangeUserInfo('confirmPassword', confirmPassword)}
                returnKeyType={'done'}
                onSubmitEditing={onClickContinue}
              />
              <SvgIcon svgs={svgs} name={'lock-icon'} width={16} height={18} style={s.lockIcon} />
            </View>
          </View>
          <View style={s.btnWrap}>
            <Button
              ButtonText='Continue'
              textStyle={AppStyles.buttonRegular}
              onPress={onClickContinue}
              isLoading={loading}
              disabled={loading}
            />
          </View>
        </View>
      </ScrollableAvoidKeyboard>
    </View>
  );
};

export default CreatePasswordScreen;
