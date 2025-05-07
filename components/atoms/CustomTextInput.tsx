import imagePath from '@/constants/imagePath';
import React, { useState } from 'react'
import { ImageSourcePropType, TextInput, TextInputProps, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters';

interface CustomTextInputProps extends TextInputProps {
    isPassword?: boolean;
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
    isPassword = false,
    ...restOfProps

}) => {

    /* ESTADO PARA LA VISIBILIDAD DE LA CONTRASEÑA */
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    /* MANEJAR EL CLICK AL PRESIONAR EL ICONO */

    const handleIconPress = () => {
        if (isPassword) {
            setIsPasswordVisible(!isPasswordVisible);
        } else {
            if (restOfProps.onChangeText) {
                restOfProps.onChangeText('');
            }
        }
    }

    /*DEFINIR Q ICONO UTILIZAR */

    let iconToShow: ImageSourcePropType | null = null;
    let shouldShowIcon = false

    if (isPassword) {
        /* SI ES UN CAMPO DE CONTRASEÑA, SE USAN LOS ÍCONOS DE SHOWPASSWORD */
        shouldShowIcon = true;
        iconToShow = isPasswordVisible ? imagePath.showPassBottom : imagePath.noShowPassBottom;
    } else {
        /* SI ES UN CAMPO NORMAL SE USA EL ÍCONO DE LA X */
        if (restOfProps.value != null && String(restOfProps.value).length > 0) {
            shouldShowIcon = true;
            iconToShow = imagePath.closeBottom
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, { paddingRight: shouldShowIcon ? 35 : 10 }]}
                {...restOfProps}
                secureTextEntry={isPassword && !isPasswordVisible}
                placeholderTextColor="#F5F0F0"
            />

            {/*BOTÓN DEL ÍCONO */}
            {shouldShowIcon && iconToShow && (
                <TouchableOpacity
                    onPress={handleIconPress}
                    style={styles.iconBottom}
                    disabled={!isPassword && !restOfProps.onChangeText}
                >
                    <Image
                        source={iconToShow}
                        style={styles.iconImage}
                    />


                </TouchableOpacity>
            )
            }
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