import React from 'react';
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

const FrequenlyQuestions = () => {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        Roboto_300Light,
    });

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.container}>
            {/* cabecera */}
            <View style={styles.header}>
                <Image source={imagePath.icon} style={styles.icon} />
            </View>

            {/*contenido principal */}
            <View style={styles.content}>
                

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Que es TROFI?</Text>
                </TouchableOpacity>
                <Text style={styles.versionText}>Testing this so i can be a contirubutor </Text>
                
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
        height: verticalScale(70),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0E3549',
    },
    headerText: {
        fontSize: moderateScale(20),
        fontFamily: 'Roboto_700Bold',
        color: '#FFFFFF',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: moderateScale(20),
        gap: verticalScale(20),
        paddingTop: 10,
    },
    icon: {
        width: moderateScale(50),
        height: moderateScale(50),
        resizeMode: 'contain',
        marginBottom: verticalScale(20),
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
        color: '#FFFFFF',
        fontFamily: 'Roboto_300Light',
        fontSize: moderateScale(12),
    },
    rightsText: {
        color: '#FFFFFF',
        fontFamily: 'Roboto_300Light',
        fontSize: moderateScale(12),
        marginTop: verticalScale(10),
    },
});

export default FrequenlyQuestions;    