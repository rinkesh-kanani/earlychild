import React from 'react';
import { View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import TextView from '../../components/TextView';
import s from './styles';
import svgs from '../../assets/svg';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '../../styles';
import screens from '../../constants/screens';
import PlayTimeScreen from './PlayTime/PlayTime';
import KidsScreen from './Kids/Kids';
import PhotosScreen from './Photos/Photos';
import SavedScreen from './Saved/Saved';
import { useSelector } from 'react-redux';
import AppAvtar from '../../components/Avtar/AppAvtar';

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({ navigation, route }) => {
  const userSelector = useSelector((state) => state.user);
  const { user } = userSelector;
  const defaultScreen = route?.params?.screen || screens.PlayTime;
  return (
    <SafeAreaView style={s.root}>
      <View style={s.profileWrap}>
        <View style={s.imgWrap}>
          <AppAvtar
            Imgsrc={user?.userProfile ? user?.userProfile : undefined}
            Name={user?.firstName}
            Size={48}
            TextType={'body-head'}
          />

          <TextView text={`${user?.firstName} ${user?.lastName}`} type={'body-head'} style={s.name} />
        </View>
        <TouchableOpacity
          activeOpacity={0.4}
          style={s.iconWrap}
          onPress={() => navigation.navigate(screens.AccountAndSubscription)}>
          <SvgIcon svgs={svgs} name={'settings-icon'} width={18} height={18} />
        </TouchableOpacity>
      </View>
      <View style={s.tabView}>
        <Tab.Navigator
          initialRouteName={defaultScreen}
          tabBarOptions={{
            scrollEnabled: true,
            inactiveTintColor: colors.black,
            activeTintColor: colors.black,
            labelStyle: { fontSize: 12, fontFamily: 'Navigo-Medium', letterSpacing: 0.96, color: colors.textColor },
            indicatorStyle: {
              backgroundColor: colors.primary,
              width: 100,
            },
            indicatorContainerStyle: {
              width: Dimensions.get('screen').width,
            },
            contentContainerStyle: {
              justifyContent: 'center',
            },
            tabStyle: { elevation: 0, width: 100 },
            style: {
              backgroundColor: colors.white,
              shadowOffset: { height: 0, width: 0 },
              shadowOpacity: 0,
              elevation: 0,
              borderBottomWidth: 1,
              borderColor: colors.borderOpacity,
            },
          }}>
          <Tab.Screen
            name={screens.PlayTime}
            component={PlayTimeScreen}
            initialParams={{}}
            options={{ tabBarLabel: 'PLAYTIME' }}
          />
          <Tab.Screen name={screens.Kids} component={KidsScreen} initialParams={{}} options={{ tabBarLabel: 'KIDS' }} />
          <Tab.Screen
            name={screens.Photos}
            component={PhotosScreen}
            initialParams={{}}
            options={{ tabBarLabel: 'PHOTOS' }}
          />
          <Tab.Screen
            name={screens.Saved}
            component={SavedScreen}
            initialParams={{}}
            options={{ tabBarLabel: 'SAVED' }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};
export default ProfileScreen;
