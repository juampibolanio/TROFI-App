import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, StyleSheet, Text, View, Image, Pressable } from "react-native";
import imagePath from "@/constants/imagePath";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useFonts } from "@expo-google-fonts/roboto";
import fonts from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const onBoarding = () => {

    const [fontsLoaded] = useFonts(fonts);

    const navigateToRegisterOptions = () => {
        router.push('/(main)/(onBoarding)/registerOptions');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={styles.overlay}
                source={imagePath.backgroundOnBoarding}
                resizeMode='cover'
            >

                <View style={styles.header}>
                    <Image style={styles.icon} source={imagePath.icon} resizeMode='contain' />

                    <Text style={styles.title}>¡Bienvenido a TROFI!</Text>

                    <Text style={styles.subTitle}> ¿Cómo funciona la app?</Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.box}>
                        <Ionicons name="alert-outline" size={36} color="black" />

                        <Text style={styles.boxText}>
                            Encuentra y solicita servicios de oficios de manera fácil y rápida. Explora nuestra plataforma, descubre personas calificadas y solicita el servicio que necesitas. ¡Todo al alcance de tu mano!
                        </Text>

                        <Pressable style={({ pressed }) => [
                            styles.button,
                            pressed && { opacity: 0.8 },
                        ]}
                            onPress={navigateToRegisterOptions}>
                            <Text style={styles.buttonText}>Siguiente </Text>
                        </Pressable>
                    </View>

                </View>

            </ImageBackground>
        </SafeAreaView>
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
    },

    box: {
        marginTop: moderateScale(20),
        backgroundColor: '#D9D9D9',
        borderTopLeftRadius: moderateScale(80),
        borderBottomLeftRadius: moderateScale(80),
        borderTopRightRadius: moderateScale(80),
        borderBottomRightRadius: moderateScale(40),
        alignItems: 'center',
        padding: moderateScale(20),
        justifyContent: 'space-around',
        gap: moderateScale(20)
    },

    boxText: {
        color: '#000000',
        fontSize: moderateScale(14)
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
    }
}
)

export default onBoarding;