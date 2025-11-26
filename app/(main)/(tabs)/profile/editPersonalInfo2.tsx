import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, SafeAreaView, ImageBackground,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import imagePath from '@/constants/imagePath';
import { useRouter } from 'expo-router';
import CustomAlert from '@/components/atoms/CustomAlert';
import Loader from '@/components/atoms/Loader';
import { ubicacionesArgentina, provinciasArgentina } from '@/data/argentinaUbicaciones';
import { updateLocation, updateUserDescription } from '@/services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '@/redux/slices/userSlice';
import { RootState } from '@/redux/store';

const EditPersonalInfo2 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  
  const [provincia, setProvincia] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info',
    showCancel: false,
    confirmText: undefined as string | undefined,
    cancelText: undefined as string | undefined,
    onConfirm: () => {},
    onCancel: undefined as (() => void) | undefined
  });

  useEffect(() => {
    const initializeData = async () => {
      try {
        setTimeout(() => {
          if (user.location) {
            const [userLocalidad, userProvincia] = user.location.split(', ');
            if (userProvincia && userLocalidad) {
              setProvincia(userProvincia);
              setLocalidad(userLocalidad);
            }
          }
          if (user.userDescription) {
            setDescripcion(user.userDescription);
          }
          setIsInitialLoading(false);
        }, 800);
      } catch (error) {
        setIsInitialLoading(false);
        showAlert({
          title: 'Error',
          message: 'Error al cargar la información personal.',
          type: 'error',
          onConfirm: () => hideAlert()
        });
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    if (provincia && localidad) {
      setLocation(`${localidad}, ${provincia}`);
    }
  }, [provincia, localidad]);

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

  const validateForm = () => {
    if (!provincia.trim()) {
      showAlert({
        title: 'Campo requerido',
        message: 'Por favor seleccione una provincia.',
        type: 'warning',
        onConfirm: () => hideAlert()
      });
      return false;
    }

    if (!localidad.trim()) {
      showAlert({
        title: 'Campo requerido',
        message: 'Por favor seleccione una localidad.',
        type: 'warning',
        onConfirm: () => hideAlert()
      });
      return false;
    }

    if (!descripcion.trim()) {
      showAlert({
        title: 'Campo requerido',
        message: 'Por favor ingrese una descripción personal.',
        type: 'warning',
        onConfirm: () => hideAlert()
      });
      return false;
    }

    if (descripcion.length < 5) {
      showAlert({
        title: 'Descripción muy corta',
        message: 'La descripción debe tener al menos 5 caracteres.',
        type: 'warning',
        onConfirm: () => hideAlert()
      });
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    // Obtener UID
    const uid = user.uid;
    
    if (!uid) {
      showAlert({
        title: 'Error de sesión',
        message: 'No se pudo identificar al usuario. Por favor, inicia sesión nuevamente.',
        type: 'error',
        onConfirm: () => {
          hideAlert();
          router.replace('/(main)/(auth)');
        }
      });
      return;
    }

    setIsLoading(true);
    try {
      // 🔹 Enviar UID en body para cumplir con Joi
      await updateLocation(uid, location);
      await updateUserDescription(uid, descripcion);

      dispatch(setUserProfile({
        location,
        userDescription: descripcion,
      }));

      showAlert({
        title: 'Éxito',
        message: 'Su información personal ha sido actualizada correctamente.',
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
    const hasChanges = (
      location !== (user.location || '') ||
      descripcion !== (user.userDescription || '')
    );

    if (hasChanges) {
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
    } else {
      router.back();
    }
  };

  if (isInitialLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground source={imagePath.backgroundOnBoarding} style={styles.backgroundImage}>
          <Loader />
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={imagePath.backgroundOnBoarding} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Modificar ubicación y descripción</Text>

            {/* Provincia */}
            <View style={[styles.inputGroup, isLoading && styles.disabledInputGroup]}>
              <RNPickerSelect
                placeholder={{ label: 'Seleccione provincia', value: '' }}
                value={provincia}
                onValueChange={(value) => {
                  if (!isLoading) {
                    setProvincia(value);
                    setLocalidad('');
                  }
                }}
                items={provinciasArgentina.map((prov) => ({ label: prov, value: prov }))}
                style={{
                  ...pickerSelectStyles,
                  inputIOS: {
                    ...pickerSelectStyles.inputIOS,
                    color: isLoading ? '#6c757d' : '#fff',
                  },
                  inputAndroid: {
                    ...pickerSelectStyles.inputAndroid,
                    color: isLoading ? '#6c757d' : '#fff',
                  }
                }}
                useNativeAndroidPickerStyle={false}
                disabled={isLoading}
                Icon={() => <Ionicons name="chevron-down" size={16} color={isLoading ? "#6c757d" : "#CFD8DC"} />}
              />
            </View>

            {/* Localidad */}
            {provincia !== '' && (
              <View style={[styles.inputGroup, isLoading && styles.disabledInputGroup]}>
                <RNPickerSelect
                  placeholder={{ label: 'Seleccione localidad', value: '' }}
                  value={localidad}
                  onValueChange={(value) => {
                    if (!isLoading) {
                      setLocalidad(value);
                    }
                  }}
                  items={
                    provincia && (ubicacionesArgentina as Record<string, string[]>)[provincia]
                      ? (ubicacionesArgentina as Record<string, string[]>)[provincia].map((loc) => ({ label: loc, value: loc }))
                      : []
                  }
                  style={{
                    ...pickerSelectStyles,
                    inputIOS: {
                      ...pickerSelectStyles.inputIOS,
                      color: isLoading ? '#6c757d' : '#fff',
                    },
                    inputAndroid: {
                      ...pickerSelectStyles.inputAndroid,
                      color: isLoading ? '#6c757d' : '#fff',
                    }
                  }}
                  useNativeAndroidPickerStyle={false}
                  disabled={isLoading}
                  Icon={() => <Ionicons name="chevron-down" size={16} color={isLoading ? "#6c757d" : "#CFD8DC"} />}
                />
              </View>
            )}

            {/* Descripción */}
            <View style={[styles.inputGroup, isLoading && styles.disabledInputGroup]}>
              <TextInput
                style={[
                  styles.input, 
                  styles.textArea,
                  isLoading && styles.disabledInput
                ]}
                placeholder="Descripción personal"
                placeholderTextColor={isLoading ? "#6c757d" : "#CFD8DC"}
                multiline
                numberOfLines={4}
                value={descripcion}
                onChangeText={setDescripcion}
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity 
              style={[styles.saveButton, isLoading && styles.disabledButton]} 
              onPress={handleSave}
              disabled={isLoading}
            >
              <Text style={[styles.saveButtonText, isLoading && styles.disabledButtonText]}>
                {isLoading ? 'Guardando...' : 'Guardar y actualizar'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.cancelButton, isLoading && styles.disabledCancelButton]} 
              onPress={handleCancel}
              disabled={isLoading}
            >
              <Text style={[styles.cancelButtonText, isLoading && styles.disabledCancelButtonText]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <Loader />
          </View>
        )}
      </ImageBackground>

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
  safeArea: { 
    flex: 1, 
    backgroundColor: '#0E3549' 
  },
  backgroundImage: { 
    flex: 1 
  },
  container: { 
    flexGrow: 1, 
    paddingBottom: 30 
  },
  card: { 
    marginHorizontal: 20, 
    marginTop: 10 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: 'white', 
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  inputGroup: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderColor: '#CFD8DC',
    paddingBottom: 6,
  },
  disabledInputGroup: {
    borderColor: '#6c757d',
    opacity: 0.7,
  },
  input: { 
    color: 'white', 
    fontSize: 14 
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  disabledInput: {
    color: '#6c757d',
  },
  saveButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonText: { 
    color: '#0E3549', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  disabledButton: {
    backgroundColor: '#f8f9fa',
    opacity: 0.7,
  },
  disabledButtonText: {
    color: '#6c757d',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  disabledCancelButton: {
    borderColor: '#6c757d',
    opacity: 0.7,
  },
  disabledCancelButtonText: {
    color: '#6c757d',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(14, 53, 73, 0.8)',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: { color: '#fff', paddingVertical: 6, fontSize: 14 },
  inputAndroid: { color: '#fff', paddingVertical: 6, fontSize: 14 },
  placeholder: { color: '#CFD8DC' },
});

export default EditPersonalInfo2;
