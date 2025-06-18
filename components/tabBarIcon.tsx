import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import fonts from '@/constants/fonts';
import { useFonts } from '@expo-google-fonts/roboto';

type Props = {
    icon: React.ComponentType<{ size: number; color?: string }>;
    label: string;
    focused: boolean;
};

const TabBarIcon: React.FC<Props> = ({ icon: IconComponent, label, focused }) => {
    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <IconComponent size={22} color={focused ? '#0E3549' : '#1C1C1C'} />
            <Text style={[styles.label, focused && styles.focusedLabel]}>
                {label}
            </Text>
            {focused && <View style={styles.underline} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(20),
        width: moderateScale(80),
        height: verticalScale(40),
    },
    label: {
        fontSize: moderateScale(12),
        color: '#1C1C1C',
        textAlign: 'center',
        fontFamily: 'RobotoRegular',
        marginTop: 2,
    },
    focusedLabel: {
        color: '#0E3549',
    },
    underline: {
        marginTop: 4,
        height: 3,
        width: moderateScale(30),
        backgroundColor: '#0E3549',
        borderRadius: moderateScale(2),
        opacity: 1
    },
});

export default TabBarIcon;
