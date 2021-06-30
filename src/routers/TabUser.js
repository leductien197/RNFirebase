import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import User from '../screens/user/User';
import * as ScreenTypes from '../navigation/ScreenType';
export default function TabProduct() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={ScreenTypes.User} component={User} />
    </Stack.Navigator>
  );
}
