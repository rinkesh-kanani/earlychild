import React from 'react';
import screens from '../../constants/screens';
import { createStackNavigator } from '@react-navigation/stack';
import MoreScreen from '../../screens/More/More';

const Stack = createStackNavigator();

const MoreNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={screens.MoreRoot}>
      <Stack.Screen name={screens.More} component={MoreScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

export default MoreNavigator;
