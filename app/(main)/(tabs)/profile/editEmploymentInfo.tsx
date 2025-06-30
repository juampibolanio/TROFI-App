import React, { useState } from 'react';
import {
    View,
    TextInput,
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import imagePath from '@/constants/imagePath';
import ButtonComponent from '@/components/atoms/ButtonComponent';

const editEmploymentInfo = () => {
    const [yearsExperience, setYearsExperience] = useState('');
    const [selectedJob, setSelectedJob] = useState('');
    const [customJob, setCustomJob] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    const jobName = selectedJob === 'otro' ? customJob.trim() : selectedJob;

    const handleSave = () => {
        if (!yearsExperience || !jobName || !jobDescription.trim()) {
            Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
            return;
        }

        console.log({
            años: yearsExperience,
            oficio: jobName,
            descripcion: jobDescription.trim(),
        });

        router.back();
    };

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
                    <Ionicons name="arrow-up-circle" size={moderateScale(40)} color="lightblue" />
                </View>

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese sus años de experiencia"
                        keyboardType="numeric"
                        value={yearsExperience}
                        onChangeText={setYearsExperience}
                        placeholderTextColor="#ccc"
                    />

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedJob}
                            onValueChange={(itemValue: string) => {
                                setSelectedJob(itemValue);
                                if (itemValue !== 'otro') setCustomJob('');
                            }}
                            dropdownIconColor="#ccc"
                            style={styles.picker}>
                            <Picker.Item label="Seleccione un oficio" value="" />
                            <Picker.Item label="Electricista" value="electricista" />
                            <Picker.Item label="Plomero" value="plomero" />
                            <Picker.Item label="Carpintero" value="carpintero" />
                            <Picker.Item label="Herrero" value="herrero" />
                            <Picker.Item label="Albañil" value="albanil" />
                            <Picker.Item label="Cuidados" value="cuidados" />
                            <Picker.Item label="Otro (Especificar)" value="otro" />
                        </Picker>
                    </View>

                    {selectedJob === 'otro' && (
                        <TextInput
                            style={styles.input}
                            placeholder="Especifique el oficio"
                            placeholderTextColor="#ccc"
                            value={customJob}
                            onChangeText={setCustomJob}
                        />
                        //Se podria agregar algo como poder subir pdf de un titulo o certificado(?)
                    )}
        
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Describa su trabajo (ej: experiencia, habilidades, tareas)"
                        placeholderTextColor="#ccc"
                        value={jobDescription}
                        onChangeText={setJobDescription}
                        multiline
                        numberOfLines={4}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <ButtonComponent title="Guardar y actualizar" iconName="save-outline" onPress={handleSave} />
                    <ButtonComponent title="Cancelar" iconName="close-circle-outline" onPress={() => router.back()} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0E3549' },
    overlay: { flex: 1, justifyContent: 'space-between' },
    header: { alignItems: 'center', marginTop: moderateScale(10) },
    iconStyle: { width: moderateScale(50), height: moderateScale(50) },
    iconContainer: { alignItems: 'center', marginTop: moderateScale(10) },
    formContainer: { paddingHorizontal: moderateScale(40), gap: moderateScale(20) },
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
