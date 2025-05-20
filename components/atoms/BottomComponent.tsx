import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'

/*ESTE ES EL BOTON CON FONDO GRIS UTILIZADO EN LAS PRIMERAS PANTALLAS DE LA APP */

const BottomComponent: React.FC<BottomComponentProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.bottomContainer}
        >
            <Text style={styles.bottomText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bottomContainer: {
        backgroundColor: 'rgba(164, 148, 148, 0.4)',
        width: '100%',
        paddingVertical: verticalScale(13),
        paddingHorizontal: verticalScale(75),
        borderRadius: verticalScale(30),
    },
    bottomText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: moderateScale(12),
    },
})

export default BottomComponent;