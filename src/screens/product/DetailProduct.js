import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DetailProduct = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.textDetail}>This is DetailProduct</Text>
    </View>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDetail: {
    fontSize: 24,
    color: 'blue',
  },
});
