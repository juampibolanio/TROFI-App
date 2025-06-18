import React, { version } from 'react'
import { View, Text } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import fonts from '@/constants/fonts'
import { useFonts } from '@expo-google-fonts/roboto';

const TabBarIcon = ({ icon: IconComponent, label, focused }: any) => {
    const [fontsLoaded] = useFonts(fonts);

    return (
        <View
            style={{
                backgroundColor: focused ? '#AAB1B6' : 'transparent',
                borderRadius: moderateScale(15),
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: verticalScale(20),
                width: moderateScale(80),
                height: verticalScale(40)
            }}
        >
            <IconComponent size={26} />
            <Text
                style={{
                    fontSize: 12,
                    color: '#0E3549',
                    textAlign: 'center',
                    fontFamily: 'RobotoRegular',
                    fontWeight: 'bold'
                }}
            >
                {label}
            </Text>
        </View>
    );
};

export default TabBarIcon;
