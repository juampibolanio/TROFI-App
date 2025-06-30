import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import imagePath from '@/constants/imagePath';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import RNPickerSelect from 'react-native-picker-select';
import { ubicacionesArgentina, provinciasArgentina } from '@/data/argentinaUbicaciones';
import { saveUserProfile } from '@/services/userService';
import { setImageProfile as setImageProfileAction, setUserProfile } from '@/redux/slices/userSlice';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useFonts } from '@expo-google-fonts/roboto';
import fonts from '@/constants/fonts';
import { RootState } from '@/redux/store';
import { storeData } from '@/utils/storage';
import { router } from 'expo-router';
import { uploadProfileImage } from '@/services/imageService';
import CustomAlert from '@/components/atoms/CustomAlert';

const CompleteUserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [fontsLoaded] = useFonts(fonts);
    const [dni, setDni] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [location, setLocation] = useState('');
    const [imageProfile, setImageProfile] = useState('');
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');
    const [localidadSeleccionada, setLocalidadSeleccionada] = useState('');

    // Estados para el CustomAlert
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        title: '',
        message: '',
        type: 'error' as 'success' | 'error' | 'warning' | 'info',
        showCancel: false
    });

    // Formatea la ubicación para backend
    useEffect(() => {
        if (provinciaSeleccionada && localidadSeleccionada) {
            setLocation(`${localidadSeleccionada}, ${provinciaSeleccionada}`);
        }
    }, [provinciaSeleccionada, localidadSeleccionada]);

    // Función para mostrar alert
    const showAlert = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'error') => {
        setAlertConfig({
            title,
            message,
            type,
            showCancel: false
        });
        setAlertVisible(true);
    };

    // Función para cerrar alert
    const closeAlert = () => {
        setAlertVisible(false);
    };

    // Icono flecha para el select
    const DropdownIcon = () => (
        <Ionicons
            name="chevron-down"
            size={20}
            color="#fff"
            style={{ marginRight: moderateScale(10) }}
        />
    );

    //handler para foto del usuario
    const handleSelectProfileImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
            });

            if (!result.canceled && result.assets?.length > 0) {
                try {
                    const uri = result.assets[0].uri;
                    const uploadedUrl = await uploadProfileImage(uri);
                    setImageProfile(uploadedUrl); // Lo seteo en estado
                    dispatch(setImageProfileAction(uploadedUrl)); // Guardo en Redux
                    console.log(imageProfile);

                    showAlert("¡Foto cargada!", "Tu foto de perfil se ha cargado correctamente.", 'success');
                } catch (e) {
                    console.error(e);
                    showAlert("Error al cargar imagen", "No se pudo cargar la imagen. Por favor, intenta nuevamente.", 'error');
                }
            }
        } catch (e) {
            console.error(e);
            showAlert("Error de permisos", "No se pudo acceder a la galería de imágenes. Verifica los permisos de la aplicación.", 'error');
        }
    };

    const handleSaveProfile = async () => {
        try {
            // Validación de campos vacíos
            if (!dni.trim()) {
                showAlert("Campo requerido", "Por favor, ingresa tu número de DNI.", 'warning');
                return;
            }

            if (!userDescription.trim()) {
                showAlert("Campo requerido", "Por favor, agrega una descripción personal.", 'warning');
                return;
            }

            if (!imageProfile) {
                showAlert("Foto requerida", "Por favor, agrega una foto de perfil.", 'warning');
                return;
            }

            if (!provinciaSeleccionada) {
                showAlert("Ubicación requerida", "Por favor, selecciona una provincia.", 'warning');
                return;
            }

            if (!localidadSeleccionada) {
                showAlert("Ubicación requerida", "Por favor, selecciona una localidad.", 'warning');
                return;
            }

            // Validación de DNI
            const dniRegex = /^\d{8}$/;
            if (!dniRegex.test(dni)) {
                showAlert("DNI inválido", "El DNI debe contener exactamente 8 números.", 'warning');
                return;
            }

            // Validación de descripción (longitud mínima)
            if (userDescription.trim().length < 10) {
                showAlert("Descripción muy corta", "La descripción debe tener al menos 10 caracteres.", 'warning');
                return;
            }

            // 1. Enviar al backend
            await saveUserProfile({
                dni,
                userDescription,
                imageProfile,
                location
            });

            const updatedUser = {
                ...user,
                dni,
                userDescription,
                imageProfile,
                location
            };

            // 2. Guardar en Redux (el slice calculará isProfileComplete automáticamente)
            dispatch(setUserProfile(updatedUser));

            // 3. Guardar en AsyncStorage
            await storeData('user', updatedUser);

            // Mostrar mensaje de éxito
            showAlert("¡Perfil completado!", "Los datos fueron guardados correctamente. Bienvenido a Trofi.", 'success');

            // Delay para que se vea el mensaje de éxito
            setTimeout(() => {
                closeAlert();
                router.replace('/(main)/(tabs)/featured');
            }, 2000);

        } catch (error) {
            console.error(error);

            // Manejo de errores específicos
            if (error && typeof error === 'object' && 'response' in error) {
                const serverError = error as any;
                if (serverError.response?.data) {
                    const errors = serverError.response.data;

                    if (typeof errors === 'object') {
                        const errorMessages = Object.values(errors).flat();
                        const firstError = errorMessages[0] as string;

                        // Personalizar mensajes según el tipo de error
                        if (firstError.toLowerCase().includes('dni')) {
                            showAlert("DNI ya registrado", "Este número de DNI ya está registrado en el sistema.", 'error');
                        } else {
                            showAlert("Error del servidor", firstError, 'error');
                        }
                    } else {
                        showAlert("Error del servidor", errors.toString(), 'error');
                    }
                } else {
                    showAlert("Error de conexión", "No se pudo guardar el perfil. Verifica tu conexión a internet e intenta nuevamente.", 'error');
                }
            } else {
                showAlert("Error inesperado", "Hubo un problema al guardar el perfil. Por favor, intenta nuevamente.", 'error');
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={styles.overlay}
                source={imagePath.backgroundOnBoarding}
                resizeMode="cover"
            >
                <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                    <View style={styles.header}>
                        <Image style={styles.icon} source={imagePath.icon} resizeMode="contain" />

                        <Text style={styles.title}>Complete su perfil</Text>

                        <Text style={styles.description}>
                            Complete su perfil para comenzar a buscar y contactar personas. Asegúrese de proporcionar información precisa y detallada para mejorar su experiencia en la aplicación.
                        </Text>
                    </View>

                    <View style={styles.body}>

                        {/* FOTO DE PERFIL */}
                        <View style={styles.photoContainer}>
                            <Pressable onPress={handleSelectProfileImage}>
                                {imageProfile ? (
                                    <Image source={{ uri: imageProfile }} style={styles.profileImage} />
                                ) : (
                                    <View style={styles.imagePlaceholder}>
                                        <Ionicons name="camera" size={32} color="#888" />
                                        <Text style={styles.imageText}>Agregar foto de perfil</Text>
                                    </View>
                                )}
                            </Pressable>
                        </View>

                        {/* DNI */}
                        <View style={styles.fieldContainer}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    value={dni}
                                    onChangeText={setDni}
                                    placeholder="Ingrese su N° de documento (DNI)"
                                    placeholderTextColor="#ccc"
                                    style={styles.input}
                                    keyboardType="numeric"
                                    maxLength={8}
                                />
                                {dni.length > 0 && (
                                    <Pressable onPress={() => setDni('')} style={styles.iconButton}>
                                        <Ionicons name="close" size={20} color="#fff" />
                                    </Pressable>
                                )}
                            </View>
                            <View style={styles.underline} />
                        </View>

                        {/* Descripción */}
                        <View style={styles.fieldContainer}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    value={userDescription}
                                    onChangeText={setUserDescription}
                                    placeholder="Agregue una breve descripción personal"
                                    placeholderTextColor="#ccc"
                                    style={[styles.input, { minHeight: verticalScale(60), textAlignVertical: 'top' }]}
                                    multiline
                                    numberOfLines={4}
                                    maxLength={500}
                                />
                                {userDescription.length > 0 && (
                                    <Pressable onPress={() => setUserDescription('')} style={styles.iconButton}>
                                        <Ionicons name="close" size={20} color="#fff" />
                                    </Pressable>
                                )}
                            </View>
                            <View style={styles.underline} />
                            {userDescription.length > 0 && (
                                <Text style={styles.characterCount}>
                                    {userDescription.length}/500 caracteres
                                </Text>
                            )}
                        </View>

                        {/* Selector de provincia */}
                        <View style={styles.fieldContainer}>
                            <RNPickerSelect
                                placeholder={{ label: 'Seleccione una provincia', value: '' }}
                                onValueChange={(value: string) => {
                                    setProvinciaSeleccionada(value);
                                    setLocalidadSeleccionada('');
                                }}
                                items={provinciasArgentina.map((prov) => ({ label: prov, value: prov }))}
                                value={provinciaSeleccionada}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                                Icon={DropdownIcon}
                            />
                            <View style={styles.underline} />
                        </View>

                        {/* Selector de localidad */}
                        {provinciaSeleccionada !== '' && (
                            <View style={styles.fieldContainer}>
                                <RNPickerSelect
                                    placeholder={{ label: 'Seleccione una localidad', value: '' }}
                                    onValueChange={setLocalidadSeleccionada}
                                    items={
                                        provinciaSeleccionada && (provinciaSeleccionada in ubicacionesArgentina)
                                            ? ubicacionesArgentina[provinciaSeleccionada as keyof typeof ubicacionesArgentina].map((loc) => ({
                                                label: loc,
                                                value: loc,
                                            }))
                                            : []
                                    }
                                    value={localidadSeleccionada}
                                    style={pickerSelectStyles}
                                    useNativeAndroidPickerStyle={false}
                                    Icon={DropdownIcon}
                                />
                                <View style={styles.underline} />
                            </View>
                        )}
                    </View>

                    <View style={styles.footer}>
                        <Pressable style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]} onPress={handleSaveProfile}>
                            <Text style={styles.buttonText}>Confirmar y guardar</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </ImageBackground>

            {/* CustomAlert */}
            <CustomAlert
                visible={alertVisible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                showCancel={alertConfig.showCancel}
                onConfirm={closeAlert}
                confirmText="Aceptar"
            />
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

    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(20),
        gap: moderateScale(10)
    },

    header: {
        marginBottom: verticalScale(20),
    },

    icon: {
        width: moderateScale(50),
        height: moderateScale(50),
        alignSelf: 'center',
        marginBottom: moderateScale(10),
    },

    title: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: moderateScale(10),
        textAlign: 'center',
    },

    description: {
        fontSize: moderateScale(14),
        color: '#ffffff',
        textAlign: 'left',
    },

    body: {
        flex: 1,
        alignItems: 'center',
    },

    fieldContainer: {
        width: '100%',
        marginBottom: moderateScale(20),
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    input: {
        flex: 1,
        color: '#fff',
        backgroundColor: 'transparent',
        paddingVertical: 6,
        fontSize: 14,
    },

    underline: {
        height: 1.5,
        backgroundColor: '#888',
        width: '100%',
        marginTop: 2,
    },

    characterCount: {
        color: '#ccc',
        fontSize: moderateScale(12),
        textAlign: 'right',
        marginTop: moderateScale(5),
    },

    photoContainer: {
        alignItems: 'center',
        marginBottom: verticalScale(10),
    },
    imagePlaceholder: {
        width: moderateScale(130),
        height: moderateScale(130),
        borderRadius: moderateScale(60),
        backgroundColor: '#1e4c5f',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#888',
    },

    profileImage: {
        width: moderateScale(120),
        height: moderateScale(120),
        borderRadius: moderateScale(60),
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: '#ccc',
    },

    imageText: {
        color: '#ccc',
        fontSize: moderateScale(12),
        marginTop: moderateScale(4),
        textAlign: 'center',
    },

    iconButton: {
        padding: 6,
        marginLeft: 4,
    },

    footer: {
        flex: 1
    },

    button: {
        backgroundColor: '#D9D9D9',
        padding: moderateScale(15),
        paddingHorizontal: moderateScale(25),
        borderRadius: moderateScale(20),
        alignSelf: 'center',
        marginBottom: moderateScale(10)
    },

    buttonText: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: moderateScale(13),
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        color: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 0,
        backgroundColor: 'transparent',
        fontSize: 14,
        paddingRight: 30,
    },
    inputAndroid: {
        color: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 0,
        backgroundColor: 'transparent',
        fontSize: 14,
        paddingRight: 30,
    },
    placeholder: {
        color: '#ccc',
    },
});

export default CompleteUserProfile;