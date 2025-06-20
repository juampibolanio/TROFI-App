import { Stack } from 'expo-router';
import React from 'react';


export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="myGallery" />
            <Stack.Screen name="reviews" />
            <Stack.Screen name="userSettings" />
        </Stack>
    );
}
