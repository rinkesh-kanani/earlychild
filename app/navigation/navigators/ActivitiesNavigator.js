import React from 'react';
import screens from '../../constants/screens';
import { createStackNavigator } from '@react-navigation/stack';
import ActivitiesScreen from '../../screens/Activities/Activities';

const Stack = createStackNavigator();

const ActivitiesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={screens.ActivitiesRoot}>
      <Stack.Screen name={screens.Activities} component={ActivitiesScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

export default ActivitiesNavigator;
