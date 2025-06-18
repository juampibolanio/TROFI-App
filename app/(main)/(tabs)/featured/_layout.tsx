// app/(main)/(tabs)/featured/layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

const Layout =() => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    );
}

export default Layout
