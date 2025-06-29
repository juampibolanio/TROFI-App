import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Ionicons } from '@expo/vector-icons'

interface ButtonComponentProps {
  title: string
  onPress: () => void
  iconName: keyof typeof Ionicons.glyphMap
}

const ButtonComponent = ({ title, iconName, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.ButtonContainer} onPress={onPress}>
      <View style={styles.content}>
        <Ionicons name={iconName} size={26} color="#000" style={styles.icon} />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  ButtonContainer: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    paddingVertical: verticalScale(18),
    paddingHorizontal: verticalScale(20),
    borderRadius: verticalScale(30),
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: moderateScale(10),
    color: "#0E3549"
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: moderateScale(16), 
    textAlign: 'center',
  },
})

export default ButtonComponent
