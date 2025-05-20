import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import _layout from '../(main)/_layout';

const SettingsLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{headerShown: false}}/>
            <Stack.Screen name="contact" />
            <Stack.Screen name="frequentlyQuestions" />
            <Stack.Screen name="aboutTrofi" />
            <Stack.Screen name="reportBug" />
            <Stack.Screen name="termsAndConditions" />

        </Stack>
    )
}

export default SettingsLayout;