import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import { router } from 'expo-router';
import CustomAlert from '@/components/atoms/CustomAlert';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface FormData {
  nombre: string;
  email: string;
  tema: string;
  descripcion: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  tema?: string;
  descripcion?: string;
}

const ReportBugScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const [focusedField, setFocusedField] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: user.name ?? '',
    email: user.email ?? '',
    tema: '',
    descripcion: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // Validación de email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    if (!formData.tema.trim()) {
      newErrors.tema = 'El tema es requerido';
    } else if (formData.tema.trim().length < 5) {
      newErrors.tema = 'El tema debe tener al menos 5 caracteres';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción del problema es requerida';
    } else if (formData.descripcion.trim().length < 15) {
      newErrors.descripcion = 'La descripción debe tener al menos 15 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los inputs
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      
      await new Promise(resolve => setTimeout(resolve, 2000));

      
      const success = Math.random() > 0.2; 

      if (success) {
        setShowSuccessAlert(true);
        
        setFormData({
          nombre: '',
          email: '',
          tema: '',
          descripcion: '',
        });
      } else {
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Error enviando reporte:', error);
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar si el formulario tiene datos
  const hasFormData = Object.values(formData).some(value => value.trim().length > 0);

  const closeSuccessAlert = () => {
    setShowSuccessAlert(false);
    router.back();
  };

  const closeErrorAlert = () => {
    setShowErrorAlert(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Ionicons name="bug-outline" size={60} color="#ffffff" />
              </View>
              <Text style={styles.title}>¡Reporta un Bug!</Text>
              <Text style={styles.subtitle}>
                Ayúdanos a mejorar la app reportando cualquier problema que encuentres.
              </Text>
            </View>

            {/* Formulario */}
            <View style={styles.formContainer}>
              
              <View style={styles.fieldContainer}>
                <View
                  style={[
                    styles.inputContainer,
                    focusedField === 'nombre' && styles.inputContainerFocused,
                    errors.nombre && styles.inputContainerError,
                  ]}
                >
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={focusedField === 'nombre' ? '#FFFFFF' : '#B0BEC5'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
                    placeholderTextColor="#B0BEC5"
                    autoCapitalize="words"
                    value={formData.nombre}
                    onChangeText={(value) => handleInputChange('nombre', value)}
                    onFocus={() => setFocusedField('nombre')}
                    onBlur={() => setFocusedField('')}
                    maxLength={50}
                    selectionColor={'#fff'}
                  />
                </View>
                {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
              </View>

              {/* Campo Email */}
              <View style={styles.fieldContainer}>
                <View
                  style={[
                    styles.inputContainer,
                    focusedField === 'email' && styles.inputContainerFocused,
                    errors.email && styles.inputContainerError,
                  ]}
                >
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={focusedField === 'email' ? '#FFFFFF' : '#B0BEC5'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    placeholderTextColor="#B0BEC5"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    maxLength={100}
                    selectionColor={'#fff'}
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              {/* Campo Tema */}
              <View style={styles.fieldContainer}>
                <View
                  style={[
                    styles.inputContainer,
                    focusedField === 'tema' && styles.inputContainerFocused,
                    errors.tema && styles.inputContainerError,
                  ]}
                >
                  <Ionicons
                    name="warning-outline"
                    size={20}
                    color={focusedField === 'tema' ? '#FFFFFF' : '#B0BEC5'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Tema del problema"
                    placeholderTextColor="#B0BEC5"
                    autoCapitalize="sentences"
                    value={formData.tema}
                    onChangeText={(value) => handleInputChange('tema', value)}
                    onFocus={() => setFocusedField('tema')}
                    onBlur={() => setFocusedField('')}
                    maxLength={80}
                    selectionColor={'#fff'}
                  />
                </View>
                {errors.tema && <Text style={styles.errorText}>{errors.tema}</Text>}
              </View>

              {/* Campo Descripción */}
              <View style={styles.fieldContainer}>
                <View
                  style={[
                    styles.largeInputContainer,
                    focusedField === 'descripcion' && styles.inputContainerFocused,
                    errors.descripcion && styles.inputContainerError,
                  ]}
                >
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color={focusedField === 'descripcion' ? '#FFFFFF' : '#B0BEC5'}
                    style={styles.textAreaIcon}
                  />
                  <TextInput
                    style={styles.largeInput}
                    placeholder="Describe detalladamente el problema que encontraste..."
                    placeholderTextColor="#B0BEC5"
                    multiline
                    textAlignVertical="top"
                    autoCapitalize="sentences"
                    value={formData.descripcion}
                    onChangeText={(value) => handleInputChange('descripcion', value)}
                    onFocus={() => setFocusedField('descripcion')}
                    onBlur={() => setFocusedField('')}
                    maxLength={800}
                    selectionColor={'#000000'}
                  />
                </View>
                {errors.descripcion && <Text style={styles.errorText}>{errors.descripcion}</Text>}
                <Text style={styles.characterCount}>
                  {formData.descripcion.length}/800 caracteres
                </Text>
              </View>
            </View>

            {/* Botones de acción */}
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => router.back()}
                disabled={isLoading}
              >
                <Ionicons name="close-outline" size={20} color="#FFFFFF" />
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  (!hasFormData || isLoading) && styles.submitButtonDisabled
                ]}
                onPress={handleSubmit}
                disabled={!hasFormData || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#24475E" />
                ) : (
                  <>
                    <Ionicons name="send-outline" size={20} color="#24475E" />
                    <Text style={styles.submitButtonText}>Enviar Reporte</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Alertas */}
      <CustomAlert
        visible={showSuccessAlert}
        title="¡Reporte enviado!"
        message="Tu reporte ha sido enviado correctamente. Gracias por ayudarnos a mejorar."
        type="success"
        confirmText="Entendido"
        onConfirm={closeSuccessAlert}
      />

      <CustomAlert
        visible={showErrorAlert}
        title="Error al enviar"
        message="No se pudo enviar tu reporte. Por favor, verifica tu conexión e inténtalo nuevamente."
        type="error"
        confirmText="Reintentar"
        onConfirm={closeErrorAlert}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    backgroundColor: '#24475E',
  },
  header: {
    alignItems: 'center',
    paddingTop: moderateScale(30),
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(20),
  },
  iconContainer: {
    marginBottom: moderateScale(15),
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: '#B0BEC5',
    textAlign: 'center',
    lineHeight: moderateScale(22),
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },
  fieldContainer: {
    marginBottom: moderateScale(20),
  },
  inputContainer: {
    backgroundColor: '#37698A',
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  largeInputContainer: {
    backgroundColor: '#37698A',
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(15),
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: moderateScale(140),
  },
  inputContainerFocused: {
    borderColor: '#FFFFFF',
    backgroundColor: '#3A7096',
  },
  inputContainerError: {
    borderColor: '#FF6B6B',
  },
  inputIcon: {
    marginRight: moderateScale(12),
  },
  textAreaIcon: {
    position: 'absolute',
    top: moderateScale(15),
    left: moderateScale(15),
  },
  input: {
    flex: 1,
    height: moderateScale(50),
    color: '#FFFFFF',
    fontSize: moderateScale(16),
  },
  largeInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    textAlignVertical: 'top',
    paddingLeft: moderateScale(32),
    minHeight: moderateScale(110),
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: moderateScale(12),
    marginTop: moderateScale(5),
    marginLeft: moderateScale(5),
  },
  characterCount: {
    color: '#B0BEC5',
    fontSize: moderateScale(12),
    textAlign: 'right',
    marginTop: moderateScale(5),
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(30),
    gap: moderateScale(15),
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: moderateScale(25),
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(8),
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  submitButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(25),
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(8),
  },
  submitButtonDisabled: {
    backgroundColor: '#B0BEC5',
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#24475E',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
});

export default ReportBugScreen;