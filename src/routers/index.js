import * as ScreenTypes from '../navigation/ScreenType';
import React, {useEffect} from 'react';
import Main from './Main';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="ModalStack" component={ModalStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ModalStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainStackScreen"
      headerMode="none"
      mode="modal">
      <Stack.Screen name="MainStackScreen" component={MainStackScreen} />
    </Stack.Navigator>
  );
}

function MainStackScreen() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={ScreenTypes.Main}>
      <Stack.Screen name={ScreenTypes.Main} component={Main} />
    </Stack.Navigator>
  );
}

export default App;
