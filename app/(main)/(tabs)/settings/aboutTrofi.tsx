import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Roboto_300Light, Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import imagePath from '@/constants/imagePath';

const AboutTrofi = () => {

    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        Roboto_300Light,
    });

    // Estado para la animacion de expansion de la Pregunta
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.container}>
            {/* Cabecera */}
            <View style={styles.header}>
                <Image source={imagePath.icon} style={styles.icon} />
            </View>

            {/*contenido principal */}
            <View style={styles.content}>

                <TouchableOpacity style={styles.button} onPress={toggleExpand}>
                    <Text style={styles.buttonText}>Acerca de TROFI</Text>
                </TouchableOpacity>
                {/* boton ACERCA DE */}
                {isExpanded && (
                    <View style={styles.drawerBox}>
                        <Text style={styles.drawerText}>
                            La aplicación TROFI es una aplicación para quienes buscan trabajos y oficios,
                            ya sea un profesional en áreas de electricidad, albañilería, plomería y demás, o para quienes
                            buscan ofrecer su trabajo y tener un perfil profesional donde conseguir nuevos clientes o profesionales.{"\n\n"}
                            ¿Buscas un profesional confiable para reparaciones, construcciones o instalaciones? En TROFI tienes acceso a los mejores, con reseñas y precios transparentes.
                        </Text>
                    </View>
                )}

                <Text style={styles.versionText}>Versión 1.0.0.0</Text>
                <Text style={styles.updateText}>Última actualización: [20/05/2025]</Text>
                <Text style={styles.updateText}>Desarrollado por: CuperCode</Text>
                <Text style={styles.updateText}>Contacto:3625000012</Text>
            </View>
            {/* Pie de página */}
            <View style={styles.footer}>
                <Text style={styles.rightsText}>©2025 TROFI. Todos los derechos reservados.</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E3549',
    },
    header: {
        height: verticalScale(75),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0E3549',
    },
    headerText: {
        fontSize: moderateScale(20),
        fontFamily: 'Roboto_700Bold',
        color: '#FFFFFF',
    },

    /*Boton que se expande*/
    drawerBox: {
        borderRadius: moderateScale(10),
        padding: moderateScale(15),
        marginBottom: verticalScale(10),
        elevation: 5,
        width: '100%',
    },
    drawerText: {
        color: 'rgb(255, 255, 255)',
        fontSize: moderateScale(12),
        fontFamily: 'Roboto_300Light',
        textAlign: 'justify',
    },
    /* Fin boton que se expande*/

    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: moderateScale(20),
        gap: verticalScale(10),

    },
    icon: {
        width: moderateScale(50),
        height: moderateScale(50),
        resizeMode: 'contain',
        marginBottom: verticalScale(20),
        marginTop: verticalScale(20),
    },
    button: {
        backgroundColor: '#E5E5E5',
        paddingHorizontal: moderateScale(30),
        paddingVertical: verticalScale(10),
        borderRadius: moderateScale(10),
        marginBottom: verticalScale(20),
    },
    buttonText: {
        color: '#0E3549',
        fontFamily: 'Roboto_400Regular',
        fontSize: moderateScale(14),
    },
    versionText: {
        color: '#FFFFFF',
        fontFamily: 'Roboto_300Light',
        fontSize: moderateScale(12),

    },
    updateText: {
        color: 'rgb(255, 255, 255)',
        fontFamily: 'Roboto_300Light',
        fontSize: moderateScale(10),
    },
    rightsText: {
        color: '#FFFFFF',
        fontFamily: 'Roboto_300Light',
        fontSize: moderateScale(12),
        marginTop: verticalScale(10),
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: verticalScale(20),
        backgroundColor: '#0E3549',
    },

});
// agregue un footer nose si sera necesario
// falta la barra de navegacion.
export default AboutTrofi;