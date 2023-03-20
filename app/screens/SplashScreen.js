import { CommonActions } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../assets/svg';
import screens from '../constants/screens';
import { colors } from '../styles';
import { setupToken } from '../utils/authTokenHelpers';
import s from './styles';
import { isExistChild } from '../services/childService';
import { useDispatch } from 'react-redux';
import { isExistUserName } from '../services/userService';
import TextView from '../components/TextView';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loadData = useCallback(async () => {
    const token = await setupToken();
    setTimeout(async () => {
      // const isUserLoggedInBefore = await asyncStorageHelpers.getIsLoggedInBefore();
      let screen = screens.Login;
      if (token) {
        const isCompleteUserProfile = await dispatch(isExistUserName());
        if (!isCompleteUserProfile) screen = screens.ParentsProfile;
        else {
          const isExistChildData = await dispatch(isExistChild());
          if (!isExistChildData) screen = screens.KidsProfile;
          else screen = screens.NavigationRoot;
        }
      }
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
    }, 1000);
  }, [dispatch, navigation]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <View style={s.rootSplace}>
      <StatusBar backgroundColor={colors.transparent} barStyle={'dark-content'} translucent={true} />
      <View style={s.iconWrap}>
        <TextView text={'Earlychild'} type={'header'} style={s.welText}/>
      </View>
    </View>
  );
};

export default SplashScreen;
