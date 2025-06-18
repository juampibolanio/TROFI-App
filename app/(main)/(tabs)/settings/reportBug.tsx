import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,

  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const ReportBugScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="bug-outline" size={60} color="#24475E" />
        </View>
        <Text style={styles.title}>¡Reporta un bug!</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#B0BEC5"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#B0BEC5"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tema"
            placeholderTextColor="#B0BEC5"
          />
        </View>
        <View style={styles.largeInputContainer}>
          <TextInput
            style={styles.largeInput}
            placeholder="Cuentanos el problema"
            placeholderTextColor="#B0BEC5"
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Enviar mensaje</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    padding: 20,
    backgroundColor: '#24475E',
    paddingTop: 30,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#37698A',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  input: {
    height: 45,
    color: 'white',
  },
  largeInputContainer: {
    backgroundColor: '#37698A',
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  largeInput: {
    height: 120,
    color: 'white',
    textAlignVertical: 'top',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  submitButtonText: {
    color: '#24475E',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ReportBugScreen;