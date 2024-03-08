import { useEffect, useState } from 'react';
import {
    Camping,
    RequestPayload,
    CampingItemStatus,
    AppStatus,
} from '../types';
import { INTERVAL, PAYLOAD } from '../config';
import BackgroundTimer, { IntervalId } from 'react-native-background-timer';
import { useAppState } from '../providers/app-state-provider';
import { sendPushNotification } from '../api/send-push-notification';

export function usePolling({ url, capacity, text, value, name }: Camping) {
    const [isPolling, setIsPolling] = useState(false);
    const [campingItemStatus, setCampingItemStatus] = useState(
        CampingItemStatus.IN_PROGRESS
    );
    const { startDate, endDate, appStatus, pushToken } = useAppState();

    useEffect(() => {
        let intervalId: IntervalId;

        async function fetchData() {
            if (!startDate || !endDate) return;

            try {
                const selectedCamping: RequestPayload['selectedCamping'] = {
                    capacity,
                    text,
                    value,
                };

                const payload: RequestPayload = {
                    ...PAYLOAD,
                    selectedCamping,
                    startDate,
                    endDate,
                };
                const body = JSON.stringify(payload);
                const response = await fetch(url, {
                    method: 'POST',
                    body,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const responseBody = await response.json();

                if (responseBody.isSuccessful) {
                    setCampingItemStatus(CampingItemStatus.BOOKED);
                    setIsPolling(false);
                    BackgroundTimer.clearInterval(intervalId);
                    sendPushNotification({
                        to: pushToken,
                        body: `Стоянка ${name} забронирована`,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (appStatus === AppStatus.RUNNING) {
            setIsPolling(true);
            setCampingItemStatus(CampingItemStatus.IN_PROGRESS);

            fetchData();

            intervalId = BackgroundTimer.setInterval(fetchData, INTERVAL);
        }

        return function cleanUp() {
            BackgroundTimer.clearInterval(intervalId);
        };
    }, [
        url,
        appStatus,
        capacity,
        text,
        value,
        pushToken,
        startDate,
        endDate,
        name,
    ]);

    return { isPolling, campingItemStatus };
}
