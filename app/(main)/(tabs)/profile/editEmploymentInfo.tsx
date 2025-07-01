import { useEffect, useState } from 'react';
import {
    View,
    TextInput,
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import imagePath from '@/constants/imagePath';
import ButtonComponent from '@/components/atoms/ButtonComponent';
import CustomAlert from '@/components/atoms/CustomAlert';
import Loader from '@/components/atoms/Loader';
import { fetchJobCategories } from '@/services/jobService';
import { updateJob, updateJobDescription } from '@/services/userService';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setUserProfile } from '@/redux/slices/userSlice';
import { storeData } from '@/utils/storage';

const editEmploymentInfo = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [jobs, setJobs] = useState<{ id: number; name: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingJobs, setIsLoadingJobs] = useState(true);

    // Estados para CustomAlert
    const [alertConfig, setAlertConfig] = useState({
        visible: false,
        title: '',
        message: '',
        type: 'info' as 'success' | 'error' | 'warning' | 'info',
        showCancel: false,
        confirmText: undefined as string | undefined,
        cancelText: undefined as string | undefined,
        onConfirm: () => { },
        onCancel: undefined as (() => void) | undefined
    });

    useEffect(() => {
        const loadJobs = async () => {
            setIsLoadingJobs(true);
            try {
                const fetchedJobs = await fetchJobCategories();
                setJobs(fetchedJobs);

                // Establecer valores iniciales desde Redux
                if (user.jobId) setSelectedJobId(user.jobId);
                if (user.jobDescripction) setJobDescription(user.jobDescripction);
            } catch (e) {
                console.error("Error cargando los trabajos", e);
                showAlert({
                    title: 'Error',
                    message: 'No se pudieron cargar los oficios. Verifique su conexión.',
                    type: 'error',
                    onConfirm: () => hideAlert()
                });
            } finally {
                setIsLoadingJobs(false);
            }
        };
        loadJobs();
    }, []);

    const showAlert = (config: Partial<typeof alertConfig>) => {
        setAlertConfig(prev => ({
            ...prev,
            visible: true,
            ...config
        }));
    };

    const hideAlert = () => {
        setAlertConfig(prev => ({ ...prev, visible: false }));
    };

    const handleSave = async () => {
        if (!selectedJobId || !jobDescription.trim()) {
            showAlert({
                title: 'Campos incompletos',
                message: 'Por favor complete todos los campos antes de continuar.',
                type: 'warning',
                onConfirm: () => hideAlert()
            });
            return;
        }

        setIsLoading(true);
        try {
            await updateJob(selectedJobId);
            await updateJobDescription(jobDescription.trim());

            // Actualizar Redux
            dispatch(setUserProfile({
                jobId: selectedJobId,
                jobDescripction: jobDescription.trim(),
            }));

            await storeData('userData', {
                ...user,
                jobId: selectedJobId,
                jobDescripction: jobDescription.trim(),
            });

            showAlert({
                title: 'Éxito',
                message: 'Su información laboral ha sido actualizada correctamente.',
                type: 'success',
                onConfirm: () => {
                    hideAlert();
                    router.back();
                }
            });
        } catch (error) {
            console.error('Error al guardar:', error);
            showAlert({
                title: 'Error',
                message: 'No se pudo guardar la información. Por favor, intente nuevamente.',
                type: 'error',
                onConfirm: () => hideAlert()
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        showAlert({
            title: 'Confirmar cancelación',
            message: '¿Está seguro que desea cancelar? Los cambios no guardados se perderán.',
            type: 'warning',
            showCancel: true,
            confirmText: 'Sí, cancelar',
            cancelText: 'No, continuar',
            onConfirm: () => {
                hideAlert();
                router.back();
            },
            onCancel: () => hideAlert()
        });
    };

    // Mostrar loader simple mientras cargan los trabajos (igual que en Search)
    if (isLoadingJobs) {
        return <Loader />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={styles.overlay}
                source={imagePath.editWorkInfoBackground}
                resizeMode="cover"
            >
                <View style={styles.header}>
                    <Image source={imagePath.icon} style={styles.iconStyle} resizeMode="contain" />
                </View>

                <View style={styles.iconContainer}>
                    <Ionicons name="briefcase-outline" size={moderateScale(40)} color="lightblue" />
                    <Text style={styles.text}>Edite su información laboral</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedJobId}
                            onValueChange={(value) => setSelectedJobId(value)}
                            dropdownIconColor="#ccc"
                            style={styles.picker}
                            enabled={!isLoading}
                        >
                            <Picker.Item label="Seleccione un oficio" value={null} />
                            {jobs.map((job) => (
                                <Picker.Item key={job.id} label={job.name} value={job.id} />
                            ))}
                        </Picker>
                    </View>

                    <TextInput
                        style={[
                            styles.input,
                            styles.textArea,
                            isLoading && styles.disabledInput
                        ]}
                        placeholder="Describa su trabajo (ej: experiencia, habilidades, tareas)"
                        placeholderTextColor="#ccc"
                        value={jobDescription}
                        onChangeText={setJobDescription}
                        multiline
                        numberOfLines={4}
                        editable={!isLoading}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <ButtonComponent
                        title={isLoading ? "Guardando..." : "Guardar y actualizar"}
                        iconName="save-outline"
                        onPress={handleSave}
                        disabled={isLoading}
                    />
                    <ButtonComponent
                        title="Cancelar"
                        iconName="close-circle-outline"
                        onPress={handleCancel}
                        disabled={isLoading}
                    />
                </View>

                {/* Loader simple cuando está guardando (igual que en Search) */}
                {isLoading && <Loader />}
            </ImageBackground>

            {/* Custom Alert */}
            <CustomAlert
                visible={alertConfig.visible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                showCancel={alertConfig.showCancel}
                confirmText={alertConfig.confirmText}
                cancelText={alertConfig.cancelText}
                onConfirm={alertConfig.onConfirm}
                onCancel={alertConfig.onCancel}
            />
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
        justifyContent: 'space-between'
    },
    header: {
        alignItems: 'center',
        marginTop: moderateScale(10)
    },
    iconStyle: {
        width: moderateScale(50),
        height: moderateScale(50)
    },
    iconContainer: {
        alignItems: 'center',
        marginTop: moderateScale(10),
        gap: moderateScale(10)
    },
    formContainer: {
        paddingHorizontal: moderateScale(40),
        gap: moderateScale(20)
    },
    input: {
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        padding: moderateScale(12),
        fontSize: moderateScale(14),
    },
    textArea: {
        textAlignVertical: 'top',
        height: moderateScale(100),
    },
    disabledInput: {
        backgroundColor: '#f5f5f5',
        color: '#999',
    },
    text: {
        fontSize: moderateScale(20),
        textAlign: 'center',
        color: '#FFFFFF',
    },
    pickerContainer: {
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        overflow: 'hidden',
    },
    picker: {
        height: moderateScale(50),
        color: '#000',
    },
    buttonContainer: {
        padding: moderateScale(40),
        gap: moderateScale(20),
    },
});

export default editEmploymentInfo;