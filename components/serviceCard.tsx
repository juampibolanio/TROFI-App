import { Roboto_300Light, Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, Pressable } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

type Props = { //otra forma de pasar props a un componente
    imageSource: ImageSourcePropType;
    title: string;
};


const ServiceCard: React.FC<Props> = ({ imageSource, title }) => {
    return (
        <Pressable style={({ pressed }) => [
            {
                transform: [{ scale: pressed ? 0.98 : 1 }], //esto es para hacer un efecto al presionar cada card.
            },
            styles.card,
        ]} >

            {/* fondo */}
            <View style={styles.bottomBackground} />

            {/* la imagen */}
            <View style={styles.imageContainer}>
                <Image source={imageSource} style={styles.image} />
            </View>

            {/* el titulo de abajo de la imagen */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        width: scale(150),
        height: verticalScale(180),
        borderRadius: scale(40),
        overflow: 'hidden',
        backgroundColor: '#fff',
        position: 'relative',
        justifyContent: 'flex-end',
        margin: scale(10),
        elevation: 4,
    },
    bottomBackground: {
        position: 'absolute',
        bottom: 0,
        height: '51%',
        width: '100%',
        backgroundColor: '#0E3549',
        opacity: 0.85,
    },
    imageContainer: {
        position: 'absolute',
        top: '5%',
        alignSelf: 'center',
        zIndex: 10,
        elevation: 10,
    },
    image: {
        width: scale(135),
        height: scale(150),
        borderRadius: scale(20),
        borderColor: '#fff',
    },
    textContainer: {
        alignItems: 'center',
        paddingBottom: verticalScale(5),
        zIndex: 5,
    },
    title: {
        color: '#fff',
        fontSize: moderateScale(14),
        fontWeight: 'bold',
        marginTop: verticalScale(45),
    },
});

export default ServiceCard;
