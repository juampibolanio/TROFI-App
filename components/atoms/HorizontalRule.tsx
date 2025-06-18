import React from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const HorizontalRule = () => {
  return <View style={styles.rule} />;
};

const styles = StyleSheet.create({
  rule: {
    width: moderateScale(500),
    height: moderateScale(1), 
    backgroundColor: '#FFFFFF', 
  },
});

export default HorizontalRule;
