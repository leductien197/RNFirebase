import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import Product from '../screens/product/Product';
import DetailProduct from '../screens/product/DetailProduct';
import * as ScreenTypes from '../navigation/ScreenType';
export default function TabProduct() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={ScreenTypes.Product} component={Product} />
      <Stack.Screen
        name={ScreenTypes.DetailProduct}
        component={DetailProduct}
      />
    </Stack.Navigator>
  );
}
