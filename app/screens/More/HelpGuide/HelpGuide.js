import { View, Platform } from 'react-native';
import React, { useEffect } from 'react';
import HeaderButton from '../../../components/HeaderButton';
import { colors } from '../../../styles';
import TextView from '../../../components/TextView';
import AppStyles from '../../../styles/AppStyles';
import s from './styles';
import screens from '../../../constants/screens';
import ScrollableAvoidKeyboard from '../../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';

const HelpGuideScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Help Guide',
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
          <View style={s.blockWrap}>
            <TextView text={'Heading'} style={s.helpHead} />
            <TextView
              text={`Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. `}
              type={'body-one'}
              style={s.helpCaps}
            />
          </View>
          <View style={s.blockWrap}>
            <TextView text={'Heading'} style={s.helpHead} />
            <TextView
              text={`Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. `}
              type={'body-one'}
              style={s.helpCaps}
            />
          </View>
          <View style={s.blockWrap}>
            <TextView text={'Heading'} style={s.helpHead} />
            <TextView
              text={`Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. `}
              type={'body-one'}
              style={s.helpCaps}
            />
          </View>
        </View>
      </ScrollableAvoidKeyboard>
    </View>
  );
};

export default HelpGuideScreen;
