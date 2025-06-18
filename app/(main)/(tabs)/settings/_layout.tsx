import { Stack } from 'expo-router';

const SettingsLayout = () =>{
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="contact" options={{ headerShown: false }} />
            <Stack.Screen name="frequentlyQuestions" options={{ headerShown: false }} />
            <Stack.Screen name="aboutTrofi" options={{ headerShown: false }} />
            <Stack.Screen name="reportBug" options={{ headerShown: false }} />
            <Stack.Screen name="termsAndConditions" options={{ headerShown: false }} />
        </Stack>
    );
}

export default SettingsLayout;