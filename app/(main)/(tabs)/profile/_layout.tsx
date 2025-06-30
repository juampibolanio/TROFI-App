import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="myGallery" />
            <Stack.Screen name="reviews" />
            <Stack.Screen name="editProfile" />
            <Stack.Screen name="editWorkInfo" />
            <Stack.Screen name="editImageProfile" />
            <Stack.Screen name="editPersonalInfo1" />
            <Stack.Screen name="editPersonalInfo2" />
            <Stack.Screen name="editEmploymentInfo" />
        </Stack>
    );
}