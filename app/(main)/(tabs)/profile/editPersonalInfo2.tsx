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
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditPersonalInfo2 = () => {
  const [form, setForm] = useState({
    celular: '',
    direccion: '',
  });

  const handleClear = (field: keyof typeof form) => {
    setForm((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0E3549" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
      {/*   Logo 
        <View style={styles.headerIcon}>
          <Image source={require('../../../assets/images/trofi-logo.png')} style={styles.logoImage} resizeMode="contain" />
        </View>*/}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Realice las modificaciones y</Text>
          <Text style={styles.sectionTitle}>guarde los cambios</Text>

          {/* Provincia y Localidad */}
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>Seleccione provincia</Text>
              <Ionicons name="chevron-down" size={16} color="#CFD8DC" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>Seleccione localidad</Text>
              <Ionicons name="chevron-down" size={16} color="#CFD8DC" />
            </TouchableOpacity>
          </View>

          {/* Celular */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Número de celular"
              placeholderTextColor="#CFD8DC"
              value={form.celular}
              keyboardType="phone-pad"
              onChangeText={(text) => setForm((prev) => ({ ...prev, celular: text }))}
            />
            {form.celular !== '' && (
              <TouchableOpacity onPress={() => handleClear('celular')} style={styles.clearIcon}>
                <Ionicons name="close" size={18} color="#CFD8DC" />
              </TouchableOpacity>
            )}
          </View>

          {/* Fecha de nacimiento */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Fecha de nacimiento"
              placeholderTextColor="#CFD8DC"
              editable={false} // Acá podrías abrir un DatePicker
            />
            <Ionicons name="calendar" size={18} color="#CFD8DC" style={styles.clearIcon} />
          </View>

          {/* Dirección */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su dirección"
              placeholderTextColor="#CFD8DC"
              value={form.direccion}
              onChangeText={(text) => setForm((prev) => ({ ...prev, direccion: text }))}
            />
            {form.direccion !== '' && (
              <TouchableOpacity onPress={() => handleClear('direccion')} style={styles.clearIcon}>
                <Ionicons name="close" size={18} color="#CFD8DC" />
              </TouchableOpacity>
            )}
          </View>

          {/* Botones */}
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Guardar y actualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
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
  container: {
    paddingBottom: 30,
  },
  headerIcon: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  logoImage: {
    width: 60,
    height: 60,
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#CFD8DC',
    width: '48%',
    paddingBottom: 8,
  },
  dropdownText: {
    color: '#CFD8DC',
  },
  inputGroup: {
    marginTop: 20,
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

export default EditPersonalInfo2;
