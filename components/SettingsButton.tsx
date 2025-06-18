import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { To } from 'expo-router';

type Props = {
    title: string;
    iconName: keyof typeof Ionicons.glyphMap;
    route: To;
};

const SettingsButton: React.FC<Props> = ({ title, iconName, route }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.buttonContainer,
                pressed && { opacity: 0.8 },
            ]}
            onPress={() => router.push(route)}
        >
            <Ionicons name={iconName} size={30} color="#0E3549" style={styles.icon} />
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: moderateScale(300),
        height: moderateScale(50),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderRadius: verticalScale(30),
        position: 'relative',
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: moderateScale(14),
    },
    icon: {
        color: '#0E3549',
        position: 'absolute',
        left: moderateScale(20),
    },
});

export default SettingsButton;
