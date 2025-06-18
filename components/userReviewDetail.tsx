import fonts from '@/constants/fonts';
import { useFonts } from '@expo-google-fonts/roboto';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Image, ImageSourcePropType, View, StyleSheet, Text } from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters';

type Props = {
    profileImage: ImageSourcePropType;
    username: string,
    description: string,
    score: number
}


const UserReviewDetail: React.FC<Props> = ({ profileImage, username, description, score }) => {

    const [fontsLoaded] = useFonts(fonts); //carga de fuentes

    return (
        <View style={styles.cardContainer}>

            <Image source={profileImage} style={styles.userImage} />

            <View style={styles.textContainer}>
                <Text style={styles.username}>{username}</Text>

                <Text style={styles.description}>{description}</Text>
            </View>

            <View style={styles.scoreContainer}>
                <Text style={styles.score}>{score}</Text>
                <Ionicons name="star-outline" size={20} color="#0E3549" />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        minHeight: moderateScale(130),
        flexDirection: 'row',
        paddingVertical: moderateScale(20),
        borderRadius: moderateScale(35),
        justifyContent: 'flex-start',
        backgroundColor: '#D9D9D9',
        alignItems: 'flex-start',
        gap: moderateScale(12)
    },

    userImage: {
        width: scale(60),
        height: scale(60),
        borderRadius: moderateScale(30),
        marginLeft: moderateScale(14),
        borderColor: '#0E3549',
        borderWidth: 3
    },

    textContainer: {
        gap: moderateScale(4),
        flexShrink: 1,
        flex: 1
    },

    username: {
        fontSize: moderateScale(16),
        fontWeight: 'bold'
    },

    description: {
        fontSize: moderateScale(12),
        fontFamily: 'RobotoRegular'
    },

    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: moderateScale(6),
        marginLeft: 'auto',
        paddingRight: moderateScale(12),
        marginTop: moderateScale(20)
    },

    score: {
        fontSize: moderateScale(16)
    },
});


export default UserReviewDetail;