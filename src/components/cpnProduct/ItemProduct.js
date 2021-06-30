import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const ItemProduct = props => {
  return (
    <TouchableOpacity style={styles.main}>
      <Text>Go to detail</Text>
    </TouchableOpacity>
  );
};

export default ItemProduct;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: 250,
    height: 250,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDes: {
    color: 'blue',
    fontSize: 20,
  },
});
