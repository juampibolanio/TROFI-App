import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { verticalScale, moderateScale } from 'react-native-size-matters'


/*para el error BottomComponentProps sin haberlo declarado antes.*/
interface BottomComponentProps {
  title: string;
  onPress: () => void;
}

/ESTE ES EL BOTON CON FONDO GRIS UTILIZADO EN LAS PRIMERAS PANTALLAS DE LA APP/

<<<<<<< HEAD
const BottomComponent = ({ title }: any) => {
=======

const BottomComponent: React.FC<BottomComponentProps> = ({ title, onPress }) => {
>>>>>>> db6571816590ddcbd13f4f4b904797ed0ee5214b
    return (
        <TouchableOpacity style={styles.bottonContainer}>
            <Text style={styles.bottomText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bottonContainer: {
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
    }
})

export default BottomComponent