import { View, TextInput, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import s from './styles';
import ScrollableAvoidKeyboard from '../../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import TextView from '../../../components/TextView';
import { colors } from '../../../styles';
import { Button } from '../../../components/Button';
import AppStyles from '../../../styles/AppStyles';
import HeaderButton from '../../../components/HeaderButton';
import screens from '../../../constants/screens';
import auth from '@react-native-firebase/auth';
import { isEmail, isEmpty, toastNotification, validFirebaseErrorMessage } from '../../../helpers/helpers';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const sendresetPasswordEmail = useCallback(async () => {
    try {
      setLoading(true);
      if (isEmpty(email)) {
        toastNotification('Please enter email address');
        return;
      } else if (!isEmail(email)) {
        toastNotification('please enter valid email address');
        return;
      }
      await auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          toastNotification('Please check Your email for password reset');
          navigation.navigate(screens.Login);
        })
        .catch((error) => {
          console.log('error', error);
          validFirebaseErrorMessage(error);
        });
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [email, navigation]);
  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <HeaderButton
          type={1}
          iconName={'chevron-left'}
          onPress={() => navigation.navigate(screens.Login)}
          color={colors.dimGray}
          style={s.addIcon}
          isFeather={Platform.OS === 'ios' ? false : true}
        />
      ),
      headerStyle: AppStyles.hederTwoStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);
  return (
    <View style={s.root}>
      <View style={s.rootStyle}>
        <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false}>
          <View>
            <View style={s.signupWrap}>
              <TextView text={'Forgot Password!'} style={s.titleText} />
            </View>
            <View style={s.inputWrap}>
              <TextInput
                placeholder='Email address'
                keyboardType='email-address'
                value={email}
                onChangeText={(value) => setEmail(value)}
                key={'done'}
                onSubmitEditing={sendresetPasswordEmail}
                style={s.inputStyle}
                placeholderTextColor={colors.placeholder}
              />
            </View>
          </View>
          <View style={s.btnWrap}>
            <Button
              ButtonText='Send Email'
              textStyle={AppStyles.buttonRegular}
              onPress={sendresetPasswordEmail}
              isLoading={loading}
              disabled={loading}
            />
          </View>
          <TouchableOpacity style={s.bmBtn} onPress={() => navigation.navigate(screens.Login)}>
            <TextView text={'Login'} style={s.linktext} />
          </TouchableOpacity>
        </ScrollableAvoidKeyboard>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
