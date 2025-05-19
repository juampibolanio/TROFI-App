// app/(main)/(tabs)/featured/layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="details" />
            <Stack.Screen name="userGalery" />
            <Stack.Screen name="userProfile" />
        </Stack>
    );
}
