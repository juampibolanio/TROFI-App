import imagePath from '@/constants/imagePath';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { ImageSourcePropType, TextInput, TextInputProps, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters';

interface CustomTextInputProps extends TextInputProps {
    isPassword?: boolean;
    selectionColor?: string; 
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
    isPassword = false,
    selectionColor = '#FFFFFF', 
    ...restOfProps
}) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const handleIconPress = () => {
        if (isPassword) {
            setIsPasswordVisible(!isPasswordVisible);
        } else {
            if (restOfProps.onChangeText) {
                restOfProps.onChangeText('');
            }
        }
    }

    let shouldShowIcon = false;

    if (isPassword) {
        shouldShowIcon = true;
    } else {
        if (restOfProps.value != null && String(restOfProps.value).length > 0) {
            shouldShowIcon = true;
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, { paddingRight: shouldShowIcon ? 35 : 10 }]}
                {...restOfProps}
                secureTextEntry={isPassword && !isPasswordVisible}
                placeholderTextColor="#F5F0F0"
                selectionColor={selectionColor} 
            />

            {shouldShowIcon && (
                <TouchableOpacity
                    onPress={handleIconPress}
                    style={styles.iconBottom}
                    disabled={!isPassword && !restOfProps.onChangeText}
                >
                    {isPassword ? (
                        isPasswordVisible ? (
                            <Ionicons name="eye-outline" size={24} color="white" />
                        ) : (
                            <Ionicons name="eye-off-outline" size={24} color="white" />
                        )
                    ) : (
                        <Ionicons name="close" size={24} color="white" />
                    )}
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    input: {
        height: verticalScale(40),
        borderWidth: moderateScale(1),
        borderColor: '#FFFFFF',
        borderRadius: moderateScale(1.5),
        borderLeftWidth: moderateScale(5),
        paddingHorizontal: moderateScale(10),
        color: '#FFFFFF',
        backgroundColor: 'rgba(164, 148, 148, 0.4)',
    },
    iconBottom: {
        position: 'absolute',
        right: 5,
        top: '37%',
        transform: [{ translateY: -10 }],
        padding: 5,
        zIndex: 1,
    },
    iconImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        tintColor: '#FFFFFF'
    }
})
