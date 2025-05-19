import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Ionicons } from '@expo/vector-icons'

/* ESTE ES EL BOTON QUE SE UTILIZA DESDE SETTINGS EN ADELANTE  */

const settingsButton = ({ title, iconName }: any) => {
    return (
        <Pressable style={styles.bottonContainer}>
            <Ionicons name={iconName} size={38} color='#0E3549' style={styles.icon} />
            <Text style={styles.bottomText}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    bottonContainer: {
        width: moderateScale(310),
        height: moderateScale(50),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#D9D9D9',
        borderRadius: verticalScale(30),
    },
    bottomText: {
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: moderateScale(14),
    },
    icon: {
        
    }

})

export default settingsButton
