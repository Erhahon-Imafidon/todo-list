import { Stack } from 'expo-router';
import { TaskProvider } from '@/context/TaskProvider';

export default function RootLayout() {
    return (
        <TaskProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="index" />
            </Stack>
        </TaskProvider>
    );
}
