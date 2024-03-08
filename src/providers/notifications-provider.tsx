import Constants from 'expo-constants';
import { isDevice } from 'expo-device';
import {
    setNotificationChannelAsync,
    AndroidImportance,
    getPermissionsAsync,
    requestPermissionsAsync,
    getExpoPushTokenAsync,
} from 'expo-notifications';
import { PropsWithChildren, useEffect } from 'react';
import { Platform } from 'react-native';
import { COLOR } from '../styles';
import { AppActionType } from '../types';
import { useAppDispatch } from './app-state-provider';

export function NotificationsProvider({ children }: PropsWithChildren) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function getPushToken() {
            const token = await registerForPushNotificationsAsync();

            dispatch({
                type: AppActionType.SET_PUSH_TOKEN,
                payload: token,
            });
        }

        getPushToken();
    }, []);

    return children;
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        setNotificationChannelAsync('default', {
            name: 'default',
            importance: AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: COLOR.SLATE[50],
        });
    }

    if (isDevice) {
        const { status: existingStatus } = await getPermissionsAsync();

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }

        token = await getExpoPushTokenAsync({
            projectId: Constants?.expoConfig?.extra?.eas.projectId,
        });
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token?.data;
}
