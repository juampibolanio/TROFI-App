import imagePath from '@/constants/imagePath';
import {
    View,
    Text,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import ButtonComponent from '@/components/atoms/ButtonComponent';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { useFonts } from '@expo-google-fonts/roboto';
import fonts from '@/constants/fonts';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { setImageProfile as setImageProfileAction } from '@/redux/slices/userSlice';
import { uploadProfileImage } from '@/services/imageService';
import { storeData } from '@/utils/storage';
import { router } from 'expo-router';
import CustomAlert from '@/components/atoms/CustomAlert';
import Loader from '@/components/atoms/Loader';
import { updateUserProfileImage } from '@/services/userService';

const EditImageProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [fontsLoaded] = useFonts(fonts);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        title: '',
        message: '',
        type: 'error' as 'success' | 'error' | 'warning' | 'info',
        showCancel: false
    });

    // Estados para manejar el loading
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [isSavingImage, setIsSavingImage] = useState(false);

    const showAlert = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'error') => {
        setAlertConfig({ title, message, type, showCancel: false });
        setAlertVisible(true);
    };

    const closeAlert = () => setAlertVisible(false);

    const handleSelectImage = async () => {
        try {
            setIsUploadingImage(true);

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets?.length > 0) {
                const localUri = result.assets[0].uri;
                const cloudinaryUrl = await uploadProfileImage(localUri);
                setSelectedImage(cloudinaryUrl);

                showAlert("Imagen subida", "La imagen fue cargada correctamente. ¡No olvides guardarla!", 'success');
            }
        } catch (error) {
            console.error('Error seleccionando imagen:', error);
            showAlert("Error", "No se pudo subir la imagen. Intenta nuevamente.", 'error');
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleSaveImage = async () => {
        try {
            if (!selectedImage) {
                showAlert("Imagen requerida", "Primero debes seleccionar una imagen para guardar.", 'warning');
                return;
            }

            setIsSavingImage(true);

            // actualizar el backend
            await updateUserProfileImage(selectedImage);

            // actualizar en Redux y AsyncStorage
            const updatedUser = { ...user, imageProfile: selectedImage };
            dispatch(setImageProfileAction(selectedImage));
            await storeData('user', updatedUser);

            showAlert("Guardado", "La imagen se actualizó correctamente.", 'success');

            setTimeout(() => {
                closeAlert();
                router.back();
            }, 1500);
        } catch (error) {
            console.error('Error guardando imagen:', error);
            showAlert("Error", "No se pudo actualizar la imagen. Intenta nuevamente.", 'error');
        } finally {
            setIsSavingImage(false); // Ocultar loader
        }
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ImageBackground style={styles.overlay} source={imagePath.editImageProfileBackground} resizeMode="cover">
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* HEADER */}
                        <View style={styles.header}>
                            <Image source={imagePath.icon} style={styles.iconStyle} resizeMode="contain" />
                            <Text style={styles.editionText}>Foto de perfil actual</Text>

                            <Image
                                source={
                                    selectedImage
                                        ? { uri: selectedImage }
                                        : user.imageProfile
                                            ? typeof user.imageProfile === 'string'
                                                ? { uri: user.imageProfile }
                                                : user.imageProfile
                                            : imagePath.defaultUserImage
                                }
                                style={styles.userImage}
                                resizeMode="cover"
                            />
                        </View>

                        {/* BOTONES */}
                        <View style={styles.containerButton}>
                            <ButtonComponent
                                title="Subir imagen"
                                iconName="push-outline"
                                onPress={handleSelectImage}
                            />

                            <ButtonComponent
                                title="Guardar y actualizar"
                                iconName="save-outline"
                                onPress={handleSaveImage}
                            />

                            <ButtonComponent
                                title="Cancelar"
                                iconName="close-outline"
                                onPress={() => router.back()}
                            />
                        </View>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>

            {/* LOADER OVERLAY */}
            {(isUploadingImage || isSavingImage) && (
                <View style={styles.loaderOverlay}>
                    <Loader />
                </View>
            )}

            {/* ALERTA */}
            <CustomAlert
                visible={alertVisible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                showCancel={alertConfig.showCancel}
                onConfirm={closeAlert}
                confirmText="Aceptar"
            />
        </>
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
    scrollContent: {
        flexGrow: 1,
        paddingBottom: moderateScale(30),
    },
    header: {
        alignItems: 'center',
        gap: moderateScale(20),
        paddingTop: moderateScale(20),
        paddingHorizontal: moderateScale(20),
    },
    iconStyle: {
        width: moderateScale(50),
        height: moderateScale(50),
    },
    editionText: {
        textAlign: "center",
        fontSize: moderateScale(25),
        fontFamily: 'Roboto_300Light',
        color: '#FFFFFF',
        marginRight: moderateScale(5),
    },
    userImage: {
        width: moderateScale(200),
        height: moderateScale(200),
        borderRadius: moderateScale(100),
        borderWidth: 6,
        borderColor: '#FFFFFF',
        marginBottom: moderateScale(20),
    },
    containerButton: {
        paddingHorizontal: moderateScale(30),
        paddingVertical: moderateScale(20),
        gap: moderateScale(15),
        flex: 1,
        justifyContent: 'flex-end',
        minHeight: moderateScale(200),
    },
    loaderOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EditImageProfile;