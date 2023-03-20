import React, { useEffect } from 'react';
import screens from '../../constants/screens';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { colors, fontSizes, fontWeights } from '../../styles';
import ProfileScreen from '../../screens/Profile/Profile';
import { useDispatch } from 'react-redux';
import { setProfileRoot } from '../../actions/appActions';

const Stack = createStackNavigator();

const ProfileNavigator = ({ route }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProfileRoot(true));
  }, [dispatch]);

  return (
    <Stack.Navigator
      initialRouteName={screens.ProfileRoot}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name={screens.Profile}
        component={ProfileScreen}
        initialParams={route?.params ?? undefined}
        options={{
          title: '',
          headerStyle: { backgroundColor: colors.backgroundColor },
          headerTitleStyle: {
            color: colors.midBlack,
            fontSize: fontSizes.bodyTwo,
            fontWeight: fontWeights.bold,
          },
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
