import React, { useCallback, useEffect, useMemo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import AppStyles from '../../styles/AppStyles';
import screens from '../../constants/screens';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/userService';
import TextView from '../../components/TextView';
import s from './styles';
import Icon from '../../components/Icon';
import { colors } from '../../styles';
import { CommonActions } from '@react-navigation/native';

const MoreScreen = ({ navigation }) => {
  const userSelector = useSelector((state) => state.user);
  const { user } = userSelector;

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <TextView text={'More'} type={'title'} style={s.headerText} />
        </View>
      ),
      headerStyle: s.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const dispatch = useDispatch();
  const onClickLogout = useCallback(async () => {
    const result = await dispatch(logout());
    if (result)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: screens.Login,
            },
          ],
        }),
      );
  }, [dispatch, navigation]);

  const userEmailView = useMemo(() => {
    return <TextView text={user?.email} type={'body-one'} style={s.emailText} />;
  }, [user?.email]);

  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.moreList}>
          <TouchableOpacity
            style={s.moreWrap}
            onPress={() => {
              navigation.navigate(screens.HelpGuide);
            }}>
            <TextView text={'Help Guide'} type={'body-one'} style={s.leftText} />
            <Icon name={'chevron-right'} color={colors.greyIcon} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={s.moreWrap}
            onPress={() => {
              navigation.navigate(screens.AccountAndSubscription);
            }}>
            <TextView text={'Account & Susbcription'} type={'body-one'} style={s.leftText} />
            <Icon name={'chevron-right'} color={colors.greyIcon} size={20} />
          </TouchableOpacity>
          <View style={s.moreWrap}>
            <TextView text={'Notifications'} type={'body-one'} style={s.leftText} />
            <Icon name={'chevron-right'} color={colors.greyIcon} size={20} />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(screens.TermsAndConditions);
            }}
            style={s.moreWrap}>
            <TextView text={'Terms & Conditions'} type={'body-one'} style={s.leftText} />
            <Icon name={'chevron-right'} color={colors.greyIcon} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={s.moreWrap}
            onPress={() => {
              navigation.navigate(screens.PrivacyPolicy);
            }}>
            <TextView text={'Privacy Policy'} type={'body-one'} style={s.leftText} />
            <Icon name={'chevron-right'} color={colors.greyIcon} size={20} />
          </TouchableOpacity>
        </View>
        <View style={s.logWrap}>
          <View style={s.logText}>
            <TextView text={'Logged in as'} type={'body-two'} style={s.loggText} />
            {userEmailView}
          </View>
          <View style={s.btnWrap}>
            <Button ButtonText='Logout' textStyle={AppStyles.buttonRegular} onPress={onClickLogout} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MoreScreen;
