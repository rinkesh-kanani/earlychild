import React from 'react';
import screens from '../../constants/screens';
import { createStackNavigator } from '@react-navigation/stack';
import MilestonesScreen from '../../screens/Milestones/Milestones';

const Stack = createStackNavigator();

const MilestonesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={screens.MilestonesRoot}>
      <Stack.Screen name={screens.Milestones} component={MilestonesScreen} options={{ headerShown: true, headerStyle: { height: 80 } }} />
    </Stack.Navigator>
  );
};

export default MilestonesNavigator;
