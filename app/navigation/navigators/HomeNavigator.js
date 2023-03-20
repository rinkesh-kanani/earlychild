import React from 'react';
import screens from '../../constants/screens';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/Home/Home';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={screens.HomeRoot}>
      <Stack.Screen name={screens.Home} component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
