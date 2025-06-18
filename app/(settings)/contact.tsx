    import React from 'react';
    import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';
    import { StatusBar } from 'expo-status-bar';

    const contactact= () => {
    return (
        <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" backgroundColor="#24475E" />
        
        <View style={styles.container}>
            <View style={styles.iconContainer}>
            {/*ICONO CONTACTO */}
            <Ionicons name="mail-outline" size={60} color="#ffffff" />
            </View>

            <Text style={styles.title}>¡Contáctanos!</Text>

            {/* Campos del formulario */}
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
                placeholder="Asunto"
                placeholderTextColor="#B0BEC5"
            />
            </View>

            <View style={styles.largeInputContainer}>
            <TextInput
                style={styles.largeInput}
                placeholder="Escribe tu mensaje"
                placeholderTextColor="#B0BEC5"
                multiline
                textAlignVertical="top"
            />
            </View>

            {/* Botones de acción */}
            <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    );
    };

    // estilos reutilizados 
    const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    headerButton: {
        padding: 8,
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#24475E',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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

export default contactact;
