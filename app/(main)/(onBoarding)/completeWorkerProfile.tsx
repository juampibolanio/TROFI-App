import fonts from "@/constants/fonts";
import imagePath from "@/constants/imagePath";
import { RootState } from "@/redux/store";
import { useFonts } from "@expo-google-fonts/roboto";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, View, Text, Image, TextInput, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { provinciasArgentina, ubicacionesArgentina } from "@/data/argentinaUbicaciones";
import RNPickerSelect from "react-native-picker-select";
import { setImageProfile as setImageProfileAction, setUserProfile } from '@/redux/slices/userSlice';
import { router } from "expo-router";
import { uploadProfileImage } from "@/services/imageService";
import CustomAlert from "@/components/atoms/CustomAlert";

const completeWorkerProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [fontsLoaded] = useFonts(fonts);
    const [dni, setDni] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [location, setLocation] = useState('');
    const [imageProfile, setImageProfile] = useState('');
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');
    const [localidadSeleccionada, setLocalidadSeleccionada] = useState('');

    // Estados para los CustomAlert
    const [alertConfig, setAlertConfig] = useState({
        visible: false,
        type: 'info' as 'success' | 'error' | 'warning' | 'info',
        title: '',
        message: '',
        showCancel: false,
        confirmText: 'Aceptar',
        cancelText: 'Cancelar',
        onConfirm: () => { },
        onCancel: undefined as (() => void) | undefined
    });

    // Formatea la ubicación para backend
    useEffect(() => {
        if (provinciaSeleccionada && localidadSeleccionada) {
            setLocation(`${localidadSeleccionada}, ${provinciaSeleccionada}`);
        }
    }, [provinciaSeleccionada, localidadSeleccionada]);

    // Icono flecha para el select
    const DropdownIcon = () => (
        <Ionicons
            name="chevron-down"
            size={20}
            color="#fff"
            style={{ marginRight: moderateScale(10) }}
        />
    );

    // Función para mostrar alertas
    const showAlert = (config: Partial<typeof alertConfig>) => {
        setAlertConfig({
            visible: true,
            type: 'info',
            title: '',
            message: '',
            showCancel: false,
            confirmText: config.confirmText ?? 'Aceptar',
            cancelText: config.cancelText ?? 'Cancelar',
            onConfirm: () => setAlertConfig(prev => ({ ...prev, visible: false })),
            onCancel: undefined,
            ...config
        });
    };

    //navegar a la siguiente pantalla
    const navigateToJobProfile = () => {
        router.push('/(main)/(onBoarding)/completeJobProfile');
    }

    //handler para foto del usuario
    const handleSelectProfileImage = async () => {
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
                setImageProfile(uploadedUrl);
                dispatch(setImageProfileAction(uploadedUrl));

                // Mostrar alert de éxito
                showAlert({
                    type: 'success',
                    title: '¡Perfecto!',
                    message: 'Imagen de perfil cargada correctamente.'
                });

            } catch (e) {
                // Mostrar alert de error
                showAlert({
                    type: 'error',
                    title: 'Error al cargar imagen',
                    message: 'No se pudo cargar la imagen. Por favor, inténtelo nuevamente.'
                });
                console.error(e);
            }
        }
    }

    // Validar DNI
    const validateDNI = (text: string) => {
        const numericText = text.replace(/[^0-9]/g, '');
        if (numericText.length <= 8) {
            setDni(numericText);
        } else {
            showAlert({
                type: 'warning',
                title: 'DNI inválido',
                message: 'El DNI no puede tener más de 8 dígitos.'
            });
        }
    };

    //pasar a la siguiente pantalla
    const handleNextStep = () => {
        // Validaciones específicas
        if (!imageProfile) {
            showAlert({
                type: 'warning',
                title: 'Foto requerida',
                message: 'Por favor agregue una foto de perfil para continuar.'
            });
            return;
        }

        if (!dni) {
            showAlert({
                type: 'warning',
                title: 'DNI requerido',
                message: 'Por favor ingrese su número de documento.'
            });
            return;
        }

        if (dni.length < 7 || dni.length > 8) {
            showAlert({
                type: 'warning',
                title: 'DNI inválido',
                message: 'El DNI debe tener entre 7 y 8 dígitos.'
            });
            return;
        }

        if (!userDescription.trim()) {
            showAlert({
                type: 'warning',
                title: 'Descripción requerida',
                message: 'Por favor agregue una breve descripción personal.'
            });
            return;
        }

        if (userDescription.trim().length < 20) {
            showAlert({
                type: 'warning',
                title: 'Descripción muy corta',
                message: 'La descripción debe tener al menos 20 caracteres para ser más descriptiva.'
            });
            return;
        }

        if (!location) {
            showAlert({
                type: 'warning',
                title: 'Ubicación requerida',
                message: 'Por favor seleccione su provincia y localidad.'
            });
            return;
        }

        // Si todo está correcto, mostrar confirmación
        showAlert({
            type: 'info',
            title: 'Confirmar información',
            message: '¿Desea confirmar los valores ingresados?',
            showCancel: true,
            confirmText: 'Sí, continuar',
            cancelText: 'Revisar',
            onConfirm: () => {
                dispatch(setUserProfile({
                    dni,
                    userDescription,
                    imageProfile,
                    location
                }));

                // Alert de éxito antes de navegar
                showAlert({
                    type: 'success',
                    title: '¡Perfil guardado!',
                    message: 'Su información ha sido guardada correctamente.',
                    onConfirm: () => {
                        setAlertConfig(prev => ({ ...prev, visible: false }));
                        navigateToJobProfile();
                    }
                });
            },
            onCancel: () => setAlertConfig(prev => ({ ...prev, visible: false }))
        });
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ImageBackground
                    style={styles.overlay}
                    source={imagePath.backgroundOnBoarding}
                    resizeMode="cover"
                >
                    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">

                        <View style={styles.header}>
                            <Image style={styles.icon} source={imagePath.icon} resizeMode="contain" />

                            <Text style={styles.title}>Complete su perfil como trabajador</Text>

                            <Text style={styles.description}>
                                Complete su perfil como trabajador, la gente podrá encontrarte y contactarte. Asegúrese de proporcionar información precisa y detallada para mejorar su experiencia en la aplicación.
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
                                        onChangeText={validateDNI}
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
                                        maxLength={300}
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
                                        {userDescription.length}/300 caracteres
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
                            <Pressable style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]} onPress={handleNextStep}>
                                <Text style={styles.buttonText}>Siguiente</Text>
                            </Pressable>
                        </View>

                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>

            {/* CustomAlert Component */}
            <CustomAlert
                visible={alertConfig.visible}
                type={alertConfig.type}
                title={alertConfig.title}
                message={alertConfig.message}
                showCancel={alertConfig.showCancel}
                confirmText={alertConfig.showCancel ? alertConfig.confirmText || 'Aceptar' : 'Aceptar'}
                cancelText={alertConfig.cancelText || 'Cancelar'}
                onConfirm={alertConfig.onConfirm}
                onCancel={alertConfig.onCancel}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E3549'
    },

    overlay: {
        flex: 1
    },

    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(20),
        gap: moderateScale(20)
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

    iconButton: {
        padding: 6,
        marginLeft: 4,
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
        marginTop: moderateScale(4),
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
})

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

export default completeWorkerProfile;