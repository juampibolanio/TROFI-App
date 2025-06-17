import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    Image,
} from 'react-native'
import { verticalScale } from 'react-native-size-matters'

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