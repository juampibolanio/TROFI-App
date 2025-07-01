import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

type Props = {
  placeHolder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({ placeHolder, value, onChangeText }) => (
  <View style={styles.searchBar}>
    <TextInput
      placeholder={placeHolder}
      placeholderTextColor='#888'
      style={styles.searchBarInput}
      value={value}
      onChangeText={onChangeText}
    />
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