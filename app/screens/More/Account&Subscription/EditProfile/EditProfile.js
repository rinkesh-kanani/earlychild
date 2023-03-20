import React, { useCallback, useEffect, useState } from 'react';
import { Platform, View, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button } from '../../../../components/Button';
import HeaderButton from '../../../../components/HeaderButton';
import ScrollableAvoidKeyboard from '../../../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import { USER_PROFILE_FIELD } from '../../../../constants/constant';
import screens from '../../../../constants/screens';
import {
  isEmail,
  isEmpty,
  reauthenticate,
  toastNotification,
  validFirebaseErrorMessage,
} from '../../../../helpers/helpers';
import { colors } from '../../../../styles';
import AppStyles from '../../../../styles/AppStyles';
import s from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDocument } from '../../../../services/userService';
import { setUserData } from '../../../../actions/userActions';
import TextView from '../../../../components/TextView';

const EditProfileScreen = ({ navigation, route }) => {
  const userSelector = useSelector((state) => state.user);

  const { user } = userSelector;
  const { field, fieldValue } = route?.params;

  const [value, setValue] = useState(fieldValue);
  const [label, setLabel] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: `Edit ${label}`,
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
  }, [label, navigation]);

  useEffect(() => {
    if (field === USER_PROFILE_FIELD.FIRSTNAME) setLabel('first name');
    else if (field === USER_PROFILE_FIELD.LASTNAME) setLabel('last name');
    else if (field === USER_PROFILE_FIELD.EMAIL) return setLabel('email');
  }, [field]);

  const onSaveUserInfo = useCallback(
    async (item) => {
      if (isEmpty(value)) {
        toastNotification(`please enter ${label}`);
        return;
      }
      try {
        setLoading(true);
        const result = await dispatch(updateUserDocument(user?.uid, user?.id, item));
        await dispatch(setUserData(result));

        navigation.navigate(screens.AccountAndSubscription);
      } catch (error) {
        console.log('error', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, label, navigation, user?.id, user?.uid, value],
  );

  const onUpdateEmail = useCallback(async () => {
    try {
      if (isEmpty(value)) {
        toastNotification('Please enter email address');
        return;
      } else if (!isEmail(value)) {
        toastNotification('please enter valid email address');
        return;
      }
      setLoading(true);
      await reauthenticate(user?.password)
        .then(() => {
          auth()
            .currentUser.updateEmail(value)
            .then(async () => {
              await onSaveUserInfo({ email: value });
            })
            .catch((error) => {
              console.log('error', error);
              validFirebaseErrorMessage(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  }, [onSaveUserInfo, user?.password, value]);

  const onSave = useCallback(async () => {
    if (field === USER_PROFILE_FIELD.EMAIL) {
      await onUpdateEmail();
    } else {
      let item = {};
      item[field] = value;
      await onSaveUserInfo(item);
    }
  }, [field, onSaveUserInfo, onUpdateEmail, value]);

  return (
    <View style={s.root}>
      <View style={s.rootStyle}>
        <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false}>
          <View style={s.inputWrap}>
            <TextView text={`Your ${label}`} style={s.inputlabel} />
            <TextInput
              placeholder={`Enter ${label}`}
              value={value}
              keyboardType={field === USER_PROFILE_FIELD.EMAIL ? 'email-address' : undefined}
              onChangeText={(value) => setValue(value)}
              returnKeyType={'done'}
              onSubmitEditing={onSave}
              style={s.inputStyle}
              placeholderTextColor={colors.placeholder}
            />
          </View>
          <View style={s.btnwrap}>
            <Button ButtonText='Save' textStyle={s.btnText} isLoading={loading} disabled={loading} onPress={onSave} />
            <Button
              ButtonText='Cancel'
              style={AppStyles.backbtn}
              textStyle={AppStyles.backbtnText}
              onPress={navigation.goBack}
            />
          </View>
        </ScrollableAvoidKeyboard>
      </View>
    </View>
  );
};

export default EditProfileScreen;
