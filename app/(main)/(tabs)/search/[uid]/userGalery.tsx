import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    StyleSheet, 
    ImageBackground, 
    Image, 
    Pressable,
    Modal,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import imagePath from '@/constants/imagePath';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useFonts } from '@expo-google-fonts/roboto';
import { getUserPhotos } from '@/services/userService';
import Loader from '@/components/atoms/Loader';
import fonts from '@/constants/fonts';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const UserGalery = () => {
    // ⚠️ CAMBIO: Recibir uid en lugar de id
    const { uid, name } = useLocalSearchParams();

    const [fontsLoaded] = useFonts(fonts);
    const [photos, setPhotos] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Estados para la vista previa
    const [previewVisible, setPreviewVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Traer las fotos del usuario
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                // ⚠️ CAMBIO: Pasar UID (string) a la función
                const data = await getUserPhotos(uid as string);
                setPhotos(data);
            } catch (err) {
                console.error('Error al obtener fotos del usuario:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (uid) {
            fetchPhotos();
        } else {
            setLoading(false);
            setError(true);
        }
    }, [uid]);

    // Mostrar imagen en vista previa
    const handleImagePress = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setPreviewVisible(true);
    };

    // Cerrar vista previa
    const closePreview = () => {
        setPreviewVisible(false);
        setSelectedImage(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.overlay} source={imagePath.backgroundGDetails} resizeMode="cover">

                <View style={styles.headerContainer}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.backBottom,
                            pressed && { opacity: 0.5 }
                        ]}
                        onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color="black" />
                    </Pressable>
                    <Text style={styles.title}>Galería de {name}</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.imageContainer}>
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Text style={styles.textNoImage}>
                                Error al cargar las imágenes
                            </Text>
                        ) : photos.length > 0 ? (
                            photos.map((uri, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleImagePress(uri)}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={{ uri }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.textNoImage}>
                                No se encontraron imágenes cargadas
                            </Text>
                        )}
                    </View>
                </ScrollView>

                {/* MODAL DE VISTA PREVIA */}
                <Modal
                    visible={previewVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={closePreview}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity 
                            style={styles.modalBackground} 
                            activeOpacity={1}
                            onPress={closePreview}
                        >
                            <View style={styles.modalContent}>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={closePreview}
                                >
                                    <Ionicons name="close" size={30} color="#FFFFFF" />
                                </TouchableOpacity>
                                
                                {selectedImage && (
                                    <Image 
                                        source={{ uri: selectedImage }} 
                                        style={styles.previewImage}
                                        resizeMode="contain"
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>

            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E3549'
    },
    overlay: {
        flex: 1,
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
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    image: {
        width: scale(150),
        height: scale(150),
        margin: moderateScale(13),
        borderRadius: moderateScale(25),
        borderColor: '#FFFFFF',
        borderWidth: 2
    },
    scrollContent: {
        paddingTop: moderateScale(70),
    },
    textNoImage: {
        color: '#FFFFFF',
        fontSize: moderateScale(16),
        textAlign: 'center',
        marginTop: verticalScale(20),
        fontFamily: 'RobotoLight',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: moderateScale(50),
        right: moderateScale(20),
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: moderateScale(20),
        padding: moderateScale(5),
    },
    previewImage: {
        width: screenWidth,
        height: screenHeight * 0.8,
        borderRadius: moderateScale(10),
    },
})

export default UserGalery;