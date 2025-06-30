import { Stack } from "expo-router"

const Layout = () => {
    return(
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="registerOptions"/>
            <Stack.Screen name="completeUserProfile" />
            <Stack.Screen name="completeWorkerProfile"/>
            <Stack.Screen name="completeJobProfile" />
        </Stack>
    )
}

export default Layout;