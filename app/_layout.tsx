import { Stack } from 'expo-router';
import { TaskProvider } from '@/context/TaskProvider';
import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import Notify from '@/components/Notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
    const [expoPushToken, setExpoPushToken] = useState<string>('');
    const notificationListener = useRef<Subscription>();
    const responseListener = useRef<Subscription>();
    const [notification, setNotification] =
        useState<Notifications.Notification>();
    const [notificationTitle, setNotificationTitle] = useState<string | null>(
        null
    );
    const [notificationBody, setNotificationBody] = useState<string | null>(
        null
    );
    const [showNotification, setShowNotification] = useState<boolean>(false);

    async function registerForPushNotificationsAsync() {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                handleRegistrationError(
                    'Permission not granted to get push token for push notification!'
                );
                return;
            }
            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ??
                Constants?.easConfig?.projectId;
            if (!projectId) {
                handleRegistrationError('Project ID not found');
            }
            try {
                const pushTokenString = (
                    await Notifications.getExpoPushTokenAsync({ projectId })
                ).data;
                await AsyncStorage.setItem('expoPushToken', pushTokenString); // Cache the push token
                return pushTokenString;
            } catch (e: unknown) {
                handleRegistrationError(`${e}`);
            }
        } else {
            handleRegistrationError(
                'Must use physical device for push notifications'
            );
        }
    }

    function handleRegistrationError(errorMessage: string) {
        alert(errorMessage);
        throw new Error(errorMessage);
    }

    async function getCachedPushToken() {
        try {
            const cachedToken = await AsyncStorage.getItem('expoPushToken');
            if (cachedToken) {
                setExpoPushToken(cachedToken);
            }
        } catch (e) {
            console.error('Failed to get cached push token', e);
        }
    }

    useEffect(() => {
        getCachedPushToken(); // Retrieve cached push token on component mount
        registerForPushNotificationsAsync().then((token?: string) =>
            setExpoPushToken(token ?? '')
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    setNotificationTitle(
                        response.notification.request.content.title
                    );
                    setNotificationBody(
                        response.notification.request.content.body
                    );
                    setShowNotification(true);
                    setTimeout(() => {
                        setShowNotification(false);
                    }, 5000);
                }
            );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current as Subscription
            );
            Notifications.removeNotificationSubscription(
                responseListener.current as Subscription
            );
        };
    }, []);

    return (
        <>
            {showNotification && (
                <Notify header={notificationTitle} body={notificationBody} />
            )}
            <TaskProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" />
                </Stack>
            </TaskProvider>
        </>
    );
}
