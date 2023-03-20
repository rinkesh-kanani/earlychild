import { SafeAreaView, Switch, View } from 'react-native';
import React from 'react';
import s from './styles';
import TextView from '../../../components/TextView';
import { colors } from '../../../styles';
import AppStyles from '../../../styles/AppStyles';
import { Button } from '../../../components/Button';

const NotificationsScreen = () => {
  return (
    <SafeAreaView style={s.root}>
      <View style={s.paddingView}>
        <View style={s.topWrap}>
          <TextView text={'Get the most out of Earlychild.'} style={s.TitleHead} />
          <TextView
            text={'In order to full experience the benefits of Earlychild, you’ll need to turn on notifications.'}
            type={'body-two'}
            style={s.capsNotification}
          />
        </View>
        <View style={s.notiWrap}>
          <TextView text={'Notifications'} type={'body'} style={s.notiText} />
          <Switch
            ios_backgroundColor={colors.gray}
            trackColor={{ true: colors.primary, false: colors.gray }}
            thumbColor={colors.white}
            //   onValueChange={(val) => { this.onNotificationValueChange(item.id, val) }}
            //   value={value}
          />
        </View>
        <View style={s.btnWrap}>
          <Button ButtonText='Start your free trial' textStyle={AppStyles.buttonRegular} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
