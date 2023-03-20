import { View, Platform } from 'react-native';
import React, { useEffect } from 'react';
import HeaderButton from '../../../components/HeaderButton';
import { colors } from '../../../styles';
import screens from '../../../constants/screens';
import TextView from '../../../components/TextView';
import AppStyles from '../../../styles/AppStyles';
import s from './styles';
import ScrollableAvoidKeyboard from '../../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';

const TermsConditionScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Terms & Conditions',
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
  return (
    <View style={s.root}>
      <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false}>
        <View style={s.paddingWrap}>
          <TextView text={'Terms & Conditions'} style={s.TextHead} />
          <TextView text={'1.1 General Terms & Conditions'} type={'caption'} style={s.point} />
          <TextView
            text={`Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.


Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor.


Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui. Maecenas faucibus mollis interdum. Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla.


Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec sed odio dui. Vestibulum id ligula porta felis euismod semper.`}
            type={'caption'}
            style={s.details}
          />
        </View>
      </ScrollableAvoidKeyboard>
    </View>
  );
};

export default TermsConditionScreen;
