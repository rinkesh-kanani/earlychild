import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import screens from '../constants/screens';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../assets/svg';
import AppStyles from '../styles/AppStyles';
import fontWeights from '../styles/fontWeights';
import colors from '../styles/colors';
import { scale } from '../utils/scale';
import { halfindent, lessIndent } from '../styles/dimensions';
import { IS_IPHONE_X, STATUS_BAR_HEIGHT } from '../constants/constant';
import { ActivitiesNavigator, HomeNavigator, MilestonesNavigator, ProfileNavigator } from './navigators';
import MoreNavigator from './navigators/MoreNavigator';
const Tab = createBottomTabNavigator();

export default function NavigationTabs() {
  return (
    <>
      <View style={AppStyles.rootStyle}>
        <Tab.Navigator
          initialRouteName={screens.NavigationRoot}
          shifting={false}
          keyboardHidesNavigationBar={Platform.OS !== 'ios'}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;
              if (route.name === screens.HomeRoot) {
                iconName = focused ? 'home-active-icon' : 'home-inactive-icon';
              } else if (route.name === screens.ActivitiesRoot) {
                iconName = focused ? 'activities-active-icon' : 'activities-inactive-icon';
              } else if (route.name === screens.MilestonesRoot) {
                iconName = focused ? 'milestones-active-icon' : 'milestones-inactive-icon';
              } else if (route.name === screens.ProfileRoot) {
                iconName = focused ? 'profile-active-icon' : 'profile-inactive-icon';
              } else if (route.name === screens.MoreRoot) {
                iconName = focused ? 'more-active-icon' : 'more-inactive-icon';
              }

              // You can return any component that you like here!
              return <SvgIcon svgs={svgs} name={iconName} width={32} height={32} style={{ marginTop: 5 }} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#3B73B6',
            inactiveTintColor: '#7D7F81',
            labelStyle: {
              fontSize: 10,
              fontWeight: fontWeights.medium,
              fontFamily: 'Navigo-Regular',
              marginBottom: 5,
            },
            style: {
              backgroundColor: colors.white,
              paddingBottom: halfindent - 1,
              height: scale(73),
            },
          }}>
          <Tab.Screen
            name={screens.HomeRoot}
            component={HomeNavigator}
            options={{
              tabBarLabel: 'Home',
              headerShown: false,
            }}
          />

          <Tab.Screen
            name={screens.ActivitiesRoot}
            component={ActivitiesNavigator}
            options={{
              tabBarLabel: 'Activities',
              headerShown: false,
            }}
          />

          <Tab.Screen
            name={screens.MilestonesRoot}
            component={MilestonesNavigator}
            options={{
              tabBarLabel: 'Milestones',
              headerShown: false,
            }}
          />
          <Tab.Screen
            name={screens.ProfileRoot}
            component={ProfileNavigator}
            options={{
              tabBarLabel: 'You',
              headerShown: false,
            }}
          />
          <Tab.Screen
            name={screens.MoreRoot}
            component={MoreNavigator}
            options={{
              tabBarLabel: 'More',
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </View>
      <View style={s.customizeSafeAreaView} />
    </>
  );
}

const s = StyleSheet.create({
  customizeSafeAreaView: {
    flex: 0,
    backgroundColor: colors.white,
    paddingBottom: IS_IPHONE_X ? STATUS_BAR_HEIGHT - lessIndent : 0,
  },
});
