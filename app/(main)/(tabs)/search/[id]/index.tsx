import { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, Pressable } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import imagePath from '@/constants/imagePath';
import { moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from '@expo-google-fonts/roboto';
import fonts from '@/constants/fonts';
import Loader from '@/components/atoms/Loader';
import { getUserById } from '@/services/userService';

const UserDetail = () => {
    const { id } = useLocalSearchParams();
    const [fontsLoaded] = useFonts(fonts);
    const [perfil, setPerfil] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const navigateToUserGalery = () => {
        router.push({ pathname: "/(main)/(tabs)/search/[id]/userGalery", params: { id: perfil.id, name: perfil.fullname } })
    }

    const navigateToReviewDetail = () => {
        router.push({ pathname: "/(main)/(tabs)/search/[id]/reviewDetail", params: { id: perfil.id, name: perfil.fullname, imageProfile: perfil.imageProfile } })
    }

    const goBack = () => {
        router.back();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const perfilData = await getUserById(Number(id));

                setPerfil(perfilData);
                console.log(perfilData);
            } catch (error) {
                console.error("Error al obtener perfil o reseñas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (!fontsLoaded || loading) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Loader />
            </SafeAreaView>
        );
    }

    if (!perfil) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ color: '#fff', textAlign: 'center', marginTop: 50 }}>Perfil no encontrado</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={imagePath.backgroundUDetails} style={styles.overlay} resizeMode='cover'>

                {/* BACK ARROW */}
                <View style={styles.backArrowContainer}>
                    <Pressable
                        style={({ pressed }) => [styles.backArrow, pressed && { opacity: 0.5 }]}
                        onPress={goBack}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                </View>

                {/* HEADER */}
                <View style={styles.header}>
                    <Image source={{ uri: perfil.imageProfile }} style={styles.imagen} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.username}>{perfil.fullname}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="location-outline" size={14} color="white" style={{ marginRight: 4 }} />
                            <Text style={styles.ubication}>{perfil.location}</Text>
                        </View>
                        <Text style={styles.jobDescription}>{perfil.jobDescription}</Text>
                        <Pressable style={styles.sendMessageBottom}>
                            <Ionicons name='send' size={15} color={'#0E3549'} />
                            <Text style={styles.sendText}>Enviar mensaje</Text>
                        </Pressable>
                    </View>
                </View>

                {/* BODY */}
                <View style={styles.body}>
                    <View style={styles.descriptionOverlay}>
                        <View style={styles.description}>
                            <Text style={styles.descriptionTitle}>Descripción</Text>
                            <Text style={styles.descriptionText}>{perfil.userDescription}</Text>
                        </View>
                    </View>

                    <View style={styles.scoreOverlay}>
                        <View style={styles.score}>
                            <Text style={styles.scoreTitle}>Puntuación</Text>
                            <View style={styles.scoreContainer}>
                                <Text style={styles.scoreNumber}>{perfil.score === 0 ? 'N/D' : perfil.score}</Text>
                                <Ionicons name="star-outline" size={30} color="#0E3549" />
                            </View>
                        </View>
                    </View>
                </View>

                {/* FOOTER */}
                <View style={styles.footer}>
                    <View style={styles.profileBottomsContainer}>
                        <Pressable
                            style={({ pressed }) => [styles.workGalery, pressed && { opacity: 0.5 }]}
                            onPress={navigateToReviewDetail}
                        >
                            <Text style={styles.textBottom}>Reseñas de la comunidad</Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [styles.workGalery, pressed && { opacity: 0.5 }]}
                            onPress={navigateToUserGalery}
                        >
                            <Text style={styles.textBottom}>Galería de trabajo</Text>
                        </Pressable>
                    </View>

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
        flex: 1,
    },

    /* ----------------------------------- BACK ARROW -----------------------------------*/
    backArrowContainer: {
        position: 'absolute',
        top: moderateScale(10),
        left: moderateScale(15),
        zIndex: 1,
    },

    backArrow: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: moderateScale(20),
        padding: moderateScale(8),
    },

    /* ----------------------------------- HEADER -----------------------------------*/

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: moderateScale(20),
        paddingTop: moderateScale(50),
    },

    imagen: {
        width: moderateScale(115),
        height: moderateScale(115),
        borderRadius: moderateScale(60),
        borderColor: '#FFFFFF',
        borderWidth: moderateScale(2)
    },

    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        gap: moderateScale(5),
        marginLeft: moderateScale(15),
    },
    username: {
        fontSize: moderateScale(22),
        color: '#FFFFFF',
        fontFamily: 'RobotoRegular'
    },
    ubication: {
        fontSize: moderateScale(14),
        color: '#FFFFFF',
        fontFamily: 'RobotoRegular'

    },
    jobDescription: {
        fontSize: moderateScale(12),
        color: '#FFFFFF',
        fontFamily: 'RobotoRegular'
    },

    sendMessageBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D9D9D9',
        paddingVertical: moderateScale(6),
        paddingHorizontal: moderateScale(13),
        borderRadius: moderateScale(15),
        marginTop: moderateScale(5),
        alignSelf: 'flex-start',
        gap: moderateScale(6)

    },

    sendText: {
        color: '#000000',
        fontSize: moderateScale(12),
        fontWeight: 'bold',
        fontFamily: 'RobotoRegular'
    },

    sendIcon: {
    },

    /* ----------------------------------- BODY -----------------------------------*/
    body: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: moderateScale(10),
    },

    descriptionOverlay: {
        backgroundColor: '#696969',
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(5),
        borderRadius: moderateScale(15)
    },

    scoreOverlay: {
        backgroundColor: '#696969',
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(5),
        borderRadius: moderateScale(10)
    },

    description: {
        width: moderateScale(200),
        height: moderateScale(250),
        backgroundColor: '#D9D9D9',
        padding: moderateScale(10),
        borderRadius: moderateScale(10)
    },

    descriptionTitle: {
        borderRadius: moderateScale(10),
        padding: moderateScale(3),
        fontSize: moderateScale(20),
        fontWeight: 'bold'
    },

    descriptionText: {
        backgroundColor: 'transparent',
        fontFamily: 'RobotoLight',
        fontSize: moderateScale(14),
        textAlign: 'justify'
    },

    score: {
        width: moderateScale(115),
        height: moderateScale(250),
        backgroundColor: '#D9D9D9',
        padding: moderateScale(10),
        borderRadius: moderateScale(10)
    },

    scoreTitle: {
        borderRadius: moderateScale(10),
        padding: moderateScale(3),
        fontSize: moderateScale(15),
        fontWeight: 'bold',
        textAlign: 'center'
    },

    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    scoreNumber: {
        fontSize: moderateScale(32),
        fontFamily: 'RobotoLight'
    },
    starIcon: {
    },
    /* ----------------------------------- FOOTER -----------------------------------*/

    footer: {
        justifyContent: 'center',
    },

    profileBottomsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: moderateScale(15)
    },

    communityReview: {
        padding: moderateScale(12),
        backgroundColor: '#D9D9D9',
        borderRadius: moderateScale(12)
    },

    workGalery: {
        padding: moderateScale(12),
        backgroundColor: '#D9D9D9',
        borderRadius: moderateScale(12)
    },

    textBottom: {
        color: '#000000',
        fontSize: moderateScale(12),
        fontFamily: 'RobotoRegular',
        fontWeight: 'bold'
    },

})

export default UserDetail;