import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, SafeAreaView, ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import imagePath from '@/constants/imagePath';
import { updatePhoneNumber, updateUserName } from '@/services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '@/redux/slices/userSlice';
import { RootState } from '@/redux/store';
import CustomAlert from '@/components/atoms/CustomAlert';
import Loader from '@/components/atoms/Loader';
import { moderateScale } from 'react-native-size-matters';

const EditPersonalInfo1 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [celular, setCelular] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info',
    showCancel: false,
    onConfirm: () => {},
    onCancel: undefined as (() => void) | undefined,
  });

  const showAlert = (config: typeof alertConfig) => {
    setAlertConfig(config);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const handleClear = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter('');
  };

  const validateInputs = () => {
    if (!nombre.trim()) {
      showAlert({
        title: 'Campo requerido',
        message: 'Por favor ingresa tu nombre',
        type: 'warning',
        showCancel: false,
        onConfirm: hideAlert,
        onCancel: undefined,
      });
      return false;
    }

    if (!apellido.trim()) {
      showAlert({
        title: 'Campo requerido',
        message: 'Por favor ingresa tu apellido',
        type: 'warning',
        showCancel: false,
        onConfirm: hideAlert,
        onCancel: undefined,
      });
      return false;
    }

    if (!celular.trim() || celular.trim().length < 6) {
      showAlert({
        title: 'Número inválido',
        message: 'Por favor ingresa un número de celular válido (mínimo 6 dígitos)',
        type: 'warning',
        showCancel: false,
        onConfirm: hideAlert,
        onCancel: undefined,
      });
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateInputs()) return;

    // Obtener UID
    const uid = user.uid;
    
    if (!uid) {
      showAlert({
        title: 'Error de sesión',
        message: 'No se pudo identificar al usuario. Por favor, inicia sesión nuevamente.',
        type: 'error',
        showCancel: false,
        onConfirm: () => {
          hideAlert();
          router.replace('/(main)/(auth)');
        },
        onCancel: undefined,
      });
      return;
    }

    const fullName = `${nombre.trim()} ${apellido.trim()}`;
    
    showAlert({
      title: 'Confirmar cambios',
      message: '¿Estás seguro de que deseas actualizar tu información personal?',
      type: 'info',
      showCancel: true,
      onConfirm: async () => {
        hideAlert();
        setIsLoading(true);
        
        try {
          // Pasar UID a las funciones
          await updateUserName(uid, fullName);
          await updatePhoneNumber(uid, celular);

          dispatch(setUserProfile({
            name: fullName,
            phoneNumber: celular,
          }));

          setIsLoading(false);
          showAlert({
            title: '¡Éxito!',
            message: 'Tus datos han sido actualizados correctamente',
            type: 'success',
            showCancel: false,
            onConfirm: () => {
              hideAlert();
              router.back();
            },
            onCancel: undefined,
          });
        } catch (error) {
          setIsLoading(false);
          console.error('Error al actualizar:', error);
          showAlert({
            title: 'Error',
            message: 'No se pudieron actualizar los datos. Por favor intenta nuevamente.',
            type: 'error',
            showCancel: false,
            onConfirm: hideAlert,
            onCancel: undefined,
          });
        }
      },
      onCancel: hideAlert,
    });
  };

  const handleCancel = () => {
    if (nombre.trim() || apellido.trim() || celular.trim()) {
      showAlert({
        title: 'Confirmar salida',
        message: 'Tienes cambios sin guardar. ¿Estás seguro de que deseas salir?',
        type: 'warning',
        showCancel: true,
        onConfirm: () => {
          hideAlert();
          router.back();
        },
        onCancel: hideAlert,
      });
    } else {
      router.back();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground style={styles.overlay} source={imagePath.backgroundOnBoarding}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
          <View style={styles.headerIcon}>
            <Ionicons name="home" size={32} color="white" />
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Modificar nombre y teléfono</Text>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="#CFD8DC"
                value={nombre}
                onChangeText={setNombre}
              />
              {nombre !== '' && (
                <TouchableOpacity onPress={() => handleClear(setNombre)} style={styles.clearIcon}>
                  <Ionicons name="close" size={18} color="#CFD8DC" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Apellido"
                placeholderTextColor="#CFD8DC"
                value={apellido}
                onChangeText={setApellido}
              />
              {apellido !== '' && (
                <TouchableOpacity onPress={() => handleClear(setApellido)} style={styles.clearIcon}>
                  <Ionicons name="close" size={18} color="#CFD8DC" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Número de celular"
                placeholderTextColor="#CFD8DC"
                keyboardType="phone-pad"
                value={celular}
                onChangeText={setCelular}
              />
              {celular !== '' && (
                <TouchableOpacity onPress={() => handleClear(setCelular)} style={styles.clearIcon}>
                  <Ionicons name="close" size={18} color="#CFD8DC" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Guardar y actualizar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.saveButton, { marginTop: 10 }]}
              onPress={() => router.push('/(main)/(tabs)/profile/editPersonalInfo2')}
            >
              <Text style={[styles.saveButtonText, { color: '#0E3549' }]}>Editar otros datos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>

      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        showCancel={alertConfig.showCancel}
        onConfirm={alertConfig.onConfirm}
        onCancel={alertConfig.onCancel}
        confirmText="Aceptar"
        cancelText="Cancelar"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#0E3549' 
  },
  overlay: { 
    flex: 1 
  },
  scrollView: { 
    flex: 1 
  },
  container: { 
    paddingBottom: 30 
  },
  headerIcon: { 
    alignItems: 'center', 
    marginTop: 20, 
    marginBottom: 10 
  },
  card: { 
    marginHorizontal: 20, 
    marginTop: 10 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: 'white', 
    marginBottom: 10 
  },
  inputGroup: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderColor: '#CFD8DC',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: { 
    flex: 1, 
    paddingVertical: 10, 
    color: 'white', 
    fontSize: 14 
  },
  clearIcon: { 
    padding: 5 
  },
  saveButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 25,
  },
  saveButtonText: { 
    color: '#0E3549', 
    fontWeight: 'bold', 
    fontSize: 16 
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
});

export default EditPersonalInfo1;