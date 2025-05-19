import React from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const HorizontalRule = () => {
  return <View style={styles.rule} />;
};

const styles = StyleSheet.create({
  rule: {
    width: moderateScale(500),
    height: moderateScale(1), // grosor de la línea
    backgroundColor: '#FFFFFF', // color visible sobre fondo oscuro 
  },
});

export default HorizontalRule;
