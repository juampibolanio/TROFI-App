import imagePath from "@/constants/imagePath"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { ImageBackground, Pressable, View, Text, Image, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { moderateScale, verticalScale } from "react-native-size-matters"

const registerOptions = () => {

    const navigateToCompleteUserProfile = () => {
        router.push("/(main)/(onBoarding)/completeUserProfile");
    }

    const navigateToCompleteWorkerProfile = () => {
        router.push("/(main)/(onBoarding)/completeWorkerProfile");
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ImageBackground
                    style={styles.overlay}
                    source={imagePath.backgroundOnBoarding}
                    resizeMode='cover'
                >

                    <View style={styles.header}>
                        <Image style={styles.icon} source={imagePath.icon} resizeMode='contain' />

                        <Text style={styles.title}>Registrarse como trabajador</Text>

                        <Text style={styles.subTitle}> ¿Cómo puedo ofrecer mi trabajo?</Text>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.box}>
                            <Ionicons name="alert-outline" size={36} color="black" />

                            <Text style={styles.boxText}>
                                ¿Tienes un oficio? Únete a nuestra comunidad de trabajadores y ofrece tus servicios. Crea tu perfil y comienza a recibir mensajes y solicitudes de trabajo. ¡Tu talento es bienvenido!
                            </Text>

                            <Pressable style={({ pressed }) => [
                                styles.button,
                                pressed && { opacity: 0.8 },
                            ]}
                                onPress={navigateToCompleteWorkerProfile}
                            >
                                <Text style={styles.buttonText}>Regístrate como trabajador</Text>
                            </Pressable>
                        </View>
                        

                        <View style={styles.bBox}>
                            <Ionicons name="checkmark-done-outline" size={24} color="black" />

                            <Text style={styles.boxText}>
                                ¿Solo estás buscando personas y servicios? ¡Completa tu perfil y comienza a buscar y contactar personas!
                            </Text>

                            <Pressable style={({ pressed }) => [
                                styles.button,
                                pressed && { opacity: 0.8 },
                            ]}
                                onPress={navigateToCompleteUserProfile}
                            >
                                <Text style={styles.buttonText}>Completar mi perfil</Text>
                            </Pressable>
                        </View>
                    </View>

                </ImageBackground>
            </SafeAreaView>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0E3549",
    },

    overlay: {
        flex: 1,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(20),
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: moderateScale(20)
    },

    header: {
        gap: moderateScale(5)
    },
    title: {
        color: '#FFFFFF',
        fontSize: moderateScale(25),
        fontFamily: 'Roboto_300Light',
        marginBottom: verticalScale(10),
        fontWeight: 'bold'
    },

    subTitle: {
        color: '#FFFFFF',
        fontSize: moderateScale(15),
        fontFamily: 'Roboto_300Light',
        textAlign: 'center',

    },

    icon: {
        width: moderateScale(50),
        height: moderateScale(50),
        alignSelf: 'center'
    },

    body: {
        flex: 1,
        alignItems: 'center',
        gap: moderateScale(10),
    },

    box: {
        marginTop: moderateScale(20),
        backgroundColor: '#D9D9D9',
        borderTopLeftRadius: moderateScale(80),
        borderBottomLeftRadius: moderateScale(80),
        borderTopRightRadius: moderateScale(80),
        borderBottomRightRadius: moderateScale(40),
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(10),
        justifyContent: 'space-around',
        gap: moderateScale(20)
    },

    boxText: {
        color: '#000000',
        fontSize: moderateScale(14),
        textAlign: 'justify'
    },

    button: {
        backgroundColor: '#0E3549',
        padding: moderateScale(8),
        paddingHorizontal: moderateScale(12),
        borderRadius: moderateScale(20),
        alignSelf: 'flex-end'
    },

    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: moderateScale(13),
    },

    bBox: {
        marginTop: moderateScale(20),
        backgroundColor: '#D9D9D9',
        borderTopLeftRadius: moderateScale(80),
        borderBottomLeftRadius: moderateScale(80),
        borderTopRightRadius: moderateScale(80),
        borderBottomRightRadius: moderateScale(40),
        alignItems: 'center',
        padding: moderateScale(20),
        justifyContent: 'space-around',
        gap: moderateScale(10)
    }
}
)

export default registerOptions;