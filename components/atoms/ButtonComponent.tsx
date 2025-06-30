import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { moderateScale} from 'react-native-size-matters'
import { Ionicons } from '@expo/vector-icons'

interface ButtonComponentProps {
  title: string
  onPress: () => void
  iconName: keyof typeof Ionicons.glyphMap
  disabled?: boolean
}

const ButtonComponent = ({ title, iconName, onPress, disabled = false }: ButtonComponentProps) => {
  return (
    <TouchableOpacity 
      style={[styles.ButtonContainer, disabled && styles.disabledButton]} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Ionicons 
          name={iconName} 
          size={moderateScale(20)} 
          color={disabled ? "#999" : "#000000"} 
          style={styles.icon} 
        />
        <Text style={[styles.buttonText, disabled && styles.disabledText]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  ButtonContainer: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#E5E5E5',
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: moderateScale(10),
  },
  buttonText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: moderateScale(15),
    textAlign: 'center',
    flexShrink: 1,
  },
  disabledText: {
    color: '#999',
  },
})

export default ButtonComponent