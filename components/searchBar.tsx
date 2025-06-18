import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, Pressable, TextInput } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

type Props = {
  placeHolder: string;
}

const SearchBar: React.FC<Props> = ({ placeHolder }) => (
  <View style={styles.searchBar}>
    <TextInput
      placeholder={placeHolder}
      placeholderTextColor='#888'
      style={styles.searchBarInput} />
    <Ionicons name='search' size={25} color='#0E3549' />
  </View>
);

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: moderateScale(25),
    paddingHorizontal: moderateScale(10),
  },
  searchBarInput: {
    flex: 1,
    padding: 13
  }
})

export default SearchBar;