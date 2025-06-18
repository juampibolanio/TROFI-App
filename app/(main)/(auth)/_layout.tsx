import { Stack } from 'expo-router';

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{headerShown: false}}/>
            <Stack.Screen name='register' options={{headerShown: false}}/>
            <Stack.Screen name='passwordRecovery' options={{headerShown: false}}/>
            <Stack.Screen name='passwordRecoveryTwo' options={{headerShown: false}}/>
        </Stack>
    )
}

export default AuthLayout;