import { View, Platform, Share } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';
import TextView from '../../../components/TextView';
import s from './styles';
import AppStyles from '../../../styles/AppStyles';
import HeaderButton from '../../../components/HeaderButton';
import { colors } from '../../../styles';
import { Button } from '../../../components/Button';
import screens from '../../../constants/screens';
import { toastNotification } from '../../../helpers/helpers';

const ShareScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Share with friends',
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
              navigation.navigate(screens.More);
            }}
          />
        </View>
      ),
      headerRight: () => <View></View>,
      headerStyle: s.headerStyle,
      headerTitleStyle: AppStyles.settingHeader,
    });
  }, [navigation]);

  const onShare = useCallback(async () => {
    try {
      const message = 'https://activities.learnwithearlybird.com';
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // toastNotification('Share');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismiss');
      }
    } catch (error) {
      toastNotification(error.message);
    }
  }, []);

  return (
    <View style={s.root}>
      <View style={s.paddingWrap}>
        <TextView text={'Share with friends'} style={s.screenText} />
        <TextView
          text={'Share your unique link with anyone you think would like Earlychild.'}
          type={'body-one'}
          style={s.sharCaps}
        />
        <View style={s.btnContain}>
          <Button style={s.btnWrap} onPress={onShare}>
            <SvgIcon svgs={svgs} name={'share-icon'} width={18} height={21} />
            <TextView text={'Share buddy link'} type={'body-head'} style={s.btnText} />
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ShareScreen;
