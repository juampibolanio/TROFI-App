import React from 'react'
import { Text, 
    StyleSheet,
    View,
    SafeAreaView,
    Image,
} from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import imagePath from '@/constants/imagePath'
import { Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto'

    const contact = () => {
    return (
        <View style={estilos.header}>
            <Text style={estilos.sape}>
                Contacto
            </Text>
        </View>
    )
}


    const estilos = StyleSheet.create({
    header: {
        height: verticalScale(75),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0E3549',
    
    },
    sape: {
        flex: 1,
        backgroundColor: '#0E3549',
        fontFamily: 'Roboto_400Regular',
        fontSize: 12,
        color: '#FFFFFF',
        padding: 25,
    } 
})

export default contact;