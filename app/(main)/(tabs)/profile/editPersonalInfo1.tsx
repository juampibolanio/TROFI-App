import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type FormFields = {
  nombre: string;
  apellido: string;
  correo: string;
  correo2: string;
  password: string;
  password2: string;
};

const EditPersonalInfo1 = () => {
  const router = useRouter();

  const [form, setForm] = useState<FormFields>({
    nombre: '',
    apellido: '',
    correo: '',
    correo2: '',
    password: '',
    password2: '',
  });

  const handleClear = (field: keyof FormFields) => {
    setForm((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0E3549" barStyle="light-content" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        {/* Icono superior */}
        <View style={styles.headerIcon}>
          <Ionicons name="home" size={32} color="white" />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Realice las modificaciones y</Text>
          <Text style={styles.sectionTitle}>guarde los cambios</Text>

          {/* Inputs */}
          {[
            { field: 'nombre', placeholder: 'Ingrese su nombre' },
            { field: 'apellido', placeholder: 'Ingrese su apellido' },
            { field: 'correo', placeholder: 'Ingrese su nuevo correo electrónico' },
            { field: 'correo2', placeholder: 'Ingrese nuevamente su correo' },
            { field: 'password', placeholder: 'Ingrese nueva contraseña', secure: true },
            { field: 'password2', placeholder: 'Repita la contraseña', secure: true },
          ].map(({ field, placeholder, secure }) => (
            <View style={styles.inputGroup} key={field}>
              <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#CFD8DC"
                value={form[field as keyof FormFields]}
                secureTextEntry={secure}
                keyboardType={
                  placeholder.toLowerCase().includes('correo') ? 'email-address' : 'default'
                }
                onChangeText={(text) =>
                  setForm((prev) => ({ ...prev, [field as keyof FormFields]: text }))
                }
              />
              {form[field as keyof FormFields] !== '' && (
                <TouchableOpacity onPress={() => handleClear(field as keyof FormFields)} style={styles.clearIcon}>
                  <Ionicons name="close" size={18} color="#CFD8DC" />
                </TouchableOpacity>
              )}
            </View>
          ))}

          {/* Género */}
          <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Seleccione su género</Text>
          <View style={styles.genderContainer}>
            {['Hombre', 'Mujer', 'Prefiero no contestar'].map((label, index) => (
              <TouchableOpacity key={index} style={styles.radioButton}>
                <View style={styles.radioCircle} />
                <Text style={styles.radioText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Ver más datos */}
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreButtonText}>Ver más datos</Text>
          </TouchableOpacity>

          {/* Guardar y cancelar */}
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Guardar y actualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0E3549',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    paddingBottom: 30,
  },
  headerIcon: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
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
    fontSize: 14,
  },
  clearIcon: {
    padding: 5,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ECEFF1',
    borderRadius: 20,
    marginTop: 10,
    paddingVertical: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0E3549',
    marginRight: 6,
  },
  radioText: {
    color: '#0E3549',
    fontWeight: '600',
  },
  viewMoreButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 25,
  },
  viewMoreButtonText: {
    color: '#0E3549',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  saveButtonText: {
    color: '#0E3549',
    fontWeight: 'bold',
    fontSize: 16,
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
    fontSize: 16,
  },
});

export default EditPersonalInfo1;
