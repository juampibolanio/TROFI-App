import Loader from '@/components/atoms/Loader';
import UserReviewDetail from '@/components/userReviewDetail';
import fonts from '@/constants/fonts';
import imagePath from '@/constants/imagePath';
import { getUserReviews } from '@/services/reviewService';
import { useFonts } from '@expo-google-fonts/roboto';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, ImageBackground, ScrollView, Pressable, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';

const reviewDetail = () => {
    const { id, name, imageProfile } = useLocalSearchParams();
    const [fontsLoaded] = useFonts(fonts);
    const userId = Number(id);
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


    useFocusEffect(
        useCallback(() => {
            const fetchReviews = async () => {
                setLoading(true);
                try {
                    const data = await getUserReviews(userId);
                    setReviews(data || []);
                } catch (e) {
                    console.error('Error al obtener las reseñas', e);
                } finally {
                    setLoading(false);
                }
            };

            fetchReviews();
        }, [userId])
    );



    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.overlay} source={imagePath.backgroundRDetails} resizeMode="cover">
                <View style={styles.headerContainer}>
                    <Pressable style={styles.backBottom} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color="black" />
                    </Pressable>
                    <Text style={styles.title}>Reseñas de {name}</Text>
                </View>

                {loading ? (
                    <Loader />
                ) : (
                    <ScrollView>
                        <View style={styles.reviewContainer}>
                            {reviews.length === 0 ? (
                                <Text style={{ color: '#fff', textAlign: 'center' }}>Este usuario aún no tiene reseñas.</Text>
                            ) : (
                                reviews.map((r, index) => (
                                    <UserReviewDetail
                                        key={index}
                                        profileImage={
                                            r.reviewer.imageProfile
                                                ? { uri: r.reviewer.imageProfile }
                                                : imagePath.defaultUserImage
                                        }
                                        username={r.reviewer.name}
                                        description={r.description}
                                        score={r.score}
                                    />
                                ))
                            )}
                        </View>
                    </ScrollView>
                )}

                <View style={styles.footerContainer}>
                    <Pressable
                        style={({ pressed }) => [styles.sendReviewButton, pressed && { opacity: 0.5 }]}
                        onPress={() => router.push({ pathname: '/(main)/(tabs)/search/[id]/reviewForm', params: { id: userId, name: name, imageProfile: imageProfile } })}
                    >
                        <>
                            <Text style={styles.sendReviewButtonText}>Reseña a este usuario</Text>
                            <Ionicons name="star-outline" size={24} color="#000" style={{ marginLeft: 8 }} />
                        </>
                    </Pressable>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#0E3549',
    },

    overlay: {
        flex: 1
    },

    headerContainer: {
        position: 'absolute',
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D9D9D9',
        paddingVertical: moderateScale(6),
        paddingHorizontal: moderateScale(15),
        borderBottomLeftRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(20),
        minHeight: moderateScale(40),
        alignSelf: 'center',
    },

    backBottom: {
        padding: moderateScale(8),
        marginRight: moderateScale(6),
    },

    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        fontFamily: 'RobotoLight',
        color: '#000',
    },

    reviewContainer: {
        flex: 1,
        paddingVertical: moderateScale(12),
        paddingHorizontal: moderateScale(10),
        marginHorizontal: moderateScale(10),
        borderTopLeftRadius: moderateScale(15),
        borderTopRightRadius: moderateScale(15),
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        gap: moderateScale(10),
        marginTop: moderateScale(60)
    },

    footerContainer: {
        padding: moderateScale(12),
        alignItems: 'center',
        justifyContent: 'center',
    },

    sendReviewButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(20),
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(15),
        backgroundColor: '#D9D9D9'
    },

    sendReviewButtonText: {
        textAlign: 'center',
        fontSize: moderateScale(14),
        fontWeight: 'bold',
        fontFamily: 'RobotoLight',
        color: '#000',
    }

})

export default reviewDetail;