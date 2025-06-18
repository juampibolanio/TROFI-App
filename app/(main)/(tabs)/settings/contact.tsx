import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import { router } from 'expo-router';

const Contact = () => {
    const [focusedField, setFocusedField] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="mail-outline" size={60} color="#ffffff" />
                    </View>

                    <Text style={styles.title}>¡Contáctanos!</Text>

                    {/* Campos del formulario */}
                    <View
                        style={[
                            styles.inputContainer,
                            focusedField === 'nombre' && styles.inputContainerFocused,
                        ]}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor="#B0BEC5"
                            autoCapitalize="words"
                            onFocus={() => setFocusedField('nombre')}
                            onBlur={() => setFocusedField('')}
                        />
                    </View>

                    <View
                        style={[
                            styles.inputContainer,
                            focusedField === 'email' && styles.inputContainerFocused,
                        ]}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#B0BEC5"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField('')}
                        />
                    </View>

                    <View
                        style={[
                            styles.inputContainer,
                            focusedField === 'asunto' && styles.inputContainerFocused,
                        ]}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder="Asunto"
                            placeholderTextColor="#B0BEC5"
                            autoCapitalize="words"
                            onFocus={() => setFocusedField('asunto')}
                            onBlur={() => setFocusedField('')}
                        />
                    </View>

                    <View
                        style={[
                            styles.largeInputContainer,
                            focusedField === 'mensaje' && styles.inputContainerFocused,
                        ]}
                    >
                        <TextInput
                            style={styles.largeInput}
                            placeholder="Escribe tu mensaje aquí..."
                            placeholderTextColor="#B0BEC5"
                            multiline
                            textAlignVertical="top"
                            autoCapitalize="sentences"
                            onFocus={() => setFocusedField('mensaje')}
                            onBlur={() => setFocusedField('')}
                        />
                    </View>

                    {/* Botones de acción */}
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
        padding: moderateScale(20),
        backgroundColor: '#24475E',
        paddingTop: moderateScale(30),
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: moderateScale(20),
    },
    title: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: moderateScale(30),
        textAlign: 'center',
    },
    inputContainer: {
        backgroundColor: '#37698A',
        borderRadius: moderateScale(10),
        marginBottom: moderateScale(15),
        paddingHorizontal: moderateScale(15),
        borderWidth: 0,
        borderColor: 'transparent',
    },
    largeInputContainer: {
        backgroundColor: '#37698A',
        borderRadius: moderateScale(15),
        marginBottom: moderateScale(20),
        paddingHorizontal: moderateScale(15),
        borderWidth: 0,
        borderColor: 'transparent',
    },
    inputContainerFocused: {
        borderColor: '#FFFFFF',
        borderWidth: 2,
    },
    input: {
        height: moderateScale(45),
        color: '#FFFFFF',
    },
    largeInput: {
        height: moderateScale(120),
        color: '#FFFFFF',
        textAlignVertical: 'top',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: moderateScale(25),
        paddingVertical: moderateScale(12),
        paddingHorizontal: moderateScale(30),
        alignItems: 'center',
        flex: 1,
        marginRight: moderateScale(10),
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: moderateScale(16),
    },
    submitButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(25),
        paddingVertical: moderateScale(12),
        paddingHorizontal: moderateScale(30),
        alignItems: 'center',
        flex: 1,
        marginLeft: moderateScale(10),
    },
    submitButtonText: {
        color: '#24475E',
        fontWeight: 'bold',
        fontSize: moderateScale(16),
    },
});

export default Contact;
